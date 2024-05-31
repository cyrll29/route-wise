import React, { useState, useEffect, useCallback, useMemo, useRef, FC } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Image,
  ImageSourcePropType,
  Alert,
  ActivityIndicator
} from "react-native";
import MapView, { Marker, Callout, Polyline, Circle } from "react-native-maps";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/FontAwesome";
import { io } from "socket.io-client";

import { NavigationProp } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';

import Sidebar from "../ui/SideBar";
import RoutesModal from "../modals/RoutesModal"
import HindranceModal from "../modals/HindranceModal"
import ReportModal from "../modals/ReportModal"
import HindranceDetailModal from "../modals/HindranceDetailModal";
import { useLocalSearchParams } from "expo-router";
import routeService from '../services/routeServices'
import reportService from "../services/reportServices";
import decodePolyline from "decode-google-map-polyline"
import * as Location from 'expo-location';


interface RouteFinderProps {
  navigation: NavigationProp<any>
}

const screenWidth = Dimensions.get('window').width;

const RouteFinder: FC<RouteFinderProps> = ({ navigation }) => {

  const { userName, origin, originLatitude, originLongitude, destination, destinationLat, destinationLng } = useLocalSearchParams();
  // const altOrigin = JSON.parse( origin )
  const [completeInfo, setCompleteInfo] = useState(false);
  const [region, setRegion] = useState({longitude: 121.030479, latitude: 14.657027})

  // Data for origin
  const [originValue, setOriginValue] = useState<any>("")
  const [originGeometry, setOriginGeometry] = useState<any>()

  // Data for destination
  const [destinationValue, setDestinationValue] = useState<any>("")
  const [destinationGeometry, setDestinationGeometry] = useState<any>()

  const [viewedSheet, setViewedSheet] = useState("")
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [snapPoints, setSnapPoints] = useState(['40%']);

  const [markers, setMarkers] = useState([{ latitude: 14.657490088758687, longitude: 121.03294214744254 }])
  const [showMarkers, setShowMarkers] = useState(true)

  const [routes, setRoutes] = useState<any | null>(null)

  const [onClickLatLng, setOnClickLatLng] = useState<any>()

  const mapRef = React.createRef<any>();

  const socket = io.connect("https://kyusitrip-backend.azurewebsites.net");

  // Bottom Sheet
  useEffect(() => {
    const calculateSnapPoints = () => {
      switch (viewedSheet) {
        case "Routes":
          setSnapPoints(['40%', '95%']);
          break;
        case "Hindrances":
          setSnapPoints(['35%']);
          break;
        case "HindranceDetail":
          setSnapPoints(['35%']);
          break;
        case "Report":
          setSnapPoints(['42%']);
          break;
        default:
          setSnapPoints(['0%']); // Default snap points
      }
    };
    calculateSnapPoints();
  }, [viewedSheet]);

  // ------------------------------------------------------- For Origin -------------------------------------------------------------------------
  useEffect(() => {
    if(!origin) {
      console.log("No origin")
      return
    } else {
      setOriginValue(origin)
      centerChosenLocation(originLatitude, originLongitude)
      const originLatLng = {
        latitude: originLatitude,
        longitude: originLongitude
      }
      setRoutes(null)
      setOriginGeometry((originGeometry) => ({
        ...originGeometry,
        ...originLatLng
      }))
    }
  }, [origin])

  const centerChosenLocation = (lat:any, lng:any) => {
    const latitude = parseFloat(lat)
    const longitude = parseFloat(lng)
    const region = {
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 0.009,
      longitudeDelta: 0.009
    }
    console.log(region.latitude + typeof(region.latitude))
    mapRef.current.animateToRegion(region, 1000)
  }

  const renderOriginMarker = () => {
    const icon = require("../../assets/map-origin-1.png")
    if(originGeometry) {
      let data = {
        lat: parseFloat(originGeometry.latitude),
        lng: parseFloat(originGeometry.longitude),
      }
      return (
        <Marker 
          coordinate={{
            latitude: data.lat,
            longitude: data.lng
          }}
          image={icon}
        />
      )
    } else {
      return <></>
    }
  }

   // ------------------------------------------------------- For Destination ----------------------------------------------------------
  useEffect(() => {
    if(!destination) {
      return
    } else {
      setDestinationValue(destination)
      centerChosenLocation(destinationLat, destinationLng)
      const data = {
        latitude: destinationLat,
        longitude: destinationLng
      }
      setRoutes(null)
      setDestinationGeometry((destinationGeometry) =>({
        ...destinationGeometry,
        ...data
      }))
      setCompleteInfo(true)
    }
  }, [destination])

  const renderDestinationMarker = () => {
    const icon = require("../../assets/map-destination-1.png")
    if(destinationGeometry) {
      let data = {
        lat: parseFloat(destinationGeometry.latitude),
        lng: parseFloat(destinationGeometry.longitude),
      }
      return (
        <Marker 
          coordinate={{
            latitude: data.lat,
            longitude: data.lng
          }}
          image={icon}
        />
      )
    }
  }

  // ------------------------------------------------------- For Route Navigation ------------------------------------------------------
  const [isLoading, setIsLoading] = useState(false)
  const getRoutes = async () => {
    if (originValue && destinationValue) {
      const data = {
        origin: {
          lat: originGeometry.latitude,
          lng: originGeometry.longitude
        },
        destination: {
          lat: destinationGeometry.latitude,
          lng: destinationGeometry.longitude
        }
      }
      centerChosenLocation(data.origin.lat, data.origin.lng)
      setIsLoading(true)
      await routeService
        .create(data)
        .then((response) => {
          setRoutes(response.data.otpResponse.plan)
        })
        .catch((error) => {
          console.error(error)
        })
        setIsLoading(false)
  
        handlePresentModalPress() 
        setViewedSheet("Routes")
    } else if (originValue && !destinationValue) {
      alert("There is no destination")
    } else if (!originValue && destinationValue) {
      alert("There is no origin")
    } else {
      alert("Please choose an origin")
    }
  }

  // ------------------------------------------------------- For General Modal ----------------------------------------------------------------
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);;

  
  const handleSidebar = (bool: boolean) => {
    setSidebarVisible(bool);
  };

  const snapToIndex = (index) => {
    bottomSheetModalRef.current?.snapToIndex(index)
  }

  // -------------------------------------------------- For Report Modal -------------------------------------------------------------------
  const onLocationPress = (e) => {
    let updatedValue = e.nativeEvent.coordinate
    console.log(e.nativeEvent.coordinate.latitude)
    const pseudoData = {
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude,
      latitudeDelta: 0.009,
      longitudeDelta: 0.009
    }
    mapRef.current.animateToRegion(pseudoData, 1000)
    setOnClickLatLng(updatedValue)

    handlePresentModalPress()
    setViewedSheet("Report")
  } 

  // ------------------------------------- For Hindrance Modal ---------------------------------------------------------------
  const [reports, setReports] = useState<any>([])
  const [count, setCount] = useState(0)

  const timeComparison = (dateCreated) => {
    const now = new Date().valueOf()
    const createdAt = new Date(dateCreated).valueOf()
    const diffInMilliseconds = now - createdAt
    const diffInMinutes = Math.round(diffInMilliseconds / (60 * 1000))
    if (diffInMinutes < 1) {
      return 'Just now';
    } else if (diffInMinutes === 1) {
      return '1 minute ago';
    } else if (diffInMinutes <= 60){
      return `${diffInMinutes} minutes ago`;
    } else if (diffInMinutes > 60 && diffInMinutes < 120) {
      return '1 hour ago'
    } else {
      return `${Math.round(diffInMinutes/60)} hours ago`
    }
  }

  useEffect(() => {
    let timer = setInterval(() => {
      setCount((count) => count + 1);
    }, 4000);

    return () => clearTimeout(timer)
  }, []);

  useEffect(() => {
    reportService
    .getAll()
    .then((response) => {
      const updatedReports = response.data.map((report) => ({
        ...report,
        postedAgo: timeComparison(report.createdAt),
      }));
      setReports(updatedReports.reverse())
    })
    .catch ((error) => {
      console.log(error)
    })
  }, []);

  useEffect(() => {
    socket.on("receive_message", () => {
      reportService
      .getAll()
      .then((response) => {
        const updatedReports = response.data.map((report) => ({
          ...report,
          postedAgo: timeComparison(report.createdAt),
        }));
        setReports(updatedReports.reverse())
      })
      .catch ((error) => {
        console.log(error)
      })
    }, [socket]);
    })

  // ----------------------------------------- For Hindrance Markers -----------------------------------------------------------------------
  const [hindranceIndex, setHindranceIndex] = useState(0)
  const renderMarkers = () => {
    let icon = {
      accidentIcon: require("../../assets/accident-icon-1.png"),
      trafficIcon: require("../../assets/traffic-jam-icon-1.png"),
      hazardIcon: require("../../assets/road-repair-icon-1.png"),
      floodIcon: require("../../assets/flood-icon-1.png"),
      closureIcon: require("../../assets/closure-icon-1.png"),
      warningIcon : require("../../assets/map-warning-1.png")
    }
    if(showMarkers) {
      if(reports) {
        return reports.map((report: any, i) => {
          let marker = icon.warningIcon;

          if(report.category.label === 'Accident'){
            marker = icon.accidentIcon
          } else if (report.category.label === 'Traffic') {
            marker = icon.trafficIcon
          } else if (report.category.label === 'Hazard') {
            marker = icon.hazardIcon
          } else if (report.category.label === 'Flood') {
            marker = icon.floodIcon
          } else if (report.category.label === 'Closure') {
            marker = icon.closureIcon
          }
          return (
            <Marker coordinate={{
                latitude: report.latLng.lat,
                longitude: report.latLng.lng
              }} 
              key={i}
              icon={marker}
              onPress={() => {
                handlePresentModalPress()
                setViewedSheet("HindranceDetail")
                setHindranceIndex(i)
              }}
            />

          )})
      } 
      else {
        <></>
      }
    } 
    else {
      return <></>
    }
  }

  // ---------------------------------------------------------- For Rendering Polyline --------------------------------------------------------------
  const [itinerary, setItinerary] = useState<any>(0)
  const renderPolylines = () => {
    if(routes) {
      return routes.itineraries[itinerary].legs.map((leg, index) => {
        const path = decodePolyline(leg.legGeometry.points);
        let coords = path.map((point) => {
          return {
            latitude: point.lat,
            longitude: point.lng
          }
        })
        let color = "black"

        if(leg.mode === "WALK"){
          color = "#FF7F7F"
        } else if (leg.mode === "BUS") {
          if(leg.route.gtfsId.includes("PUJ")) {
            color = "#89D36F"
          } else {
            color = "#45B6FE"
          }    
        } else if (leg.mode === "RAIL") {
          color = "#FFA756"
        }
        
        return (
          <Polyline 
            key={index}
            coordinates={coords}
            strokeColor={color}
            strokeWidth={7}
          />
        )
      })
    } 
    else {
      return <></>;
    }
  }

  // ------------------------------------------------------------------ For Rendering Leg Start Markers ---------------------------------------------------------------------------------
  const renderLegStartMarkers = () => {
    const icon = {
      busIcon: require('../../assets/map-bus-1.png'),
      walkIcon: require('../../assets/map-walk-1.png'),
      railIcon: require('../../assets/map-rail-1.png'),
      jeepICon: require('../../assets/map-jeep-1.png')
    }
    if(routes) {
      return routes.itineraries[itinerary].legs.map((leg, i) => {
        let markerIcon = icon.walkIcon
        if(leg.mode === 'BUS') {
          if(leg.route.gtfsId.includes("PUJ")) {
            markerIcon = icon.jeepICon
          } else {
            markerIcon = icon.busIcon
          }    
        } 
        else if(leg.mode === 'RAIL') {
          markerIcon = icon.railIcon
        }

        return (
          <Marker 
            coordinate={{
              latitude: leg.from.lat,
              longitude: leg.from.lon
            }}
            image={markerIcon}
            key={i}
          />
        )
      })
    }
    else {
      return
    }
  }

  // ------------------------------------------ For Rendering Current Location Marker -----------------------------------------------------------------------
  const [currentLocation, setcurrentLocation] = useState<any>()
  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if(status !== 'granted') {
        console.log("Please grant location permission");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setcurrentLocation(currentLocation);
    }
    getPermissions();
  }, [count])

  const renderCurrentLocationMarker = () => {
    if(currentLocation){
      return (
        <Circle 
          center={{
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude
          }}
          radius={30}
          strokeColor="#FFF"
          strokeWidth={2.5}
          fillColor="#4285F4"
          zIndex={99}
        />
      )
    }
    else {
      return;
    }
  }

  return (
    <GestureHandlerRootView style={styles.container}>

      {/* Bottom Sheet */}
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          keyboardBehavior="interactive"
        >
          <BottomSheetView style={styles.contentContainer}>
            {(viewedSheet === "HindranceDetail") ? <HindranceDetailModal reports={reports} hindranceIndex={hindranceIndex} /> : <></>}
            {(viewedSheet === "Routes") ? <RoutesModal routes={routes} setItinerary={setItinerary} centerChosenLocation={centerChosenLocation} snapToIndex={snapToIndex} /> : <></>}
            {
              (viewedSheet === "Hindrances") ? 
              <HindranceModal 
                reports={reports} 
                centerChosenLocation={centerChosenLocation}
                handlePresentModalPress={handlePresentModalPress}
                setViewedSheet={setViewedSheet}
                setHindranceIndex={setHindranceIndex}
              /> : 
              <></>
            }
            {(viewedSheet === "Report") ? <ReportModal onClickLatLng={onClickLatLng} setMarkers={setMarkers} snapToIndex={snapToIndex} /> : <></>}
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>



      {/* SideBar */}
      <Modal
        isVisible={sidebarVisible}
        animationIn="slideInLeft"
        animationOut={"slideOutLeft"}
        backdropOpacity={0}
        coverScreen={false}
        onBackButtonPress={() => setSidebarVisible(false)}
        onBackdropPress={() => setSidebarVisible(false)}
        style={styles.modal}
      >
        <Sidebar handleSideBar={handleSidebar} navigation={navigation} username={userName} />
      </Modal>

      <TouchableOpacity
        style={sidebarVisible ? styles.backButtonRemove : [styles.backButton, styles.shadowProp2]}
        onPress={() => setSidebarVisible(true)}
      >
        <Icon name="bars" size={20} color="#880015"></Icon>
      </TouchableOpacity>

      <Modal isVisible={isLoading} backdropOpacity={0.5}>
        <View style={{ flex: 1, width: 'auto', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <View style={{ width: '80%', height: '10%', backgroundColor: 'white', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', rowGap: 5, borderRadius: 10 }}>
              <View>
                <Text>Calculating the best route for you</Text>
              </View>
              <ActivityIndicator size={"large"} />
            </View>
        </View>
      </Modal>

      {/* Route Planner */}
      <View style={[styles.planner, styles.shadowProp]}>
        <View 
          style={[styles.placeSection, {borderBottomWidth: 0.5, borderColor: '#D4B5BA'}]}
        >
          <Image
            source={require("../../assets/origin-icon.png") as ImageSourcePropType}
            style={styles.placeIcon}
          />
            <TextInput 
              showSoftInputOnFocus={false}
              placeholder="Set Origin"
              value={originValue}
              onPressIn={
                () => {
                  navigation.navigate("PlaceSearchOrigin")
                }
              } 
              style={{ paddingLeft: 15}} />
        </View>

        <View style={styles.placeSection}>
          <Image
            source={require("../../assets/destination-icon.png") as ImageSourcePropType}
            style={styles.placeIcon}
          />  
          <TextInput 
              showSoftInputOnFocus={false}
              placeholder="Set Destination"
              value={destinationValue}
              onPressIn={
                () => {
                  navigation.navigate("PlaceSearchDestination")
                }
              } 
              style={{ paddingLeft: 15}} />
        </View>
      </View>

      <View style={[styles.getRoute, styles.shadowProp]}>
        <Pressable 
          onPress={() => {
            getRoutes()
          }} 
          style={[
            styles.getRouteBtn, {backgroundColor: completeInfo ? '#880015' : '#D4B5BA'}
          ]}
        >
          <Text style={styles.getRouteTxt}>
            Navigate
          </Text>
        </Pressable>
      </View>



      {/* Report Icon */}
      <View style={[styles.reportIcon, styles.shadowProp2]}>
        <TouchableOpacity 
          style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}} 
          onPress={() => {
            handlePresentModalPress()
            setViewedSheet("Report")
          }}
        >
          <Image
            source={require("../../assets/warning-sign.png") as ImageSourcePropType}
            style={{width: '60%', height: '60%'}}
          />
        </TouchableOpacity>
      </View>



      {/* Show Reports Button */}
      <View style={[styles.showReportIcon, styles.shadowProp2]}>
        <TouchableOpacity 
          style={{height:'100%', width:'100%', justifyContent: 'center', alignItems: 'center'}}
          onPress={() => {
            handlePresentModalPress()
            setViewedSheet("Hindrances")
          }}
        >
          <Text style={{fontSize: 11, color: '#3b3b3b'}}>
            SHOW REPORTS
          </Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.toggleReportIcon, styles.shadowProp2]}>
        <TouchableOpacity 
          style={{height:'100%', width:'100%', justifyContent: 'center', alignItems: 'center', borderRadius: 15, backgroundColor: showMarkers ? "#880015" : "white" }}
          onPress={() => {
            setShowMarkers(!showMarkers)
          }}
        >
          <Text style={{fontSize: 11, color: showMarkers ? "white" : '#3b3b3b'}}>
            Toggle Reports
          </Text>
        </TouchableOpacity>
      </View>



      {/* Map View */}
      <MapView
        ref={mapRef}
        style={styles.mapView}
        initialRegion={{
          latitude: 14.6568193,
          longitude: 121.0304657,
          latitudeDelta: 0.0122,
          longitudeDelta: 0.0121
        }}
        onPress={(e) => onLocationPress(e)}
      >
        {renderMarkers()}
        {renderOriginMarker()}
        {renderDestinationMarker()}
        {renderPolylines()}
        {renderLegStartMarkers()}
        {renderCurrentLocationMarker()}
      </MapView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "flex-start",
    position: "relative",
  },

  calloutContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: Dimensions.get('window').width * 0.75
  },

  calloutView: {
    alignSelf: 'center',
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 5,
    borderWidth: 0.5,
    marginBottom: 10,
    position: 'relative'
  },

  contentContainer: {
    flexGrow: 1,
    alignItems: 'center',
    zIndex: 99,
    paddingBottom: 20
  },

  reportSheet: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 90,
    zIndex: 22
  },
  
  planner: {
    position: 'absolute',
    bottom: '11.5%',
    left: '50%',
    marginLeft: -0.485 * screenWidth,
    width: "97%",
    height: 120,
    zIndex: -1,
    borderRadius: 15,
    backgroundColor: 'white',
  },

  placeSection: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 50,
    width: '90%',
    height: 60,
    marginHorizontal: 15,
    backgroundColor: 'white',
  },

  placesInput: {
    marginLeft: 15,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },

  getRoute: {
    position: 'absolute',
    bottom: '0%',
    width: '100%',
    height: 80,
    borderRadius: 15,
    backgroundColor: 'white',
    alignItems: "center",
    justifyContent: "center",
    zIndex: -1
  },

  getRouteBtn: {
    width: '90%',
    height: 40,
    borderColor: '#000',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1
  },

  getRouteTxt: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff'
  },

  reportIcon: {
    position: "absolute",
    right: 0,
    bottom: "27%",
    marginRight: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    width: 60,
    height: 60,
    borderRadius: 100,
    zIndex: -1
  },

  showReportIcon: {
    position: "absolute",
    left: 0,
    bottom: "27%",
    marginLeft: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    width: 100,
    height: 30,
    borderRadius: 15,
    zIndex: -1
  },

  toggleReportIcon: {
    position: "absolute",
    left: 105,
    bottom: "27%",
    marginLeft: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    width: 100,
    height: 30,
    borderRadius: 15,
    zIndex: -1
  },

  mapView: {
    flex: 1,
    width: "100%",
    height: "100%",
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -2,
  },

  /* SideBar Modal */
  modal: {
    padding: 0,
    margin: 0,
    width: "100%",
    zIndex: 99
  },

  backButtonRemove: {
    width: 0
  },

  backButton: {
    position: "absolute",
    marginLeft: 15,
    top: "6%",
    zIndex: -1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  shadowProp: {
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },

  shadowProp2: {
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.7,
    shadowRadius: 3,
  },

  placeIcon: {
    width: 20,
    height: 20,
  }

});

export default RouteFinder;
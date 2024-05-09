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
  Alert
} from "react-native";
import MapView, { Marker, Callout, Polyline } from "react-native-maps";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/FontAwesome";

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
import { useLocalSearchParams } from "expo-router";
import MapViewDirections from "react-native-maps-directions";
import routeService from '../services/routeServices'

interface RouteFinderProps {
  navigation: NavigationProp<any>
}

const screenWidth = Dimensions.get('window').width;

const RouteFinder: FC<RouteFinderProps> = ({ navigation }) => {

  const { origin, originLatitude, originLongitude, destination, destinationLat, destinationLng } = useLocalSearchParams();
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
  const [routes, setRoutes] = useState<any | null>(null)

  const mapRef = useRef<any | null>(null)

  // Bottom Sheet
  useEffect(() => {
    const calculateSnapPoints = () => {
      switch (viewedSheet) {
        case "Routes":
          setSnapPoints(['50%', '95%']);
          break;
        case "Hindrances":
          setSnapPoints(['50%']);
          break;
        case "Report":
          setSnapPoints(['40%']);
          break;
        default:
          setSnapPoints(['0%']); // Default snap points
      }
    };
    calculateSnapPoints();
  }, [viewedSheet]);

  // Update Origin Value
  useEffect(() => {
    if(!origin) {
      return
    } else {
      setOriginValue(origin)
      const originLatLng = {
        latitude: originLatitude,
        longitude: originLongitude
      }
      setOriginGeometry((originGeometry) => ({
        ...originGeometry,
        ...originLatLng
      }))
    }
  }, [origin])

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
      console.log(data)
      Alert.alert('', 'Finding the best route', [
        {
          text: 'OK',
        }
      ])
      await routeService
        .create(data)
        .then((response) => {
          setRoutes(response.data.otpResponse.plan)
        })
        .catch((error) => {
          console.error(error)
        })
  
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

  const altFunction = async (lat, lng) => {
    const data = {
      latitude: lat,
      longitude: lng
    }
    await setDestinationGeometry((destinationGeometry) =>({
      ...destinationGeometry,
      ...data
    }))
  }

  // Update Destination Value
  useEffect(() => {
    if(!destination) {
      return
    } else {
      setDestinationValue(destination)
      altFunction(destinationLat, destinationLng)

      console.log(destinationGeometry)
      console.log("above this is destinationGeometry")

      setCompleteInfo(true)
    }
  }, [destination])

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);;

  
  const handleSidebar = (bool: boolean) => {
    setSidebarVisible(bool);
  };

  const handleRegionChange = (coordinate) => {
    setRegion((region) => ({
      ...region,
      ...coordinate
    }))
  }

  const onLocationPress = (e) => {
    let updatedValue = e.nativeEvent.coordinate
    console.log(updatedValue)
    handleRegionChange(updatedValue)

    console.log(region)

    setMarkers(markers => [...markers, updatedValue])
    // handlePresentModalPress()
    // setViewedSheet("Report")
    console.log(origin)
    console.log(markers)
  } 

  // Center Map on Origin
  useEffect(() => {
    if(origin) {
      mapRef.current.animateToRegion(originLocation, 1 * 1000)
      // setMarkers(markers => [...markers, originLocation])
    } else {
      mapRef.current.animateToRegion(fallBackRegion, 1 * 1000)
    }
  }, [origin])

  // Center Map on Destination
  useEffect(() => {
    if(destination) {
      mapRef.current.animateToRegion(destinationLocation, 5 * 1000)
      // setMarkers(markers => [...markers, originLocation])
    } else {
      mapRef.current.animateToRegion(fallBackRegion, 5 * 1000)
    }
  }, [destination])

  const originLocation = {
    latitude: originLatitude,
    longitude: originLongitude,
    latitudeDelta: 0.0122,
    longitudeDelta: 0.0122,
  }

  const destinationLocation = {
    latitude: destinationLat ? destinationLat : 14.657490088758687,
    longitude: destinationLng ? destinationLng : 121.03294214744254,
    latitudeDelta: 0.0122,
    longitudeDelta: 0.0122,
  }

  const fallBackRegion = {
    latitude: 14.657490088758687,
    longitude: 121.03294214744254,
    latitudeDelta: 0.0122,
    longitudeDelta: 0.0122,
  }

  // For routes

  const GOOGLE_MAPS_API_KEY = 'AIzaSyDpqXEh61RzUqXcoy-FvUfcKSR0GX_qIzU'

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
            {(viewedSheet === "Routes") ? <RoutesModal routes={routes}/> : <></>}
            {(viewedSheet === "Hindrances") ? <HindranceModal /> : <></>}
            {(viewedSheet === "Report") ? <ReportModal /> : <></>}
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
        <Sidebar handleSideBar={handleSidebar} navigation={navigation}/>
      </Modal>

      <TouchableOpacity
        style={sidebarVisible ? styles.backButtonRemove : [styles.backButton, styles.shadowProp2]}
        onPress={() => setSidebarVisible(true)}
      >
        <Icon name="bars" size={20} color="#880015"></Icon>
      </TouchableOpacity>



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

        <View style={styles.placeSection} onTouchStart={() => {}}>
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
        region={{
          latitude: region.latitude,
          longitude: region.longitude,
          latitudeDelta: 0.0122,
          longitudeDelta: 0.0121,
        }}
        onPress={(e) => onLocationPress(e)}
      >
        {
          markers.length > 0 ?
          markers.map((marker, i) =>(
            <Marker coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude
            }} key={i} />
          )) : null
        }
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
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
  ImageSourcePropType
} from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
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

interface RouteFinderProps {
  navigation: NavigationProp<any>
}

const screenWidth = Dimensions.get('window').width;

const RouteFinder: FC<RouteFinderProps> = ({ navigation }) => {

  const [completeInfo, setCompleteInfo] = useState(false);
  const [origin, setOrigin] = useState("")
  const [destination, setDestination] = useState("")
  const [viewedSheet, setViewedSheet] = useState("")
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [snapPoints, setSnapPoints] = useState(['40%']);

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
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);;


  const handleSidebar = (bool: boolean) => {
    setSidebarVisible(bool);
  };


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
            {(viewedSheet === "Routes") ? <RoutesModal /> : <></>}
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
        <View style={[styles.placeSection, {borderBottomWidth: 0.5, borderColor: '#D4B5BA'}]}>
          <Image
            source={require("../../assets/origin-icon.png") as ImageSourcePropType}
            style={styles.placeIcon}
          />
          <Pressable style={styles.placesInput} onPress={() => {
            navigation.navigate("PlaceSearchOrigin")
          }}>
            <Text style={{color: '#606060'}}>
              {origin ? origin : 'Set Origin'}
            </Text>
          </Pressable>
        </View>

        <View style={styles.placeSection}>
          <Image
            source={require("../../assets/destination-icon.png") as ImageSourcePropType}
            style={styles.placeIcon}
          />  
          <Pressable style={styles.placesInput} onPress={() => navigation.navigate("PlaceSearchDestination")}>
            <Text style={{color: '#606060'}}>
              {destination ? destination : 'Set Destination '}
            </Text>
          </Pressable>
        </View>
      </View>

      <View style={[styles.getRoute, styles.shadowProp]}>
        <Pressable style={[styles.getRouteBtn, {backgroundColor: completeInfo ? '#880015' : '#D4B5BA'}]}>
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
        style={styles.mapView}
        initialRegion={{
          latitude: 14.657027,
          longitude: 121.030479,
          latitudeDelta: 0.0122,
          longitudeDelta: 0.0121,
        }}
      >
        <Marker
          coordinate={{
            latitude: 14.657027,
            longitude: 121.030479,
          }}
        >
          <Callout>
            <Text>SM North EDSA</Text>
          </Callout>
        </Marker>
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
    flex: 1,
    alignItems: 'center',
    zIndex: 99,
    paddingBottom: 80
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
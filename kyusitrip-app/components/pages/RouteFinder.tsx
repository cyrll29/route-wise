import React, { useState, useCallback, useMemo, useRef, FC } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/FontAwesome";

import { NavigationProp } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'

import Navbar from '../ui/NavBar';
import Sidebar from "../ui/SideBar";
import RoutesModal from "../modals/RoutesModal"
import HindranceModal from "../modals/HindranceModal"
import ReportModal from "../modals/ReportModal"

interface RouteFinderProps {
  navigation: NavigationProp<any>
}

const RouteFinder: FC<RouteFinderProps> = ({ navigation }) => {

  const [sidebarVisible, setSidebarVisible] = useState(false); // for sidebar closing and opening
  const handleSidebar = (bool: boolean) => {
    setSidebarVisible(bool);
  };

  const [viewedSheet, setViewedSheet] = useState("Routes")
  const onSheetSelect = (sheet: string) => {
    setViewedSheet(sheet)
  }

  const snapPoints = useMemo(() => ['25%', '35%', '50%', '70%'], [])
  const bottomSheetRef = useRef<BottomSheet>(null);

  return (
    <GestureHandlerRootView style={styles.container}>

      <BottomSheet
        ref={bottomSheetRef}
        index={2}
        snapPoints={snapPoints}
        keyboardBehavior="interactive"
      >
        <BottomSheetView style={styles.contentContainer}>
          {(viewedSheet === "Routes") ? <RoutesModal /> : <></>}
          {(viewedSheet === "Hindrances") ? <HindranceModal /> : <></>}
          {(viewedSheet === "Report") ? <ReportModal /> : <></>}
        </BottomSheetView>
      </BottomSheet>

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
        style={sidebarVisible ? styles.backButtonRemove : styles.backButton}
        onPress={() => setSidebarVisible(true)}
      >
        <Icon name="bars" size={25} color="#f8ecc4"></Icon>
      </TouchableOpacity>

      
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

      <View style={styles.navBar}>
        <Navbar onSheetSelect={onSheetSelect} />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "flex-start",
    position: "relative"
  },
  
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    zIndex: 2,
    paddingBottom: 80
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
    zIndex: 1
  },

  backButtonRemove: {
    width: 0
  },

  backButton: {
    position: "absolute",
    marginLeft: 15,
    top: "5%",
    zIndex: 99,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#880015",

    width: 50,
    height: 50,

    borderRadius: 10,
  },

  navBar: {
    position: "absolute",
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 99,
    width: "100%"
  }
});

export default RouteFinder;
import React, { useState, useCallback, useMemo, useRef } from "react";
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

import NavBar from "../ui/NavBar.jsx"
import Sidebar from "../ui/Sidebar.jsx";


export default function RouteFinder({ navigation }) {

  const [sidebarVisible, setSidebarVisible] = useState(false); // for sidebar closing and opening
  const handleSidebar = (bool) => {
    setSidebarVisible(bool);
  };

  return (
    <View style={styles.container}>

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
        <Sidebar handleSidebar={handleSidebar} />
      </Modal>


      <TouchableOpacity
        style={sidebarVisible ? styles.backButtonRemove : styles.backButton}
        onPress={() => setSidebarVisible(true)}
      >
        <Icon name="bars" size={25} color="#f8ecc4"></Icon>
      </TouchableOpacity>
      <MapView
        style={{ flex: 1, width: "100%", height: "100%" }}
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
        <NavBar />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "flex-start",
  },

  /* SideBar Modal */
  modal: {
    padding: 0,
    margin: 0,
    width: "100%",
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

    width: "100%"
  }
});

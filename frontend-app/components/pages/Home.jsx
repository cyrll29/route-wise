import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Modal from "react-native-modal";
import Sidebar from "../ui/Sidebar";
import Icon from "react-native-vector-icons/FontAwesome";
import IconE from "react-native-vector-icons/Entypo";
import MapView, { Marker, Callout } from "react-native-maps";

export default function Home({ navigation }) {
  const [sidebarVisible, setSidebarVisible] = useState(false); // for sidebar closing and opening
  const handleSidebar = (bool) => {
    setSidebarVisible(bool);
  };
  const onRegionChange = (region) => {
    console.log(region);
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


      <ScrollView
        style={styles.scrollView}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.homeHeader}>
          <TouchableOpacity onPress={() => setSidebarVisible(true)}>
            <Icon name="user-circle-o" size={40} color="#F8C107"></Icon>
          </TouchableOpacity>

          <Text style={styles.titleText}>
            <Text style={styles.redText}>K</Text>yusi
            <Text style={styles.redText}>T</Text>rip
          </Text>

          <View>
            
          </View>
        </View>


        <Text style={styles.subText}>Click Map To Find Your Route</Text>
        <View style={styles.mapSection}>
          <MapView
            onPress={() => navigation.navigate("RouteFinder")}
            style={{ flex: 1, width: "100%", height: "100%" }}
            onRegionChange={() => onRegionChange}
            initialRegion={{
              latitude: 14.657027,
              longitude: 121.030479,
              latitudeDelta: 0.0222,
              longitudeDelta: 0.0221,
            }}
          >
          </MapView>
        </View>


        <Text style={styles.subText}>Road Hindrances</Text>
        <View style={styles.hindranceSection}></View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 26,
    backgroundColor: "#f8ecc4",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },

  /* SideBar Modal */
  modal: {
    padding: 0,
    margin: 0,
    width: "100%",
  },

  scrollView: {
    width: "100%", 
    paddingTop: 20
  },

  /* Home Header */
  homeHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
    width: "100%",
  },

  redText: {
    color: "#880015",
  },

  titleText: {
    color: "#f8c107",
    fontWeight: "bold",
    fontSize: 30,
  },

  /* Map Section */
  mapSection: {
    marginTop: 15,
    marginBottom: 10,
    width: "100%",
    height: 250,
    backgroundColor: "white",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
  },

  subText: {
    color: "#880015",
    fontWeight: "400",
    fontSize: 25,
    marginTop: 15,
  },

  /* Hindrance Section */
  hindranceSection: {
    marginTop: 15,
    width: "100%",
    height: 320,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
  }
});

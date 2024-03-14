import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import IconFA5 from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";

export default function NavBar() {
  const navigation = useNavigation();
  const [viewedModal, setViewedModal] = useState("")
  const onNavPress = (modal) => {
    setViewedModal(modal)
  }

  return (
    <View style={styles.navBar}>
      <TouchableOpacity
        style={styles.navBarItems}
        onPress={() => onNavPress("Routes")}
      >
        <IconFA5 name="route" size={20} color={(viewedModal === "Routes") ? "#880015" : "#858585"}></IconFA5>
        {/* <Text style={[styles.textStyle, (viewedModal === "Routes") ? styles.navBarOn : styles.navBarOff]}>Routes</Text> */}
      </TouchableOpacity>
      <Text style={{ fontSize: 40, fontWeight: 100, color: "#a2a2a2" }}>|</Text>


      <TouchableOpacity
        style={styles.navBarItems}
        onPress={() => onNavPress("Hindrances")}
      >
        <IconFA5 name="road" size={20} color={(viewedModal === "Hindrances") ? "#880015" : "#858585"}></IconFA5>
        {/* <Text style={[styles.textStyle, (viewedModal === "Hindrances") ? styles.navBarOn : styles.navBarOff]}>Hindrances</Text> */}
      </TouchableOpacity>
      <Text style={{ fontSize: 40, fontWeight: 100, color: "#a2a2a2" }}>|</Text>


      <TouchableOpacity
        style={styles.navBarItems}
        onPress={() => onNavPress("Report")}
      >
        <IconFA5 name="bullhorn" size={20} color={(viewedModal === "Report") ? "#880015" : "#858585"}></IconFA5>
        {/* <Text style={[styles.textStyle, (viewedModal === "Report") ? styles.navBarOn : styles.navBarOff]}>Report</Text> */}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navBar: {
    paddingHorizontal: 30,
    paddingBottom: 20,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderTopWidth: 0.2,
    borderColor: '#a2a2a2',
    width: "100%",
    height: 100,
  },

  navBarItems: {
    justifyContent: "center",
    alignItems: "center",
    width: "25%",
  },

  navBarOn: {
    color: "#880015"
  },

  navBarOff: {
    color: "#858585"
  },

  textStyle: {
    color: "#a2a2a2", 
    fontWeight: "500",
    marginTop: 5,
  }
});

import React from "react";
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

  return (
    <View style={styles.navBar}>
      <TouchableOpacity
        style={styles.navBarItems}
        onPress={() => navigation.navigate("RouteList")}
      >
        <IconFA5 name="route" size={20} color="#880015"></IconFA5>
        <Text style={styles.textStyle}>Routes</Text>
      </TouchableOpacity>
      <Text style={{ fontSize: 40, fontWeight: 100, color: "#880015" }}>|</Text>


      <TouchableOpacity
        style={styles.navBarItems}
        onPress={() => navigation.navigate("RoadCondition")}
      >
        <IconFA5 name="road" size={20} color="#880015"></IconFA5>
        <Text style={styles.textStyle}>Road</Text>
      </TouchableOpacity>
      <Text style={{ fontSize: 40, fontWeight: 100, color: "#880015" }}>|</Text>


      <TouchableOpacity
        style={styles.navBarItems}
        onPress={() => navigation.navigate("Hindrances")}
      >
        <IconFA5 name="bullhorn" size={20} color="#880015"></IconFA5>
        <Text style={styles.textStyle}>Report</Text>
      </TouchableOpacity>
      {/* <Text style={{ fontSize: 40, fontWeight: 100, color: "#880015" }}>|</Text>


      <TouchableOpacity
        style={styles.navBarItems}
        onPress={() => navigation.navigate("Hindrances")}
      >
        <IconFA5 name="bars" size={20} color="#880015"></IconFA5>
        <Text style={styles.textStyle}>Menu</Text>
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  navBar: {
    paddingHorizontal: 30,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: "#f8c107",
    borderRadius: 20,
    width: "85%",
    height: 100,
  },

  navBarItems: {
    justifyContent: "center",
    alignItems: "center",
    width: "25%",
  },

  textStyle: {
    color: "#880015", 
    fontWeight: "500",
    marginTop: 5,
  }
});

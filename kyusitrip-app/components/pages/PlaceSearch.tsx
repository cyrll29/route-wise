import React, { FC, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  Dimensions,
  Image,
  ImageSourcePropType
} from "react-native";
import { NavigationProp } from '@react-navigation/native';
import Icon from "react-native-vector-icons/FontAwesome";

interface PlaceSearchProps {
  navigation: NavigationProp<any>;
}

const screenWidth = Dimensions.get('window').width;

const PlaceSearch: FC<PlaceSearchProps> = ({ navigation }) => {
  return(
    <View style={styles.container}>

      <View style={[styles.planner, styles.shadowProp]}>
        <View style={[styles.placeSection, {borderBottomWidth: 0.5, borderColor: '#D4B5BA'}]}>
          <Image
            source={require("../../assets/origin-icon.png") as ImageSourcePropType}
            style={styles.placeIcon}
          />
          <TextInput 
            style={styles.placesInput} 
            placeholder="Set Origin"
          />
        </View>

        <View style={styles.placeSection}>
          <Image
              source={require("../../assets/destination-icon.png") as ImageSourcePropType}
              style={styles.placeIcon}
          />  
          <TextInput 
            style={styles.placesInput} 
            placeholder="Set Destination"
          />
        </View>

        <Pressable
            style={styles.backButton}
            onPress={() => navigation.navigate("RouteFinder")}
          >
          <Icon name="arrow-left" size={20} color="#f8ecc4"></Icon>
        </Pressable>
      </View>

      <View style={[styles.currentLoc, {top: '32%'}]} >
        <Image
          source={require("../../assets/current-loc.png") as ImageSourcePropType}
          style={[styles.placeIcon, {margin: 10}]}
        />
        <Pressable>
          <Text style={{color: '#8f8f8f', fontWeight: '600'}}>
            Use Current Location as Origin
          </Text>
        </Pressable>
      </View>

      <View style={[styles.currentLoc, {top: '40%'}]} >
        <Image
          source={require("../../assets/current-loc.png") as ImageSourcePropType}
          style={[styles.placeIcon, {margin: 10}]}
        />
        <Pressable>
          <Text style={{color: '#8f8f8f', fontWeight: '600'}}>
            Use Current Location as Destination
          </Text>
        </Pressable>
      </View>
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    alignItems: "flex-start",
    position: "relative",
  },

  planner: {
    position: 'absolute',
    top: '0%',
    left: '50%',
    marginLeft: -0.5 * screenWidth,
    width: "100%",
    height: 250,
    paddingTop: 130,
    borderRadius: 15,
    zIndex: 1,
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

  placeIcon: {
    width: 20,
    height: 20,
  },

  currentLoc: {
    flexDirection: 'row',
    position: 'absolute',
    left: '50%',
    marginLeft: -0.45 * screenWidth,
    width: '90%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',

    shadowColor: '#2c2d2d',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },

  backButton: {
    position: "absolute",
    marginLeft: 15,
    top: "50%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#880015",
    width: 40,
    height: 40,
    zIndex: 99,
    borderRadius: 20,
  },

  shadowProp: {
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
})

export default PlaceSearch
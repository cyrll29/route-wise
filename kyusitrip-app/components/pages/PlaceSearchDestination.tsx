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
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

interface PlaceSearchDestinationProps {
  navigation: NavigationProp<any>;
}

const screenWidth = Dimensions.get('window').width;

const PlaceSearchDestination: FC<PlaceSearchDestinationProps> = ({ navigation }) => {

  const [origin, setDestination] = useState()
  const submitDestination = () => {
    navigation.navigate("RouteFinder")
  }

  return(
    <View style={styles.container}>
      <View style={[styles.planner, styles.shadowProp]}>

        <View style={[styles.placeSection]}>
          <Image
            source={require("../../assets/destination-icon.png") as ImageSourcePropType}
            style={styles.placeIcon}
          />
          <GooglePlacesAutocomplete
            placeholder='Set Destination'
            onPress={(data, details = null) => {
              console.log(data, details);
            }}
            styles={placesApiStyle}
            query={{
              key: process.env.GOOGLE_API,
              language: 'en',
              components: 'country:PH'
            }}
            onFail={error => console.log(error)}
          />
        </View>
        <Pressable
            style={styles.backButton}
            onPress={() => navigation.navigate("RouteFinder")}
          >
          <Icon name="arrow-left" size={20} color="#f8ecc4"></Icon>
        </Pressable>
      </View>

      <View style={[styles.currentLoc, {top: '30%'}]} >
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

      <View style={{width: '100%', justifyContent: 'center', alignItems: 'center', height: 120, position: 'absolute', bottom: 0, backgroundColor: 'white', borderTopLeftRadius: 40, borderTopRightRadius: 40}}>
        <TouchableOpacity 
          style={{justifyContent: 'center', alignItems: 'center', width: '80%', height: 60, backgroundColor: '#880015', borderRadius: 30,}}
          onPress={() => navigation.navigate("RouteFinder")}
        >
          <Text
            style={{color: 'white', fontSize: 16, fontWeight: '600'}}
          >
            Submit Destination
          </Text>
        </TouchableOpacity>
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
    height: 230,
    paddingTop: 130,
    borderRadius: 15,
    zIndex: 1,
    backgroundColor: 'white',
  },

  placeSection: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    width: '90%',
    height: 60,
    marginHorizontal: 15,
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 5,
    zIndex: -2
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

const placesApiStyle = {
  textInputContainer: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    width: '100%',
    height: 40,
  },
  textInput: {
    backgroundColor: 'transparent',
    marginLeft: 0,
    marginRight: 0,
    height: 40,
    color: '#5d5d5d',
    fontSize: 16,
  },
  listView: {
    position: 'absolute',
    marginTop: 40,
    backgroundColor: 'white',
    zIndex: -1
  },
  predefinedPlacesDescription: {
    color: '#1faadb',
  },
}

export default PlaceSearchDestination
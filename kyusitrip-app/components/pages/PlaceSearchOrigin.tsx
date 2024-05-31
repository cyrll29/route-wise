import React, { FC, useState } from "react";
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
  Platform,
  ActivityIndicator
} from "react-native";
import Modal from "react-native-modal";
import { NavigationProp } from '@react-navigation/native';
import Icon from "react-native-vector-icons/FontAwesome";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import axios from "axios";
import * as Location from 'expo-location';

interface PlaceSearchOriginProps {
  navigation: NavigationProp<any>;
}

const screenWidth = Dimensions.get('window').width;

const PlaceSearchOrigin: FC<PlaceSearchOriginProps> = ({ navigation }) => {

  const [origin, setOrigin] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const submitOrigin = () => {

    if (origin) {
      const altOrigin = JSON.stringify(origin);
      const newAltOrigin = JSON.parse(altOrigin)

      const address = newAltOrigin.description;
      axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address: address,
          key: 'AIzaSyDpqXEh61RzUqXcoy-FvUfcKSR0GX_qIzU'
        }
      })
      .then(async function(response){
        // console.log(response.data.results[0].geometry.location)
        let location = await response.data.results[0].geometry.location
        navigation.navigate("RouteFinder", {originLatitude: location.lat, originLongitude: location.lng, origin: newAltOrigin.structured_formatting.main_text, })
      })
      .catch(function(error){
        console.log(error)
      })
    }
  }

  const getPermissions = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if(status !== 'granted') {
      console.log("Please grant location permission");
      return;
    }

    if(Platform.OS === 'ios') {
      setIsLoading(true)
      let currentLocation = await Location.getCurrentPositionAsync({});
      setIsLoading(false)
      navigation.navigate("RouteFinder", {originLatitude: currentLocation.coords.latitude, originLongitude: currentLocation.coords.longitude, origin: "Current Location" })
    }
    else {
      let currentLocation = await Location.getCurrentPositionAsync({});
      navigation.navigate("RouteFinder", {originLatitude: currentLocation.coords.latitude, originLongitude: currentLocation.coords.longitude, origin: "Current Location" })
    }
  }

  return(
    <View style={styles.container}>
      <Modal isVisible={isLoading} backdropOpacity={0.5}>
        <View style={{ flex: 1, width: 'auto', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <View style={{ width: '80%', height: '10%', backgroundColor: 'white', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size={"large"} />
            </View>
        </View>
      </Modal>
      <View style={[styles.planner, styles.shadowProp]}>
        <View style={[styles.placeSection]}>
          <Image
            source={require("../../assets/origin-icon.png") as ImageSourcePropType}
            style={styles.placeIcon}
          />
          <GooglePlacesAutocomplete
            placeholder='Set Origin'
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              // console.log(data);
              setOrigin(data)
            
            }}
            styles={placesApiStyle}
            query={{
              key: "AIzaSyDpqXEh61RzUqXcoy-FvUfcKSR0GX_qIzU",
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

      <TouchableOpacity style={[styles.currentLoc, {top: '30%'}]} onPress={getPermissions} >
        <Image
          source={require("../../assets/current-loc.png") as ImageSourcePropType}
          style={[styles.placeIcon, {margin: 10}]}
        />
        <View>
          <Text style={{color: '#8f8f8f', fontWeight: '600'}}>
            Use Current Location as Origin
          </Text>
        </View>
      </TouchableOpacity>
          
      <View style={{width: '100%', justifyContent: 'center', alignItems: 'center', height: 120, position: 'absolute', bottom: 0, backgroundColor: 'white', borderTopLeftRadius: 40, borderTopRightRadius: 40}}>
        <TouchableOpacity 
          style={{justifyContent: 'center', alignItems: 'center', width: '80%', height: 60, backgroundColor: '#880015', borderRadius: 30,}}
          onPress={() => submitOrigin()}
        >
          <Text
            style={{color: 'white', fontSize: 16, fontWeight: '600'}}
          >
            Submit Origin
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

export default PlaceSearchOrigin
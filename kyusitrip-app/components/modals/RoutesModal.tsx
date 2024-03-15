import { View, Text, Image, ImageSourcePropType, TextInput, StyleSheet, Pressable } from 'react-native'
import React, { useState } from 'react'
import IconFA5 from "react-native-vector-icons/FontAwesome5";


const RoutesModal = () => {

  const [origin, setOrigin] = useState("")
  const [destination, setDestination] = useState("")

  return (
    <View>
      <Text style={styles.headerText}>Find Your Public Transportation Route</Text>

      <View style={styles.placeSection}>
        <IconFA5 name="search-location" size={20} color="#a2a2a2"></IconFA5>
        <TextInput
          style={styles.textInput}
          onChangeText={(origin) => setOrigin(origin)}
          defaultValue={origin}
          placeholder='Origin'
        />
      </View>

      <View style={styles.placeSection}>
        <IconFA5 name="search-location" size={20} color="#a2a2a2"></IconFA5>
        <TextInput
          style={styles.textInput}
          onChangeText={(destination) => setDestination(destination)}
          defaultValue={destination}
          placeholder='Destination'
        />
      </View>

      <View style ={styles.findButton}>
        <Pressable
          style={styles.buttonContainer}
        >
          <Text style={styles.buttonText}>Find Route</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  headerText: {
    marginBottom: 10
  },

  placeSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
  },

  textInput: {
    padding: 10,
    borderColor: "#818181",

    borderWidth: 0.7,
    borderRadius: 7,

    width: "85%",
    height: 35,

    fontSize: 16,
    marginTop: 8,
    marginBottom: 10,


    lineHeight: 20,

    backgroundColor: 'rgba(151, 151, 151, 0.25)',

  },

  findButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10
  },

  buttonContainer: {
    borderRadius: 10,
    backgroundColor: '#880015',
    
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 40,
  },

  buttonText: {
    color: '#f8ecc4',
    fontWeight: 'bold',
    fontSize: 14,
  },
})

export default RoutesModal
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'

const ReportModal = () => {

  const [location, setLocation] = useState("")
  const [place, setPlace] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")

  return (
    <View>
      <Text style={styles.headerText}>Submit traffic, hindrance, or road reports</Text>

      <View style={styles.placeSection}>
        <View>
          <Pressable
            style={styles.buttonContainer}
          >
            <Text style={styles.buttonText}>Pin Location</Text>
          </Pressable>
        </View>
        <TextInput
          style={styles.textInput}
          onChangeText={(location) => setLocation(location)}
          defaultValue={location}
          placeholder='location of the road incident'
        />
      </View>

      <View style={styles.placeSection}>
        <View>
          <Text>Places</Text>
        </View>
        <TextInput
          style={styles.textInput}
          onChangeText={(place) => setPlace(place)}
          defaultValue={place}
          placeholder='specific place'
        />
      </View>

      <View style={styles.placeSection}>
        <View>
          <Text>Category</Text>
        </View>
        <TextInput
          style={styles.textInput}
          onChangeText={(category) => setCategory(category)}
          defaultValue={category}
          placeholder='category'
        />
      </View>

      <View style={styles.placeSection}>
        <View>
          <Text>Description</Text>
        </View>
        <TextInput
          style={styles.textInput}
          onChangeText={(description) => setDescription(description)}
          defaultValue={description}
          placeholder='description'
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

    width: "70%",
    height: 35,

    fontSize: 16,
    marginTop: 8,
    marginBottom: 10,
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
    width: 90,
    height: 40,
  },

  buttonText: {
    color: '#f8ecc4',
    fontWeight: 'bold',
    fontSize: 14,
  },
})

export default ReportModal
import { View, Text, Image, ImageSourcePropType, TextInput, StyleSheet, Pressable, ScrollView } from 'react-native'
import React, { useState } from 'react'
import IconFA5 from "react-native-vector-icons/FontAwesome5";


const RoutesModal = (props) => {

  const {routes} = props

  const [origin, setOrigin] = useState("")
  const [destination, setDestination] = useState("")
  const [shown, setShown] = useState(false)
  const [indexRow, setIndexRow] = useState()
  
  // -------Duration Formatter---------
  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600)
    seconds %= 3600
    const minutes = Math.floor(seconds / 60)
  
    let formattedDuration = ''
  
    if (hours > 0) {
        formattedDuration += `${hours} hr`
        if (hours > 1) formattedDuration += 's'
    }
  
    if (minutes > 0) {
        if (formattedDuration !== '') formattedDuration += ' '
        formattedDuration += `${minutes} min`
        if (minutes > 1) formattedDuration += 's'
    }
    return formattedDuration;
  }

  // -------Time Formatter---------
  const formatTime = (date) => {
    const hours = new Date(date).getHours();
    const minutes = new Date(date).getMinutes();
    const amPM = hours >= 12 ? 'PM' : 'AM';

    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

    const formattedMinutes = ('0' + minutes).substr(-2);
    return `${formattedHours}:${formattedMinutes} ${amPM}`;
  }

  const handleClick = (index) => {
    setShown(!shown)
    setIndexRow(index)
  }

  const altDetails = () => {
    return (
      <Text>I am Shown</Text>
    )
  }
  
  const routeItineraries = () => {
    return routes.itineraries.map((itinerary, index) => (
      <View style={styles.routeItineraries} onTouchStart={() => handleClick(index)} key={index}>
        <Text>{itinerary.legs[0].from.name}</Text>
        <Text>{formatDuration(itinerary.duration)}</Text>
        <View>{itinerary.legs.map((leg, index) => (
          <View key={index}>
            <Text>{leg.mode}</Text>
          </View>
        ))}</View>
        {shown && index === indexRow ? <View>{altDetails()}</View> : <></>}
        <Text>{itinerary.legs[itinerary.legs.length - 1].to.name}</Text>
      </View>
    ))
  }

  return (
    <ScrollView onTouchStart={() => {console.log(routes.itineraries)}} style={styles.container}>
      {routeItineraries()}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    margin: 10,
    padding: 10,
    width: '100%'
  },
  headerText: {
    marginBottom: 10
  },

  routeItineraries: {
    borderWidth: 1,
    width: '100%',
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
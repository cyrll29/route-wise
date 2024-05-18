import { View, Text, Image, ImageSourcePropType, TextInput, StyleSheet, Pressable } from 'react-native'
import React, { useState } from 'react'
import IconFA5 from "react-native-vector-icons/FontAwesome5";
import { ScrollView } from 'react-native-gesture-handler';


const RoutesModal = (props) => {

  const {routes} = props

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

  const altDetails = (legs) => {
    return (
      <View
      >
        {legs.map((leg, index) => (
          <View key={index} style={styles.routeLeg}>
            <Text>{leg.mode}</Text>
          </View>
        ))}
      </View>
    )
  }
  
  const routeItineraries = () => {
    return (
      <View>
        {routes.itineraries.map((itinerary, index) => (
          <Pressable style={styles.routeItineraries} onPress={() => handleClick(index)} key={index}>
            <View>
              <Text>{itinerary.legs[0].from.name}</Text>
              <Text>{formatDuration(itinerary.duration)}</Text>
              <View>{itinerary.legs.map((leg, index) => (
                <View key={index}>
                  <Text>{leg.mode}</Text>
                </View>
              ))}</View>
              {shown && index === indexRow ? <View>{altDetails(itinerary.legs)}</View> : <></>}
              <Text>{formatTime(itinerary.startTime)}</Text>
              <Text>{formatTime(itinerary.endTime)}</Text>
              <Text>{itinerary.legs[itinerary.legs.length - 1].to.name}</Text>
            </View>
          </Pressable>
        ))}
      </View>
    )
  }

  return (
    <ScrollView style={styles.container} onTouchStart={() => console.log(routes.itineraries)}>
      {routeItineraries()}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    padding: 20,
    paddingBottom: 100,
    width: '90%',
    overflow: 'scroll'
  },
  headerText: {
    marginBottom: 10
  },

  routeItineraries: {
    borderWidth: 1,
    width: 'auto',
    marginBottom: 10
  },

  routeLeg: {
    borderWidth: 1,
    margin: 10,
    width: 50
  },
})

export default RoutesModal
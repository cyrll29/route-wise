import { View, Text, Image, ImageSourcePropType, TextInput, StyleSheet, Pressable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler';

const RoutesModal = (props) => {

  const {
    routes, 
    setItinerary,
    centerChosenLocation,
    snapToIndex
  } = props

  const [shown, setShown] = useState(false)
  const [indexRow, setIndexRow] = useState()
  
  // ---------------------------------------------------------- Duration Formatter ---------------------------------------------------------------------
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

  // --------------------------------------------------------- Time Formatter --------------------------------------------------------------------------
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
    setItinerary(index)
  }

  const walkDuration = (itinerary:any) => {
    let walkDuration = 0;
    for (let i = 0; i < itinerary.legs.length; i++) {
      if(itinerary.legs[i].mode == "WALK") {
        walkDuration += itinerary.legs[i].duration
      }
    }
    return formatDuration(walkDuration)
  }

  // --------------------------------------------------------- For Leg Detail/s -------------------------------------------------------------
  const altDetails = (legs) => {
    const icon = {
      busIcon: require('../../assets/map-bus-1.png'),
      walkIcon: require('../../assets/map-walk-1.png'),
      railIcon: require('../../assets/map-rail-1.png'),
      jeepICon: require('../../assets/map-jeep-1.png')
    }
    if(routes) {
      return (
        <View
        >
          {legs.map((leg, index) => {
            let legIcon = icon.walkIcon
            if(leg.mode === 'BUS') {
              if(leg.route.gtfsId.includes("PUJ")) {
                legIcon = icon.jeepICon
              } else {
                legIcon = icon.busIcon
              }    
            } 
            else if(leg.mode === 'RAIL') {
              legIcon = icon.railIcon
            }
            if(leg.mode === "WALK") {
              return (
                <TouchableOpacity 
                  style={{     
                    flexDirection: 'row',
                    margin: 10,
                    width: 'auto',
                    borderRadius: 10,
                    columnGap: 5,
                    alignItems: 'center',
                    backgroundColor: '#F8ECC4',
                    justifyContent: 'space-between'
                  }} 
                  key={index}
                  onPress={() => {
                    centerChosenLocation(leg.from.lat, leg.from.lon)
                    snapToIndex(0)
                  }}
                >
                  <View 
                    style={{ 
                      backgroundColor: "#5B0625",
                      padding: 7,
                      borderRadius: 10,
                      width: '20%',
                      alignItems: 'center'
                    }}
                  >
                    <Image source={legIcon} style={{ width: 35, height: 35 }} />
                  </View>
                  <View>
                    <Text style={{ fontSize: 11 }}><Text style={{ fontWeight:'bold' }}>{leg.steps[0].relativeDirection}</Text> from <Text style={{ fontWeight:'bold' }}>{leg.steps[0].streetName}</Text></Text>
                  </View>
                  <View style={{ marginRight: 8 }}>
                    <Text style={{ fontSize: 11, fontWeight: '900' }}>{formatDuration(leg.duration)}</Text>
                  </View>
                </TouchableOpacity>
              )
            }
            else {
              return(
                <TouchableOpacity 
                  style={{   
                    backgroundColor: '#F8ECC4',  
                    flexDirection: 'row',
                    margin: 10,
                    width: 'auto',
                    borderRadius: 10,
                    alignItems: 'center',
                    columnGap: 5
                  }} 
                  key={index}
                  onPress={() => {
                    centerChosenLocation(leg.from.lat, leg.from.lon)
                    snapToIndex(0)
                  }}
                >
                  <View style={{ 
                      backgroundColor: "#5B0625",
                      padding: 7,
                      borderRadius: 10,
                      height: '100%',
                      width: '20%',
                      alignItems: 'center'
                    }}
                  >
                    <Image source={legIcon} style={{ width: 35, height: 35 }} />
                  </View>
                  <View style={{ flexDirection: 'column', width: '75%' }}>
                    <View style={{ width: 'auto', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5, marginTop: 5 }}>
                      <Text style={{ fontSize: 15 }}>{leg.route.gtfsId.includes("PUJ") ? "JEEP" : leg.mode }</Text>
                      <Text style={{ fontSize: 15 }}>{formatDuration(leg.duration)}</Text>
                    </View>
                    <View style={{ flexDirection: 'column', rowGap: 5 }}>
                      <View style={{ flexDirection: 'row', columnGap: 55 }}>
                        <View>
                          <Text style={{ fontSize: 10, fontWeight: '900' }}><Text style={{ fontWeight: '900' }}>|</Text>    ROUTE   </Text>
                        </View>
                        <View style={{ width: '40%' }}>
                          <Text style={{ fontSize: 10 }}>{leg.route.longName}</Text>
                        </View>
                      </View>
                      <View style={{ flexDirection: 'row', columnGap: 55 }}>
                        <View>
                          <Text style={{ fontSize: 10, fontWeight: '900' }}><Text style={{ fontWeight: '900' }}>|</Text>    GET ON  </Text>
                        </View>
                        <View style={{ width: '40%' }}>
                          <Text style={{ fontSize: 10 }}>{leg.from.name}</Text>
                        </View>
                      </View>
                      <View style={{ flexDirection: 'row', columnGap: 55, marginBottom: 10 }}>
                        <View>
                          <Text style={{ fontSize: 10, fontWeight: '900' }}><Text style={{ fontWeight: '900' }}>|</Text>    GET OFF</Text>
                        </View>
                        <View style={{ width: '40%' }}>
                          <Text style={{ fontSize: 10 }}>{leg.to.name}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              )
            }
          })}
        </View>
      )
    }
    else {
      return (
        <View>
          <Text>NO ROUTES AVAILABLE</Text>
        </View>
      )
    }
  }

  const renderDistanceBar = (itinerary) => {
    if(routes) {
      return itinerary.legs.map((leg, i) => {
        let legPercent = 370 * (leg.duration / itinerary.duration)
        let modeColor = 'lightgray'
          if(leg.mode === "WALK"){
            modeColor = "#FF7F7F"
          } else if(leg.mode === "BUS") {
            if(leg.route.gtfsId.includes("PUJ")) {
              modeColor = "#397822"
            } else {
              modeColor = "#45B6FE"
            }     
          } else if(leg.mode === "RAIL") {
            modeColor = "#FFA756"
          }
        return (
          <View 
            style={{
              width: legPercent,
              height: 'auto',
              backgroundColor: modeColor,
              borderLeftWidth: 2,
              borderColor: 'white'
            }}
            key={i}
          >
          </View>
        )
      })
    }
    else {
      return (
        <View>
          <Text>NO ROUTES AVAILABLE</Text>
        </View>
      )
    }
  }

  const renderModes = (itinerary:any) => {
    if(routes) {
      return itinerary.legs.map((leg, index) => {

        let modeColor = 'lightgray'
        if(leg.mode === "WALK"){
          modeColor = "#FF7F7F"
        } else if(leg.mode === "BUS") {
          if(leg.route.gtfsId.includes("PUJ")) {
            modeColor = "#397822"
          } else {
            modeColor = "#45B6FE"
          }     
        } else if(leg.mode === "RAIL") {
          modeColor = "#FFA756"
        }

        return (
          leg.mode === "WALK" ? 
          <></> : 
          <View key={index} style={{ backgroundColor: modeColor, height: "100%", padding: 5,  borderRadius: 7, alignItems: 'center', flexDirection: 'row' }}>
            <Text style={{ color: 'white' }}>{leg.route.gtfsId.includes("PUJ") ? "JEEP" : leg.mode}</Text>
          </View> 
        )
      })
    }
    else {
      return (
        <View>
          <Text>NO ROUTES AVAILABLE</Text>
        </View>
      )
    }
  }
  
  const routeItineraries = () => {
    return (
      <View>
        <Text style={{ marginBottom: 10, color: 'lightgray', fontWeight: 'bold' }}>{routes.itineraries.length} suggested routes</Text>
        {routes.itineraries.map((itinerary, index) => (
          <TouchableOpacity style={styles.routeItineraries} onPress={() => handleClick(index)} key={index}>
            <View style={styles.itineraryHeader}>
              <View style={styles.itineraryHeaderModeOfTranspo}>
                {renderModes(itinerary)}
              </View>
              <View style={styles.itineraryDuration}>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={{ fontSize: 17, fontWeight: 'bold' }}>{formatDuration(itinerary.duration)}</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={{ fontSize: 11 }}>{walkDuration(itinerary)} walk</Text>
                </View>
              </View>
            </View>
            <View style={styles.distanceBar}>
              {renderDistanceBar(itinerary)}
             {/* <View>
              <Text style={{ fontSize: 10 }}>{formatTime(itinerary.startTime)}</Text>
             </View>
             <View>
              <Text style={{ fontSize: 10 }}>{formatTime(itinerary.endTime)}</Text>
             </View> */}
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 10 }}>{formatTime(itinerary.startTime)}</Text>
              <Text style={{ fontSize: 10 }}>{formatTime(itinerary.endTime)}</Text>
            </View>
            <View>
              {shown && index === indexRow ? <View>{altDetails(itinerary.legs)}</View> : <></>}
            </View>
          </TouchableOpacity>
        ))}
        <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
          <Text style={{ color: 'lightgray', fontWeight: '900' }}>---- End of Suggested Routes ----</Text>
        </View>
      </View>
    )
  }

  return (
    <ScrollView style={styles.container}>
      {routeItineraries()}
    </ScrollView>
  )
}
const testColor = (color) => {
  return color
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 100,
    width: '90%',
    overflow: 'scroll'
  },
  headerText: {
    marginBottom: 10
  },

  itineraryHeader: {
    width: 'auto',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between'
  },

  itineraryHeaderModeOfTranspo: {
    width: 'auto',
    flexDirection: 'row',
    columnGap: 10,
    alignItems: 'center',
  },

  itineraryDuration: {

  },

  itineraryLegs: {
    backgroundColor: testColor('pink'),
    height: 'auto'
  },

  distanceBar: {
    backgroundColor: 'lightgray',
    marginTop: 10,
    // paddingLeft: 5,
    // paddingRight: 5,
    width: 330,
    height: 10,
    flexDirection: 'row',
    // justifyContent: 'space-between'
  },

  routeItineraries: {
    borderWidth: 2,
    width: 'auto',
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
  },

  routeLeg: {
    borderWidth: 1,
    flexDirection: 'row',
    margin: 10,
    width: 'auto'
  },
})

export default RoutesModal
import { View, Text, ScrollView, StyleSheet, Image, ImageSourcePropType } from 'react-native'
import React from 'react'

const HindranceModal = () => {
  return (
    <View style={styles.hindranceContainer}>
      <View style={{borderBottomColor: '#606060', borderBottomWidth: 0.2, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 17, color: '#999999', fontWeight: '600', marginBottom: 5, width: '100%', textAlign: 'center'}}>User Reports</Text>
      </View>

      <ScrollView 
        contentContainerStyle={{alignItems: 'center'}}
        style={{width: '100%', paddingVertical: 10}}
      >
        <View style={[styles.shadowProp, {backgroundColor: '#fbfbfb', marginBottom: 15, borderRadius: 15, width: '90%', height: 60, flexDirection: 'row', paddingHorizontal: 15}]}>
          <View style={[{flexDirection: 'row', alignItems: 'center', gap: 15}]}>
            <Image 
              source={require("../../assets/warning-sign.png") as ImageSourcePropType}
              style={{width: 40, height: 35}}
            />
            <View style={{flexDirection: 'column', gap: 3}}>
              <Text style={{fontWeight: '700', fontSize: 17}}>Closure</Text>
              <Text style={{color: '#666666'}}>Road Cosure at FPJ Ave. corner Del Monte</Text>
            </View>
          </View>
          <View style={{width: 65, height: 20, position: 'absolute', right: 0, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 12, color: '#888888'}}>25 mins ago</Text>
          </View>
        </View>

        <View style={[styles.shadowProp, {backgroundColor: '#fbfbfb', marginBottom: 15, borderRadius: 15, width: '90%', height: 60, flexDirection: 'row', paddingHorizontal: 15}]}>
          <View style={[{flexDirection: 'row', alignItems: 'center', gap: 15}]}>
            <Image 
              source={require("../../assets/warning-sign.png") as ImageSourcePropType}
              style={{width: 40, height: 35}}
            />
            <View style={{flexDirection: 'column', gap: 3}}>
              <Text style={{fontWeight: '700', fontSize: 17}}>Closure</Text>
              <Text style={{color: '#666666'}}>Road Cosure at FPJ Ave. corner Del Monte</Text>
            </View>
          </View>
          <View style={{width: 65, height: 20, position: 'absolute', right: 0, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 12, color: '#888888'}}>25 mins ago</Text>
          </View>
        </View>

        <View style={[styles.shadowProp, {backgroundColor: '#fbfbfb', marginBottom: 15, borderRadius: 15, width: '90%', height: 60, flexDirection: 'row', paddingHorizontal: 15}]}>
          <View style={[{flexDirection: 'row', alignItems: 'center', gap: 15}]}>
            <Image 
              source={require("../../assets/warning-sign.png") as ImageSourcePropType}
              style={{width: 40, height: 35}}
            />
            <View style={{flexDirection: 'column', gap: 3}}>
              <Text style={{fontWeight: '700', fontSize: 17}}>Closure</Text>
              <Text style={{color: '#666666'}}>Road Cosure at FPJ Ave. corner Del Monte</Text>
            </View>
          </View>
          <View style={{width: 65, height: 20, position: 'absolute', right: 0, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 12, color: '#888888'}}>25 mins ago</Text>
          </View>
        </View>

        <View style={[styles.shadowProp, {backgroundColor: '#fbfbfb', marginBottom: 15, borderRadius: 15, width: '90%', height: 60, flexDirection: 'row', paddingHorizontal: 15}]}>
          <View style={[{flexDirection: 'row', alignItems: 'center', gap: 15}]}>
            <Image 
              source={require("../../assets/warning-sign.png") as ImageSourcePropType}
              style={{width: 40, height: 35}}
            />
            <View style={{flexDirection: 'column', gap: 3}}>
              <Text style={{fontWeight: '700', fontSize: 17}}>Closure</Text>
              <Text style={{color: '#666666'}}>Road Cosure at FPJ Ave. corner Del Monte</Text>
            </View>
          </View>
          <View style={{width: 65, height: 20, position: 'absolute', right: 0, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 12, color: '#888888'}}>25 mins ago</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  hindranceContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    // justifyContent: 'center',
    alignItems: 'center'
    // borderColor: 'black',
    // borderWidth: 1,
  },

  shadowProp: {
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
})

export default HindranceModal
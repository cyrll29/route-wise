import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  ImageSourcePropType,
  ActivityIndicator 
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import React, { useState, useEffect } from 'react'
import reportService from '../services/reportServices'

const HindranceModal = (props) => {
  const {
    reports
  } = props

  const renderReports = () => {
    if (reports) {
      return reports.map((report: any, i) => (
        <View style={[styles.shadowProp, {backgroundColor: '#fbfbfb', marginBottom: 15, borderRadius: 15, width: '90%', height: 60, flexDirection: 'row', paddingHorizontal: 15}]} key={i}>
          <View style={[{flexDirection: 'row', alignItems: 'center', gap: 15}]}>
            <Image 
              source={require("../../assets/warning-sign.png") as ImageSourcePropType}
              style={{width: 40, height: 35}}
            />
            <View style={{flexDirection: 'column', gap: 3}}>
              <Text style={{fontWeight: '700', fontSize: 17}}>{report.category.label}</Text>
              <Text style={{color: '#666666'}}>{report.description}</Text>
            </View>
          </View>
          <View style={{width: 65, height: 20, position: 'absolute', right: 0, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 12, color: '#888888'}}>{report.postedAgo}</Text>
          </View>
        </View>
      ))
    } else {
      <></>
    }
  }
  
  return (
    <View style={styles.hindranceContainer}>
      <View 
        style={{
          borderBottomColor: '#606060', 
          borderBottomWidth: 0.2, 
          width: '100%', 
          justifyContent: 'center', 
          alignItems: 'center'}}
          onTouchStart={() => console.log(reports)}
      >
        <Text style={{fontSize: 17, color: '#999999', fontWeight: '600', marginBottom: 5, width: '100%', textAlign: 'center'}}>User Reports</Text>
      </View>

      <ScrollView 
        contentContainerStyle={{alignItems: 'center'}}
        style={{width: '100%', paddingVertical: 10}}
      >
        {renderReports()}
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
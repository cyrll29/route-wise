import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  Pressable, 
  Image, 
  ImageSourcePropType, 
  TouchableOpacity,
  Alert, 
} from 'react-native'
import React, { useState } from 'react'
import Icon from "react-native-vector-icons/FontAwesome";
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import reportService from '../services/reportServices';

const ReportModal = (props) => {
  const {
    onClickLatLng,
    setMarkers,
    snapToIndex
  } = props

  const [clickedReport, setClickedReport] = useState('')
  const [description, setDescription] = useState('')
  const [value, setValue] = useState(0)

  const reportAlert = (message) =>
    Alert.alert('Report', message, [
      {
        text: 'Ok',
      }
    ]);

  const handleSubmit = () => {
    let labelValue = 0
    switch(clickedReport) {
      case "Traffic": 
        labelValue = 1;
        break;
      case "Hazard":
        labelValue = 2
        break;
      case "Accident": 
        labelValue = 3
        break;
      case "Flood" :
        labelValue = 4
        break;
      case "Closure": 
        labelValue = 5
        break;
    }
    const category = {value: labelValue, label: clickedReport};
    console.log(category)
    if (onClickLatLng) {
      const latitude = onClickLatLng.latitude
      const longitude = onClickLatLng.longitude
      const latLng = {lat: latitude, lng: longitude}
      const data = {
        latLng,
        category,
        description
      }
      console.log(data)

      reportService
        .create(data)
        .then((response) => {
          console.log(response.message)
          reportAlert(response.message)
          setDescription('')
          snapToIndex(0)
        })
        .catch((error) => {
          if(
            error.response &&
            error.response.status >= 400 &&
            error.response.status <= 500
          ) {
            console.log(error.response.data.message)
          }
        })
    } else {
      alert("Pick a location by clicking anywhere on the map")
    }
  }

  return (
    <View style={styles.theContainer}>
      <View style={{marginBottom: 15, borderBottomColor: '#606060', borderBottomWidth: 0.2, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 17, color: '#999999', fontWeight: '600', marginBottom: 5, width: '100%', textAlign: 'center'}}>What do you see?</Text>
      </View>
      <View style={styles.container}>
        <View>
          <TouchableOpacity style={styles.itemContainer} onPress={() => {setClickedReport('Traffic')}}>
            <Image
              source={require("../../assets/traffic-icon.png") as ImageSourcePropType}
              style={styles.reportIcon}
            />
            <Text style={{fontWeight: '500'}}>Traffic</Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity style={styles.itemContainer} onPress={() => setClickedReport('Hazard')}>
            <Image
              source={require("../../assets/hazard-icon.png") as ImageSourcePropType}
              style={styles.reportIcon}
            />
            <Text style={{fontWeight: '600'}}>Hazard</Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity style={styles.itemContainer} onPress={() => setClickedReport('Accident')}>
            <Image
              source={require("../../assets/accident-icon.png") as ImageSourcePropType}
              style={styles.reportIcon}
            />
            <Text style={{fontWeight: '600'}}>Accident</Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity style={styles.itemContainer} onPress={() => setClickedReport('Flood')}>
            <Image
              source={require("../../assets/flood-icon.png") as ImageSourcePropType}
              style={styles.reportIcon}
            />
            <Text style={{fontWeight: '600'}}>Flood</Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity style={styles.itemContainer} onPress={() => setClickedReport('Closure')}>
            <Image
              source={require("../../assets/closure-icon.png") as ImageSourcePropType}
              style={styles.reportIcon}
            />
            <Text style={{fontWeight: '600'}}>Closure</Text>
          </TouchableOpacity>
        </View>
      </View>

      {clickedReport ? (
        <View style={styles.reportDetail}>
          <View style={{marginBottom: 15, borderBottomColor: '#606060', borderBottomWidth: 0.2, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 17, color: '#999999', fontWeight: '600', marginBottom: 5, width: '100%', textAlign: 'center'}}>Report your Location</Text>
          </View>

          <View>
            <Text>
              {onClickLatLng ? "Write a brief details below" : "Kindly pick a location"}
            </Text>
          </View>

          <View style={styles.iconSection}>

            <View style={styles.iconContainer} onTouchStart={() => setClickedReport('Traffic')}>
              <View style={[(clickedReport === 'Traffic') ? styles.smallPickedIconBox : styles.smallUnpickedIconBox]}>
                <Image
                  source={require("../../assets/traffic-small.png") as ImageSourcePropType}
                  style={(clickedReport === 'Traffic') ? styles.pickedIcon : styles.unpickedIcon}
                />
              </View>
              <Text style={[(clickedReport === 'Traffic') ? styles.iconPickedText : styles.iconUnpickedText]}>Traffic</Text>
            </View>

            <View style={styles.iconContainer} onTouchStart={() => setClickedReport('Hazard')}>
              <View style={[(clickedReport === 'Hazard') ? styles.smallPickedIconBox : styles.smallUnpickedIconBox]}>
                <Image
                  source={require("../../assets/hazard-small.png") as ImageSourcePropType}
                  style={(clickedReport === 'Hazard') ? styles.pickedIcon : styles.unpickedIcon}
                />
              </View>
              <Text style={[(clickedReport === 'Hazard') ? styles.iconPickedText : styles.iconUnpickedText]}>Hazard</Text>
            </View>

            <View style={styles.iconContainer} onTouchStart={() => setClickedReport('Accident')}>
              <View style={[(clickedReport === 'Accident') ? styles.smallPickedIconBox : styles.smallUnpickedIconBox]}>
                <Image
                  source={require("../../assets/accident-small.png") as ImageSourcePropType}
                  style={(clickedReport === 'Accident') ? styles.pickedIcon : styles.unpickedIcon}
                />
              </View>
              <Text style={[(clickedReport === 'Accident') ? styles.iconPickedText : styles.iconUnpickedText]}>Accident</Text>
            </View>

            <View style={styles.iconContainer} onTouchStart={() => setClickedReport('Flood')}>
              <View style={[(clickedReport === 'Flood') ? styles.smallPickedIconBox : styles.smallUnpickedIconBox]}>
                <Image
                  source={require("../../assets/flood-small.png") as ImageSourcePropType}
                  style={(clickedReport === 'Flood') ? styles.pickedIcon : styles.unpickedIcon}
                />
              </View>
              <Text style={[(clickedReport === 'Flood') ? styles.iconPickedText : styles.iconUnpickedText]}>Flood</Text>
            </View>

            <View style={styles.iconContainer} onTouchStart={() => setClickedReport('Closure')}>
              <View style={[(clickedReport === 'Closure') ? styles.smallPickedIconBox : styles.smallUnpickedIconBox]}>
                <Image
                  source={require("../../assets/warning-sign.png") as ImageSourcePropType}
                  style={(clickedReport === 'Closure') ? styles.pickedIcon : styles.unpickedIcon}
                />
              </View>
              <Text style={[(clickedReport === 'Closure') ? styles.iconPickedText : styles.iconUnpickedText]}>Closure</Text>
            </View>
          </View>

          <View style={styles.titleInputBox}>
            <Text style={{fontSize: 16, color: '#999999', fontWeight: '700'}}>Short Details about the Report</Text>
            <BottomSheetTextInput
              style={{borderColor: '#999999', borderBottomWidth: 1,}}
              placeholder='eg. Road Cosure at FPJ Ave. corner Del Monte' 
              value={description}
              onChangeText={text => setDescription(text)}
            />
            {/* <TextInput 
              style={{borderColor: '#999999', borderBottomWidth: 1,}}
              placeholder='eg. Road Cosure at FPJ Ave. corner Del Monte'
            /> */}
          </View>

          <View style={styles.reportButtonContainer}>
            <TouchableOpacity
              style={[styles.reportButton, styles.shadowProp, {backgroundColor: 'white'}]}
              onPress={() => setClickedReport('')}
            >
              <Text>Return</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.reportButton, {flexDirection: 'row', gap: 15, backgroundColor: '#880015'}]}
              onPress={() =>
                handleSubmit()
              }
            >
              <Image
                source={require("../../assets/submit-icon.png") as ImageSourcePropType}
                style={{width: 20, height: 20, tintColor: 'white'}}
              />
              <Text style={{color: 'white'}}>Submit</Text>
            </TouchableOpacity>
          </View>



        </View>
      ) : (
        <></>
      )}


    </View>
  )
}

const styles = StyleSheet.create({
  theContainer: {
    width: '100%',
    height: '100%',
    // borderColor: 'black',
    // borderWidth: 1,
  },

  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
    // borderColor: 'red',
    // borderWidth: 1,
    width: '100%',
    height: '100%'
  },

  reportDetail: {
    width: '100%',
    height: 300,
    position: 'absolute',
    backgroundColor: 'white',
    // justifyContent: 'center',
    alignItems: 'center'
    // borderColor: 'black',
    // borderWidth: 1,
  },

  headerText: {
    fontSize: 25,
    marginLeft: 10,
    marginBottom: 10
  },

  reportIcon: {
    width: 100,
    height: 100
  },

  iconSection: {
    flexDirection: 'row',
    gap: 15,
    flexWrap: 'wrap',
    justifyContent: 'center'
  },

  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },

  smallPickedIconBox: {
    width: 55,
    height: 55,
    borderColor: '#880015',
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 5
  },

  smallUnpickedIconBox: {
    width: 55,
    height: 55,
    borderColor: '#CCCCCC',
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 5
  },

  pickedIcon: {
    width: '50%',
    height: '50%',
    tintColor: '#880015'
  },

  unpickedIcon: {
    width: '50%',
    height: '50%',
    tintColor: '#CCCCCC'
  },

  iconPickedText: {
    color: '#880015',
    fontWeight: '800'
  },

  iconUnpickedText: {
    color: '#BBBBBB',
    fontWeight: '600'
  },

  titleInputBox: {
    flexDirection: 'column',
    gap: 15,
    backgroundColor: '#fafafa',
    marginVertical: 15,
    width: '90%',
    borderRadius: 7,
    padding: 20,
    height: 80,
  },

  reportButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fafafa',
    width: '100%',
    height: 90,
  },

  reportButton: {
    width: '48%', 
    height: 55, 
    justifyContent: 'center', 
    alignItems: 'center',
    borderRadius: 20
  },

  itemContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 5,
  },

  shadowProp: {
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },

})

export default ReportModal
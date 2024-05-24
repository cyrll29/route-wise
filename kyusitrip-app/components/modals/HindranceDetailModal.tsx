import React from 'react'
import { 
    View,
    StyleSheet,
    Text,
    Image
} from 'react-native'

const HindranceDetailModal = (props) => {
    const {
        reports,
        hindranceIndex
    } = props
  return (
    <View style={styles.hindranceContainer}>
      <View 
        style={{
          borderBottomColor: '#606060', 
          borderBottomWidth: 0.2, 
          width: '90%', 
          justifyContent: 'center', 
          alignItems: 'center'}}
      >
        <Text style={{fontSize: 17, color: '#999999', fontWeight: '600', marginBottom: 5, width: '100%', textAlign: 'center'}}>{reports[hindranceIndex].category.label}</Text>
      </View>

      <View style={{ width: '80%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', columnGap: 40 }}>
        <View>
          <Image source={require('../../assets/info-time.png')} style={styles.image} />
        </View>
        <View>
          <Text>
              {reports[hindranceIndex].postedAgo ? reports[hindranceIndex].postedAgo : "THIS DON'T EXIST"}
          </Text>
        </View>
      </View>

      <View style={{ width: '80%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', columnGap: 40 }}>
        <View>
          <Image source={require('../../assets/info-description.png')} style={styles.image} />
        </View>
        <View>
          <Text>
            {reports[hindranceIndex].category.label ? reports[hindranceIndex].category.label : "THIS DON'T EXIST"} 
          </Text>
        </View>
      </View>

      <View style={{ width: '80%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', columnGap: 40 }}>
        <View>
          <Image source={require('../../assets/info-address.png')} style={styles.image} />
        </View>
        <View style={{ width: '80%' }}>
          <Text>
            {reports[hindranceIndex].address ? reports[hindranceIndex].address : "THIS DON'T EXIST"}          
          </Text>
        </View>
      </View>

      <View style={{ width: '80%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', columnGap: 40 }}>
        <View>
          <Image source={require('../../assets/info-user.png')} style={styles.image} />
        </View>
        <View style={{ width: '80%' }}>
          <Text>
            {reports[hindranceIndex].user.name ? reports[hindranceIndex].user.name : "THIS DON'T EXIST"}    
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    hindranceContainer: {
      flexDirection: 'column',
      rowGap: 15,
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

    image: {
      width: 25,
      height: 25
    }
  })

export default HindranceDetailModal
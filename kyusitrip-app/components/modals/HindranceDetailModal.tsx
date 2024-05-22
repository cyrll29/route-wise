import React from 'react'
import { 
    View,
    StyleSheet,
    Text
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
      <View>
        <Text>
            {reports[hindranceIndex].postedAgo}
        </Text>
      </View>
      <View>
        <Text>
            {reports[hindranceIndex].category.label} 
        </Text>
      </View>
      <View>
        <Text>
            {reports[hindranceIndex].address}  
        </Text>
      </View>
      <View>
        <Text>
            {reports[hindranceIndex].user.name}    
        </Text>
      </View>
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

export default HindranceDetailModal
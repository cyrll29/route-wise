import { Button, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/AntDesign'
import IconE from 'react-native-vector-icons/Octicons'

export default function StartingPage({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <IconE name='location' size={80} color='#880015'></IconE>
        <Icon name='car' size={80} color='#880015'></Icon>
      </View>
      <View style={styles.header}>
        <Text style={styles.boldText}>
          <Text style={styles.titleText}>
            <Text style={styles.redText}>R</Text>oute<Text style={styles.redText}>W</Text>ise
          </Text>
        </Text>
      </View>
      <View>
        <View style={styles.buttonForms}>
          <Pressable style={styles.buttonContainer} onPress={() => navigation.navigate('LoginPage')}>
            <Text style={styles.buttonText}>Sign in with Email</Text>
          </Pressable>
          <Pressable style={styles.buttonContainerTwo} onPress={() => navigation.navigate('Home')}>
            <Text style={styles.buttonTextTwo}>Continue as Guest</Text>
          </Pressable>
          <Text style={styles.bottomText}>No Account? <Text style={styles.bottomTextSpan} onPress={() => navigation.navigate('SignupPage')}>Create One!</Text></Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8ecc4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    padding: 0,
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 45
  },
  titleText: {
    color: '#f8c107'
  },
  redText: {
    color: '#880015'
  },
  buttonForms: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    marginTop: 15,
    borderRadius: 30,
    backgroundColor: '#880015',

    alignItems: 'center',
    justifyContent: 'center',

    width: 200,
    height: 50
  },
  buttonContainerTwo: {
    marginTop: 15,
    borderRadius: 30,
    borderWidth: 4,
    borderColor: '#880015',
    backgroundColor: '#f8ecc4',

    alignItems: 'center',
    justifyContent: 'center',

    width: 200,
    height: 50
  },
  buttonText: {
    color: '#f8ecc4',
    fontWeight: 'bold',
    fontSize: 17
  },
  buttonTextTwo: {
    color: '#880015',
    fontWeight: 'bold',
    fontSize: 17
  },
  bottomText: {
    marginTop: 15,
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 17
  },
  bottomTextSpan: {
    color: '#f8c107'
  }
});

import React, { FC } from 'react';
import { Pressable, StyleSheet, Text, View, Image, ImageSourcePropType } from 'react-native';
import { NavigationProp } from '@react-navigation/native';

interface StartingPageProps {
  navigation: NavigationProp<any>;
}

const StartingPage: FC<StartingPageProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View>
        <Image
          source={require("../../assets/kyusitrip-logo.png") as ImageSourcePropType}
          style={styles.logoImage}
        />
      </View>

      <View>
        <Text style={[styles.titleText, styles.boldText]}>
          <Text style={styles.redText}>K</Text>yusi
          <Text style={styles.redText}>T</Text>rip
        </Text>
      </View>

      <View>
        <Pressable
          style={styles.buttonContainer}
          onPress={() => navigation.navigate('LoginPage')}
        >
          <Text style={styles.buttonText}>Sign in with Email</Text>
        </Pressable>

        <Pressable
          style={styles.buttonContainerTwo}
          onPress={() => navigation.navigate('SignupPage')}
        >
          <Text style={styles.buttonTextTwo}>Create an Account</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8ecc4',
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* Logo Section */
  logoImage: {
    width: 150,
    height: 150,
  },

  /* Nameplate Section */
  boldText: {
    fontWeight: 'bold',
    fontSize: 45,
  },
  titleText: {
    color: '#f8c107',
  },
  redText: {
    color: '#880015',
  },

  /* Buttons Section */
  buttonContainer: {
    marginTop: 15,
    borderRadius: 30,
    backgroundColor: '#880015',
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 50,
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
    height: 50,
  },
  buttonText: {
    color: '#f8ecc4',
    fontWeight: 'bold',
    fontSize: 17,
  },
  buttonTextTwo: {
    color: '#880015',
    fontWeight: 'bold',
    fontSize: 17,
  },
});

export default StartingPage;

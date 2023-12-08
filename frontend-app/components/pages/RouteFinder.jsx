import React from "react";
import { StyleSheet, Text, View, TextInput, Pressable, SafeAreaView, TouchableOpacity, Modal } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function RouteFinder ({ navigation }) {
    return (
        <>
            <View style={styles.container}>
                <Pressable style={styles.backButton} onPress={() => navigation.navigate('Home')}>
                    <Icon name='arrow-left' size={20} color='#f8ecc4'></Icon>
                </Pressable>
                <MapView 
                    style={{flex: 1, width: '100%', height: '100%'}} 
                    initialRegion={{
                        latitude: 14.657027,
                        longitude: 121.030479,
                        latitudeDelta: 0.0122,
                        longitudeDelta: 0.0121,
                        }}
                >
                    <Marker 
                        coordinate={{
                            latitude: 14.657027,
                            longitude: 121.030479
                        }}
                    >
                        <Callout>
                            <Text>SM North EDSA</Text>
                        </Callout>
                    </Marker>
                </MapView>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'flex-start',
        width: '100vw',
        height: '100vh'
    },

    backButton: {
        position: 'absolute',
        marginLeft: 15,
        top: '5%',
        zIndex: 99,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8c107',

        width: 50,
        height: 50,

        borderRadius: 10,
    },
})
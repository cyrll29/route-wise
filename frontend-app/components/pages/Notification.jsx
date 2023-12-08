import React from "react";
import { StyleSheet, Text, View, TextInput, Pressable, SafeAreaView, TouchableOpacity, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

export default function Notification ({ navigation }) {
    return (
        <>
            <SafeAreaView style={styles.container}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
                    <Icon name='arrow-left' size={20} color='#f8ecc4'></Icon>
                </TouchableOpacity>
                <Text>Notification Page</Text>
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8ecc4',
        justifyContent: 'center',
        padding: 30,
        width: '100%'
    },

    backButton: {
        position: 'absolute',
        marginLeft: 15,
        top: '5%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8c107',

        width: 50,
        height: 50,

        borderRadius: 10,
    },
})
import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import NavBar from '../ui/NavBar';
import Modal from 'react-native-modal';
import Sidebar from '../ui/Sidebar';
import Icon from 'react-native-vector-icons/FontAwesome'
import IconE from 'react-native-vector-icons/Entypo'
import MapView, { Marker, Callout } from 'react-native-maps';

export default function Home({ navigation} ) {
    const [sidebarVisible, setSidebarVisible] = useState(false); // for sidebar closing and opening
    const handleSidebar = bool => {
        setSidebarVisible(bool);
    };
    const onRegionChange = (region) => {
        console.log(region);
    };
    return (
        <View style={styles.container}>
            <Modal 
                isVisible={sidebarVisible} 
                animationIn='slideInLeft' 
                animationOut={'slideOutLeft'} 
                backdropOpacity={0}
                coverScreen={false}
                onBackButtonPress={() => setSidebarVisible(false)}
                onBackdropPress={() => setSidebarVisible(false)}
                style={styles.modal}
            >
                <Sidebar handleSidebar={handleSidebar}/>
            </Modal>
            <ScrollView 
                style={{width: '100%', paddingTop: 20}}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}>
                <View style={styles.homeHeader}>
                    <View>
                        <TouchableOpacity onPress={() => setSidebarVisible(true)}>
                            <Icon name="user-circle-o" size={40} color='#F8C107'></Icon>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={styles.titleText}>
                            <Text style={styles.redText}>R</Text>oute<Text style={styles.redText}>W</Text>ise
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
                        <Icon name="bell" size={40} color='#F8C107'></Icon>
                    </TouchableOpacity>
                </View>
                <View style={styles.searchBar}>
                    <View style={{alignItems:'center', justifyContent: 'center'}}>
                        <IconE name='magnifying-glass' size={22} color='#880015'></IconE>
                    </View>
                    <TextInput style={styles.textInput} />
                </View>
                <Text style={styles.subText}>Current Location</Text>
                <View
                    style={{marginTop: 15, width: '100%', height: 250, backgroundColor: 'white', overflow: 'hidden', alignItems: 'center', justifyContent: 'center', borderRadius: 25}}
                >
                    <MapView 
                        onPress={() => navigation.navigate('RouteFinder')}
                        style={{flex: 1, width: '100%', height: '100%'}} 
                        onRegionChange={() => onRegionChange}
                        initialRegion={{
                            latitude: 14.657027,
                            longitude: 121.030479,
                            latitudeDelta: 0.0222,
                            longitudeDelta: 0.0221,
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
                <Text style={styles.subText}>Announcement</Text>
                <View
                    style={{marginTop: 15, width: '100%', height: 250, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', borderRadius: 25}} 
                >
                </View>
                <Text style={styles.subText}>Weather</Text>
                <View
                    style={{marginTop: 15, marginBottom: 120, width: '100%', height: 250, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', borderRadius: 25}} 
                >
                </View>
            </ScrollView>
            <NavBar />
        </View> 
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 26,
        backgroundColor: '#f8ecc4',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },

    homeHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%'
    },

    modal: {
        padding: 0,
        margin: 0,
        width: '100%'
    },

    redText: {
        color: '#880015'
    },

    titleText: {
        color: '#f8c107',
        fontWeight: 'bold',
        fontSize: 30
    },

    subText: {
        color: '#880015',
        fontWeight: '400',
        fontSize: 25,
        marginTop: 15
    },

    searchBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
        padding: 10,
        backgroundColor: '#f8c107',
        borderColor: '#f8c107',

        borderWidth: 1,
        borderRadius: 25,

        width: '100%',
        height: 45,

        fontSize: 15
    },

    textInput: {
        width: '87%',
        color: 'black'
    }

})
import React from 'react'
import { StyleSheet, Text, View, TextInput, Pressable, SafeAreaView, TouchableOpacity, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons'
import { NavigationProp } from '@react-navigation/native';

interface SideBarProps {
  handleSideBar: (bool: boolean) => void,
  navigation: NavigationProp<any>
}

const SideBar: React.FC<SideBarProps> = ({ handleSideBar, navigation }) => {
    return (
        <View style={styles.sidebar}>
            <View style={{height: '80%', width: '100%'}}>
                <View style={styles.sidebarHeader}>
                    <Icon name="user-circle-o" size={50} color='#F8C107'></Icon>
                    <Text style={styles.textStyle}>Profile Name</Text>
                </View>
                <TouchableOpacity style={styles.sidebarItems}>
                    <Text style={styles.textStyle}>Account Settings</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sidebarItems}>
                    <Text style={styles.textStyle}>Search History</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sidebarItems}>
                    <Text style={styles.textStyle}>Activity Log</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sidebarItems}>
                    <Text style={styles.textStyle}>Preferences</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sidebarItems}>
                    <Text onPress={() => handleSideBar(false)} style={styles.textStyle}>Close</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity onPress={() => navigation.navigate('StartingPage')} style={styles.sidebarItems}>
                    <Text style={styles.textStyle}>Logout</Text>
                    <IconMCI name='logout' size={30} color='black'></IconMCI>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    sidebar: {
        padding: 30,
        backgroundColor: '#fff6e0',
        height: '100%',
        width: '70%',
        justifyContent: 'space-around'
    },

    sidebarHeader: {
        flexDirection: 'row', 
        width: '100%', 
        height:'20%',  
        alignItems: 'center', 
        justifyContent: 'flex-start',
        gap: 20
    },

    sidebarItems: {
        marginTop: 25,
        flexDirection: 'row',
        gap: 20
    },

    textStyle: {
        fontSize: 18,
        fontWeight: '500'
    }
})

export default SideBar
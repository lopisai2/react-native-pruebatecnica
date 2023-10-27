import React from 'react'
import { Text, View } from 'react-native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Favorites from '../screens/Favorites';
import Home from '../screens/Home';
import {Ionicons, Entypo} from '@expo/vector-icons'


const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
return (
    <Tab.Navigator>
        <Tab.Screen name='Home' component={Home} options={{ headerShown:false, tabBarIcon:({focused}) => (<Ionicons name={focused ? 'partly-sunny' : 'partly-sunny-outline'} size={24}  />) }} />
        <Tab.Screen name='Favorites' component={Favorites} options={{ headerShown:false, tabBarIcon:({focused}) => (<Entypo name={focused ? 'heart' : 'heart-outlined'} size={24}  />) }} />
    </Tab.Navigator>
)
}

const styleSheet =
{  

}

export default BottomTabNavigation;
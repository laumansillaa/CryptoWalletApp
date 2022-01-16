import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AccountIndex from '../Account/AccountIndex';
import HeaderCurrencies from '../HeaderCurrencies/HeaderCurrencies';
import HomeIndex from '../Home/HomeIndex';
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { Icon } from 'native-base';
import CurrenciesIndex from '../HeaderCurrencies/CurrenciesIndex';

const Tab = createMaterialTopTabNavigator();

export default function TabNav() {

    return (
        <Tab.Navigator
        tabBarPosition='bottom'
            screenOptions={{
                tabBarShowLabel: false,
                tabBarIndicatorStyle:{
                //top: 0,
                borderBottomColor: '#1f2937',
                borderBottomWidth: 4,
                },     
                //tabBarInactiveTintColor: 'grey',
                //tabBarActiveTintColor: '#1f2937'
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeIndex}
                options={{ tabBarIcon: ()=>(<Icon as={MaterialCommunityIcons} name='home' color='#1f2937' size={8} />) }}
            />
            <Tab.Screen
                name="Currencies"
                component={CurrenciesIndex}
                options={{ tabBarIcon: ()=>(<Icon as={MaterialCommunityIcons} name='wallet' color='#1f2937' size={8} />) }}
            />
            <Tab.Screen
                name="Account"
                component={AccountIndex}
                options={{ tabBarIcon: ()=>(<Icon as={MaterialCommunityIcons} name='account' color='#1f2937' size={8} />) }}
            />
        </Tab.Navigator>
    );
}
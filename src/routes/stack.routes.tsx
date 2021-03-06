import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'

import { Home } from '../screens/Home'
import { CarDetails } from '../screens/CarDetails'
import { Scheduling } from '../screens/Scheduling'
import { SchedulingDetails } from '../screens/SchedulingDetails'
import { SchedelingComplete } from '../screens/SchedelingComplete'
import { MyCars } from '../screens/MyCars'
import { Splash } from '../screens/Splash'

const { Navigator, Screen } = createStackNavigator();

export function StackRoutes(){
    return(
        <Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName="Splash"
        >
            <Screen
                name="Splash"
                component={Splash}
            />
            <Screen
                name="Home"
                component={Home}
                options={{
                    gestureEnabled: false
                }}
            />
            <Screen
                name="CarDetails"
                component={CarDetails}
            />
            <Screen
                name="Scheduling"
                component={Scheduling}
            />
            <Screen
                name="SchedulingDetails"
                component={SchedulingDetails}
            />
            <Screen
                name="SchedelingComplete"
                component={SchedelingComplete}
            />
            <Screen
                name="MyCars"
                component={MyCars}
            />
        </Navigator>
    )
}
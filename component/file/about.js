import React from "react";
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Job from './job';

const Tab = createBottomTabNavigator();
export default function About() {
    return (
        <View style={styles.container}>
            <Text>About Us </Text>
        {/* <Tab.Navigator >
            <Tab.Screen
                options={{ headerShown: false }}
                name="aaaA"
                component={Job} />

        </Tab.Navigator> */}
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})
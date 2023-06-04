import React from "react";
import { StyleSheet, Text, View } from 'react-native';

import JobList from "./jobList";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
export default function Job() {
    return (
        // <View style={styles.container}>
        //     <Text>Job</Text>

        // </View>
        <Tab.Navigator  >
            <Tab.Screen options={{ headerShown: false }}  name="Job" component={JobList} />

        </Tab.Navigator>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})
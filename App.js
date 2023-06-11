import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
// import Ionicons from '@expo/vector-icons/Ionicons';
// import { AntDesign } from '@expo/vector-icons';


//import CustomDrawer from './component/file/customdrawer';
import Home from './component/file/home';
import About from './component/file/about';
import Job from './component/file/job';
import Register from './component/file/registration';
import CustomDrawer from './component/file/customdrawer';

const Drawer = createDrawerNavigator();

function NavigationDrawer() {
  return (

    <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}>

      <Drawer.Screen name="JobHunter" component={Home}
        options={{
          title: 'JobHunter',
          drawerIcon: ({ size }) => ( 
            <Ionicons
              name="md-home-outline"
              size={size}
              color='#4284f5'
            />
          ),
        }}
      />
      <Drawer.Screen name="About" component={About}
        options={{
          title: 'About',
          drawerIcon: ({ size }) => (
            <AntDesign
              name="questioncircleo"
              size={size}
              color="#4284f5" />
          ),
        }}
      />
      <Drawer.Screen name="Job" component={Job}
        options={{
          title: 'Job',
          drawerIcon: ({ size }) => (
            <Ionicons
              name="newspaper-outline"
              size={size}
              color="#4284f5" />
          ),
        }} />
        <Drawer.Screen name="Register" component={Register}
        options={{
          title: 'Register',
          drawerIcon: ({ size }) => (
            <Ionicons
              name="newspaper-outline"
              size={size}
              color="#4284f5" />
          ),
        }} />
    </Drawer.Navigator>
  );
}


export default function App() {
  return (
    <NavigationContainer>
      <NavigationDrawer />

    </NavigationContainer>

  );
}


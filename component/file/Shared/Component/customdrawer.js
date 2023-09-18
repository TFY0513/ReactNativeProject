import React, { useEffect, useState } from "react";
import { StyleSheet, View, } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import {
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { firebaseConfig } from '../../../../firebase/config'; // Import your Firebase config
import { getDatabase, ref, get } from 'firebase/database';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
// Define a state variable to store the user's information



export default function CustomDrawer(props) {
    const [isDarkTheme, setDarkTheme] = React.useState(false);
    const [user, setUser] = useState({
        username: null,
        email: null,
    });
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
            if (userAuth) {
                try {
                    // Assuming you have a reference to Realtime Database's database
                    const userRef = ref(database, `User/${userAuth.uid}`);
                    get(userRef).then((snapshot) => {
                        if (snapshot.exists()) {
                            const userDetailData = snapshot.val();
                            const userData = {
                                username: userDetailData.Username, // Replace with the actual username
                                email: userAuth.uid, // Retrieve the user's email from authentication
                            };
                            setUser(userData);
                        }
                        else {
                            const userData = {
                                username: "Guest",
                                email: "123445678"
                            };
                            setUser(userData);

                        }
                    })

                    // if (userSnapshot.exists()) {
                    //     console.log("got data");
                    //     // User data found in Realtime Database
                    //     const userData = userSnapshot.val();

                    //     setUser(userData);
                    // }
                    // else {
                    //     console.log("no data");

                    // }


                } catch (error) {
                    console.error('Error fetching user data from Realtime Database:', error);
                }

                //console.log("logged id : " + userAuth.uid);
            }
            else {

            }



        });

    }, []);


    const toggleTheme = () => {
        setDarkTheme(!isDarkTheme);
    }

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{ flexDirection: 'row', marginTop: 15, }}>
                            <Avatar.Image
                                source={require('../../../profile/profile.png')}
                                size={50}

                            />
                            <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                                <Title style={styles.title}>Name</Title>
                                <Caption style={styles.caption}>ID</Caption>
                            </View>

                        </View>
                        {/* <View style={styles.row}>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>222</Paragraph>
                                <Caption style={styles.caption}>nnnn</Caption>
                            </View>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>333</Paragraph>
                                <Caption style={styles.caption}>bbbb</Caption>
                            </View>

                        </View> */}

                    </View>
                    <View style={styles.drawerSection}>
                        {/* <Drawer.Section style={styles.drawerSection}>
                    </Drawer.Section> */}
                        <DrawerItem

                            icon={({ color, size }) => (
                                <Ionicons
                                    name="md-home-outline"
                                    size={size}
                                    color='#4284f5'
                                />
                            )}
                            label="JobHunter"
                            onPress={() => { props.navigation.navigate('JobHunter') }}
                        />
                        <DrawerItem

                            icon={({ color, size }) => (
                                <Ionicons
                                    name="alert-outline"
                                    size={size}
                                    color='#4284f5'
                                />
                            )}
                            label="About"
                            onPress={() => { props.navigation.navigate('About') }}
                        />
                        <DrawerItem

                            icon={({ color, size }) => (
                                <Ionicons
                                    name="newspaper-outline"
                                    size={size}
                                    color='#4284f5'
                                />
                            )}
                            label="Job"
                            onPress={() => { props.navigation.navigate('Job') }}
                        />
                        <DrawerItem

                            icon={({ color, size }) => (
                                <FontAwesome
                                    name="sign-in"
                                    size={size}
                                    color='#4284f5'
                                />
                            )}
                            label="Register"
                            onPress={() => { props.navigation.navigate('Register') }}
                        />


                    </View>
                    <View style={(styles.drawerSection)}>
                        <Text style={styles.preferTitle}>Preferences</Text>
                        <TouchableRipple onPress={() => (toggleTheme())}>
                            <View style={styles.preference}>
                                <Text>Dark Theme</Text>
                                <View pointerEvents="none">
                                    <Switch style={styles.switch} value={isDarkTheme} />
                                </View>

                            </View>
                        </TouchableRipple>

                    </View>


                    {/* <Drawer.Section title="Preferences" >
                    </Drawer.Section> */}




                </View>

            </DrawerContentScrollView>
            <View style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({ color, size }) => (
                        <Icon
                            name="exit-to-app"
                            size={size}
                            color='#4284f5'
                        />
                    )}
                    label="Sign Out"
                    onPress={() => { }}
                />
            </View>
            {/* 
            <Drawer.Section style={styles.bottomDrawerSection}>
            </Drawer.Section> */}



        </View>


    )
}

const styles = StyleSheet.create({

    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
        backgroundColor: '#e4daf2',
        paddingBottom: 15,
    },
    title: {
        fontsize: 16,
        marginTop: 3,
        fontweight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {

        // marginTop: 15,
        borderTopWidth: 1,
        borderTopColor: '#f4f4f4',
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1,

    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',

        paddingHorizontal: 16,
        marginLeft: 12,

    },

    preferTitle: {
        marginTop: 10,
        marginLeft: 12,
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 10,


    }

})
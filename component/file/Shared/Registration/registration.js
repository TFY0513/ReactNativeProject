import React, { useState, useEffect } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from '../../../styling/style';

import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, onValue, set, get } from 'firebase/database';
import { firebaseConfig } from '../../../../firebase/config'; // Import your Firebase config

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export default function RegistrationScreen({ navigation }) {
    const [username, setUsername] = useState('')
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [usernameError, setUsernameError] = useState(null);
    const [fullNameError, setFullNameError] = useState(null);
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [confirmPasswordError, setConfirmPasswordError] = useState(null);

    const onFooterLinkPress = () => {
        navigation.navigate('Login')
    }


    const onRegisterPress = () => {
        // const findUserRef = ref(database, 'User');
        // findUserRef.on('value', (snapshot) => {
        //     console.log(snapshot.key + ' was ' + snapshot.val().Username + ' meters tall');
        // });
        //username
        const usernameRegexPattern = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/;
        const fullnameRegexPattern = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
        const emailRegexPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const passwordRegexPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9\s]).{6,}$/;
        if (!username) {
            setUsernameError("Please Enter Username.");
            return
        }
        if (!usernameRegexPattern.test(username)) {
            setUsernameError("The username must contain alphabets and numeric without spacing and special character.");
            return
        }
        setUsernameError(null);

        //fullname
        if (!fullName) {
            setFullNameError("Please Enter Full Name.")
            return
        }
        if (!fullnameRegexPattern.test(fullName)) {
            setFullNameError("The full name must only contain alphabets without numeric and special character.");
            return
        }
        setFullNameError(null);

        //email
        if (!email) {
            setEmailError("Please Enter Email.")
            return
        }
        if (!emailRegexPattern.test(email)) {
            setEmailError("The email is not valid format.");
            return
        }
        setEmailError(null);

        //apssword
        if (!password) {
            setPasswordError("Please Enter Password.")
            return
        }
        if (!passwordRegexPattern.test(password)) {
            setPasswordError("The password format is not valid.")
            return
        }
        setPasswordError(null);

        //confirmPasswor
        if (!confirmPassword) {
            setConfirmPasswordError("Please Enter Confirm Password.")
            return
        }
        if (confirmPassword != password) {
            setConfirmPasswordError("The password and confirm password is not match.")
            return
        }
        setConfirmPasswordError(null);

        const findUserRef = ref(database, 'User');
        get(findUserRef).then((snapshot) => {
            if (snapshot.exists()) {
                const userIDs = Object.keys(snapshot.val());
                for (const userID of userIDs) {
                    const userDetailData = snapshot.val()[userID];
                    console.log("user username: " + userDetailData.Username);
                    if (username === userDetailData.Username) {
                        setUsernameError("This username has been taken by other users. Please use another username.");

                        break;
                    } else if (email === userDetailData.Email) {
                        setEmailError("This email has been taken by other users. Please use another email.");

                        break;
                    }
                }
            }


        })
            .then(() => {
                if (usernameError == null && emailError == null) {
                    createUserWithEmailAndPassword(auth, email, password)
                        .then((userCredential) => {
                            const user = userCredential.user;
                            const uid = user.uid; // Retrieve the UID upon authentication

                            const userData = {
                                Email: email,
                                Fullname: fullName,
                                Username: username,
                                // You can add other user data fields as needed
                            };

                            const userRef = ref(database, `User/${uid}`);
                            set(userRef, userData)
                                .then(() => {
                                    alert('Successfully register an account');
                                    this.props.navigation.navigate('Home');
                                })
                                .catch((error) => {
                                    console.error('Error storing user data in the database: ', error);
                                });


                        })
                        .catch((error) => {
                            if (error.code === 'auth/email-already-in-use') {
                                // Email is already registered in Firebase Authentication
                                alert('Email address is already in use. Please choose another email address.');
                              
                            } else {
                                console.error('Error creating user: ', error);
                            }
                        });
                }
            })
     


    }

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
            >
                <Text style={styles.systemName}>Registration Page</Text>
                <Image
                    style={styles.logo}
                    source={require('../../../image/registration.png')}
                />
                <TextInput

                    style={styles.input}
                    placeholder='Username'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setUsername(text)}
                    value={username}
                    maxLength={20} // Set the maximum length here
                    underlineColorAndroid="transparent"
                    autoCapitalize="words"

                />
                {usernameError && <Text style={styles.error}>{usernameError}</Text>}
                <TextInput
                    style={styles.input}
                    placeholder='Full Name'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setFullName(text)}
                    value={fullName}
                    maxLength={30} // Set the maximum length here
                    underlineColorAndroid="transparent"
                    autoCapitalize="words"
                />
                {fullNameError && <Text style={styles.error}>{fullNameError}</Text>}
                <TextInput
                    style={styles.input}
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    maxLength={30} // Set the maximum length here
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                {emailError && <Text style={styles.error}>{emailError}</Text>}
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Password'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    maxLength={30} // Set the maximum length here
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                {passwordError && <Text style={styles.error}>{passwordError}</Text>}
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Confirm Password'
                    onChangeText={(text) => setConfirmPassword(text)}
                    value={confirmPassword}
                    maxLength={30} // Set the maximum length here
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                {confirmPasswordError && <Text style={styles.error}>{confirmPasswordError}</Text>}
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onRegisterPress()}>
                    <Text style={styles.buttonTitle}>Create account</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Already got an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Log in</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}


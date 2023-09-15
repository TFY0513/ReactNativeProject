import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, ScrollView, Image, Dimensions } from 'react-native';

import Slideshow from 'react-native-image-slider-show';
import Card from './card';

import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';
import { firebaseConfig } from '../../firebase/config'; // Import your Firebase config

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);


const dimensions = Dimensions.get('window');
const imageHeight = Math.round(dimensions.width * 9 / 16);
const imageWidth = dimensions.width;


export default function Home({ navigation }) {
    const navigateAbout = () => {
        navigation.navigate('About');
    };
    const [images, setImage] = useState([
        { path: require('../image/job1.png'), alt: "Banner 1" },
        { path: require('../image/job2.png'), alt: "Banner 1" },
        { path: require('../image/job3.png'), alt: "Banner 1" },


    ]);

    const imageData = (


        [
            {
                url: require('../image/job1.png'),
                // title: 'Banner 1',
                // caption: 'Caption 1',
            },
            {
                url: require('../image/job2.png'),
                // title: 'Banner 2',
                // caption: 'Caption 1',
            },
            {
                url: require('../image/job3.png'),
                // title: 'Banner 3',
                // caption: 'Caption 1',
            }

        ]
    )
    const [data, setData] = useState({});


    useEffect(() => {
        const jobRef = ref(database, 'Job');
        onValue(jobRef, (snapshot) => {
            if (snapshot.exists()) {
                const postdata = snapshot.val();
                setData(postdata);
                console.log(postdata);
            }
        });
        // Clean up the listener when the component unmounts
        return () => jobRef.off();
    }, []);
    // database.ref('/Job').then((snapshot) => {
    //     const postdata = snapshot.val();
    //     console.log(postdata);
    //     // snapshot.forEach((jobSnapshot) => {
    //     //     const postdata = jobSnapshot.val();
    //     //     console.log(jobSnapshot.val())
    //     //     setData(postdata);
    //     // });
    // })

    return (

        <View >
            <Slideshow
                indicatorSelectedColor="green"
                dataSource={imageData} />
            {/* <Button title='about' onPress={navigateAbout} /> */}
            <View style={styles.hr}>
                <Text style={styles.header}>Latest Job Available</Text>
            </View>
            <ScrollView>
                <View >
                    {data && typeof data === 'object' && Object.keys(data).map((key) => (
                        <Card>
                            <Text key={key}>
                                {data[key]}
                            </Text>
                        </Card>
                    ))}

                </View>
            </ScrollView>

        </View>

    )
}

const styles = StyleSheet.create({

    item: {
        marginTop: 30,
        padding: 30,
        backgroundColor: 'pink',
        fontSize: 24,
    },
    header: {
        marginTop: 20,
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    hr: {

        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    gallery: {
        width: imageWidth,
        height: imageHeight,

    }

})
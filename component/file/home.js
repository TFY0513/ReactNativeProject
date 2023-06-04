import React, { useState } from "react";
import { StyleSheet, Text, View, Button, ScrollView, Image, Dimensions } from 'react-native';

import Slideshow from 'react-native-image-slider-show';
import Card from './card';

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
                    <Card> 
                  
                    </Card>
                    <Card>
                        <Text>23231</Text>
                    </Card>
                    <Card>
                        <Text>sss</Text>
                    </Card>
                    <Card>
                        <Text>23231</Text>
                    </Card>
                  
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
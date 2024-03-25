import React from 'react';
import { Image } from 'react-native';
import LandingPageImage from '../assets/LandingPageImage.jpg'
import { View } from 'react-native-web';
export default function LandingPage() {
    return (
        <View>
            <Image source={LandingPageImage} />
        </View>
        
    );
}
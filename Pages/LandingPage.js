import React from 'react';
import { StyleSheet, Image, View, Dimensions, ScrollView, Pressable } from 'react-native';
import LandingPageImage from '../assets/LandingPageImage.jpg'
import SearchBar from '../components/SearchBar';
import { useNavigation } from '@react-navigation/native';
export default function LandingPage() {

    return (
        <ScrollView
            style={styles.container}
            scrollEnabled={true}
            horizontal={false}>
            <Image style={styles.image} source={LandingPageImage} />
            <View style={styles.searchBarContainer}>
                <SearchBar />
            </View>
        </ScrollView>
    );
}

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({

    searchBarContainer: {
        position: 'absolute',
        top: '50%',
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: 1,
    },
    image: {
        alignItems: 'center',
        width: width * 1,
        height: height * 1,
    }
});
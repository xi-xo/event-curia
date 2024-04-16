import React from 'react';
import { StyleSheet, Image, View, Dimensions, ScrollView, Pressable } from 'react-native';
import LandingPageImage from '../assets/LandingPageImage.jpg'
import SearchBar from '../components/navigation/SearchBar';
import PostEvent from '../API/PostEvent';

export default function LandingPage() {

    return (
        <View>

            <Image style={styles.image} source={LandingPageImage} />
            <View style={styles.searchBarContainer}>
                <SearchBar />
                <PostEvent />
            </View>
        </View>

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
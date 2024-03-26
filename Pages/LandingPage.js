import React from 'react';
import { StyleSheet, Image, View, Button } from 'react-native';
import LandingPageImage from '../assets/LandingPageImage.jpg'
import SearchBar from '../components/SearchBar';
import { useNavigation } from '@react-navigation/native';
import CreateCalendarEvent from './CreateCalendarEvent';
export default function LandingPage() {
    const navigation = useNavigation();

    const goToHomePage = () => {
        navigation.navigate('HomePage')
    };

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={LandingPageImage} />
            <View style={styles.searchBarContainer}>
                <SearchBar />
            <Button title="Take me home" onPress={goToHomePage} />
            </View>
            <View>
                <CreateCalendarEvent/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchBarContainer: {
        position: 'absolute',
        top: '50%',
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: 1,
    },
});
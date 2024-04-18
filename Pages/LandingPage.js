import React, { useContext } from 'react';
import { StyleSheet, Image, View, Dimensions } from 'react-native';
import LandingPageImage from '../assets/LandingPageImage.jpg';
import PostEvent from '../API/PostEvent';
import SignInForm from '../components/authenticationMock/SignInMock';
import { SessionContext } from '@supabase/auth-helpers-react';

export default function LandingPage() {
    const { user } = useContext(SessionContext);

    return (
        <View>
            <Image style={styles.image} source={LandingPageImage} />
            <View style={styles.searchBarContainer}>
                {user ? <PostEvent /> : <SignInForm />}
            </View>
        </View>
    );
}

const { width, height } = Dimensions.get('window');

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
    },
});

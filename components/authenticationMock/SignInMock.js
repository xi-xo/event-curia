/**
 * SignInMock Component
 * 
 * This component provides a mock sign-in interface with email and password fields.
 * 
 * It includes animations for the logo and error handling for sign-in attempts.
 * 
 * Props:
 * - onSignIn: Function to handle sign-in process
 * 
 * @param {Function} onSignIn - Function to handle sign-in process
 * @returns {JSX.Element} - JSX element representing the SignInMock component
 */

import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, View, Pressable, Text, TextInput, Image, Animated } from 'react-native';
import ecLogo from '../../assets/EC logo.png';

const SignInMock = ({ onSignIn }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [fadeAnim] = useState(new Animated.Value(0)); // Initial value for opacity: 0

    useEffect(() => {
        Animated.timing(
            fadeAnim,
            {
                toValue: 1,
                duration: 500, 
                useNativeDriver: true 
            }
        ).start();
    }, []);

    const handleSignIn = async () => {
        setLoading(true);
        try {
            await onSignIn(email, password);
        } catch (error) {
            Alert.alert('Sign-in error', error.message);
        }
        setLoading(false);
    };

    return (
        <View style={styles.container}>
            <Animated.Image
                source={ecLogo}
                style={[styles.logo, { opacity: fadeAnim }]}
            />
            <View style={[styles.verticallySpaced, styles.mt20]}>
                <TextInput
                    label="Email"
                    onChangeText={setEmail}
                    value={email}
                    placeholder="email@address.com"
                    autoCapitalize="none"
                />
            </View>
            <View style={styles.verticallySpaced}>
                <TextInput
                    label="Password"
                    onChangeText={setPassword}
                    value={password}
                    secureTextEntry={true}
                    placeholder="Password"
                    autoCapitalize="none"
                />
            </View>
            <View style={[styles.verticallySpaced, styles.mt20]}>
                <Pressable
                    style={({ pressed }) => [
                        styles.button,
                        {
                            backgroundColor: pressed ? 'rgba(0,0,0,0.5)' : 'rgba(30,91,123,1.5)',
                        },
                    ]}
                    disabled={loading}
                    onPress={handleSignIn}
                >
                    <Text style={styles.buttonText}>Sign in</Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        padding: 12,
        alignItems: 'center', 
    },
    verticallySpaced: {
        borderColor: "#E0E0E0",
        borderWidth: 1,
        paddingTop: 5,
        paddingBottom: 4,
        alignSelf: 'stretch',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
    },
    mt20: {
        marginTop: 20,
    },
    button: {
        backgroundColor: '#1E5B7B',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
    },
    buttonText: {
        fontSize: 16,
        color: '#ffffff',
    },
    logo: {
        width: 200,
        height: 100,
        marginBottom: 20,
    },
});

export default SignInMock;

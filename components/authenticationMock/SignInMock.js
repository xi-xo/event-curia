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
                duration: 2000, // Control the duration of the animation
                useNativeDriver: true // Add this line for better performance
            }
        ).start();
    }, []);

    const handleSignIn = async () => {
        setLoading(true);
        try {
            // Call onSignIn with email and password
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
                            backgroundColor: pressed ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.8)',
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
        alignItems: 'center', // Center content horizontally
    },
    verticallySpaced: {
        paddingTop: 4,
        paddingBottom: 4,
        alignSelf: 'stretch',
    },
    mt20: {
        marginTop: 20,
    },
    button: {
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

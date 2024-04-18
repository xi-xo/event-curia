import React, { useState } from 'react';
import { Alert, StyleSheet, View, Pressable, Text, TextInput } from 'react-native';

const SignInMock = ({ onSignIn }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

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
});

export default SignInMock;

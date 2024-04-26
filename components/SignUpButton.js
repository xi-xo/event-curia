import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getCurrentUser } from '../components/authenticationMock/AuthService';
import { mockUsers } from '../utils/mockUsers';

const SignUpButton = ({ event, navigation, onSignUp }) => {
    
    const handleSignUp = async () => {
        try {
            const currentUser = await getCurrentUser();
    
            if (currentUser && mockUsers[currentUser.role]) {
                const eventInfo = {
                    name: event.name,
                    startDate: event.start.local,
                    endDate: event.end.local,
                };
    
                mockUsers[currentUser.role].events = [
                    ...mockUsers[currentUser.role].events,
                    eventInfo
                ];
    
                await AsyncStorage.setItem('mockUsers', JSON.stringify(mockUsers));
    
                console.log("Updated mockUsers after sign-up:", mockUsers);
                onSignUp(true);
                await new Promise(resolve => setTimeout(resolve, 2000)); 
                navigation.navigate('CreateEventInCalendar', { event });
            } else {
                console.error("User not found or invalid role:", currentUser);
            }
        } catch (error) {
            console.error("Error occurred during sign-up:", error);
            onSignUp(false);
        }
    };

    return (
        <Pressable style={styles.signUpButton} onPress={handleSignUp}>
            <Text style={styles.signUpButtonText}>Sign Up</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    signUpButton: {
        backgroundColor: '#1E5B7B',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        margin: 20
    },
    signUpButtonText: {
        color: '#ffffff',
        fontWeight: 'bold',
    },
});

export default SignUpButton;

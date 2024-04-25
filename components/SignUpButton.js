import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getCurrentUser } from '../components/authenticationMock/AuthService';
import { mockUsers } from '../utils/mockUsers';

const SignUpButton = ({ event }) => {
    console.log(event);
    const handleSignUp = async () => {
        try {
            // Fetch the current user
            const currentUser = await getCurrentUser();
    
            // Check if the current user exists and has a valid role
            if (currentUser && mockUsers[currentUser.role]) {
                // Extract necessary event details
                const eventInfo = {
                    name: event.name,
                    startDate: event.start.local,
                    endDate: event.end.local,
                    // Add more event details as needed
                };
    
                // Spread the existing events and add the new eventInfo object
                mockUsers[currentUser.role].events = [
                    ...mockUsers[currentUser.role].events,
                    eventInfo
                ];
    
                // Save the updated mockUsers object to AsyncStorage or elsewhere
                await AsyncStorage.setItem('mockUsers', JSON.stringify(mockUsers));
    
                console.log("Updated mockUsers after sign-up:", mockUsers);
            } else {
                console.error("User not found or invalid role:", currentUser);
            }
        } catch (error) {
            console.error("Error occurred during sign-up:", error);
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
    },
    signUpButtonText: {
        color: '#ffffff',
        fontWeight: 'bold',
    },
});

export default SignUpButton;

/**
 * Authentication Utility Functions
 * 
 * This module provides utility functions for user authentication, including signing in,
 * signing out, and retrieving the current user's information from AsyncStorage.
 * 
 * signIn: Authenticates a user by checking the provided email and password against mock user data.
 *         If successful, stores user's info in AsyncStorage.
 *         Parameters: email, password
 *         Returns: user info (id, email, role)
 *         Throws: If email or password is invalid
 * 
 * signOut: Signs out the current user by removing their info from AsyncStorage.
 * 
 * getCurrentUser: Retrieves the current user's info from AsyncStorage.
 *                 Returns: Current user's info or null if none signed in
 *                 Errors: Logs an error if there's an issue retrieving the info
 */

import { mockUsers } from "../../utils/mockUsers";
import AsyncStorage from "@react-native-async-storage/async-storage";

let currentUser = null;

export const signIn = async (email, password) => {

    const user = Object.values(mockUsers).find(u => u.username === email);

    if (user && user.password === password) {
        await AsyncStorage.setItem('currentUser', JSON.stringify({ ...user, role: user.role }));

        currentUser = { ...user, role: user.role }; 
        return { user: { id: '123', email: user.username, role: user.role } };
    } else {
        console.error('Sign-in failed. Invalid email or password');
        throw new Error('Invalid email or password');
    }
};


export const signOut = async () => {
    await AsyncStorage.removeItem('currentUser');
    currentUser = null;
};

export const getCurrentUser = async () => {
    try {
        const userData = await AsyncStorage.getItem('currentUser');
        return JSON.parse(userData);
    } catch (error) {
        console.error('Error getting current user:', error);
        return null;
    }
};

import { mockUsers } from "../../utils/mockUsers";
import AsyncStorage from "@react-native-async-storage/async-storage";

let currentUser = null;

export const signIn = async (email, password) => {

    const user = Object.values(mockUsers).find(u => u.username === email);

    if (user && user.password === password) {
        await AsyncStorage.setItem('currentUser', JSON.stringify({ ...user, role: user.role }));

        currentUser = { ...user, role: user.role }; // Update currentUser with role
        // If the user exists and the password matches, return the user object
        return { user: { id: '123', email: user.username, role: user.role } };
    } else {
        // If the email or password is invalid, throw an error
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

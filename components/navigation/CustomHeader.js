/**
 * CustomHeader Component
 * 
 * This component provides a customizable header for the application.
 * It includes navigation controls, menu options, and dynamic title rendering based on the current screen.
 * 
 * Props:
 * - isDark: Boolean indicating whether the header is in dark mode
 * - user: Object representing the current user
 * - userRole: String indicating the role of the current user
 * - onSignOut: Function to handle sign-out action
 * - isEventSignedUp: Boolean indicating whether the current event is signed up by the user
 * - title: String representing the title of the header
 * - eventName: String representing the name of the event
 * 
 * @param {boolean} isDark - Indicates whether the header is in dark mode
 * @param {object} user - Current user object
 * @param {string} userRole - Role of the current user
 * @param {function} onSignOut - Function to handle sign-out action
 * @param {boolean} isEventSignedUp - Indicates whether the current event is signed up by the user
 * @param {string} title - Title of the header
 * @param {string} eventName - Name of the event
 * @returns {JSX.Element} - JSX element representing the CustomHeader component
 */

import React, { useEffect, useState } from 'react';
import { Appbar, Menu } from 'react-native-paper';
import { useNavigation, useNavigationState } from '@react-navigation/native';

export default function CustomHeader({ isDark, user, userRole, onSignOut, isEventSignedUp, title, eventName }) {
    const [menuVisible, setMenuVisible] = useState(false);
    const navigation = useNavigation();
    const navigationState = useNavigationState(state => state);

    const openMenu = () => setMenuVisible(true);
    const closeMenu = () => setMenuVisible(false);

    const handleSignOut = () => {
        onSignOut(); 
        closeMenu(); 
    };

    useEffect(() => {
        setMenuVisible(false);
    }, [navigationState]);

    const handleGoBack = () => {
        navigation.goBack();
    };

    const navigateToPostEvent = () => {
        console.log("Navigating to CreateEvent...");
        navigation.navigate('CreateEvent');
    };

    const handleNavigateToAboutUs = () => {
        navigation.navigate('AboutUs');
    };

    const currentScreenName = navigationState.routes[navigationState.index].name;

    let headerTitle = eventName || title;
    if (currentScreenName === "Events") {
        headerTitle = "Events"; 
    } else if (currentScreenName === "AboutUs") {
        headerTitle = "About Us"; 
    } else if (currentScreenName === "CreateEvent") {
        headerTitle = "Create event"; 
    } else if (currentScreenName === "AddEventToGoogleCalendar") {
        headerTitle = "Add Event to Calendar";
    }

    return (
        <Appbar.Header statusBarHeight={40} dark={isDark} style={{ backgroundColor: '#143D52' }}>
            {navigationState.routes.length > 1 && <Appbar.BackAction onPress={handleGoBack} />}
            <Appbar.Content title={headerTitle} titleStyle={{ alignSelf: 'center' }} />
            {user && (
                <Menu
                    visible={menuVisible}
                    onDismiss={closeMenu}
                    anchor={<Appbar.Action icon="menu" color="white" onPress={openMenu} />}
                >
                    {userRole === 'staff' && (
                        <Menu.Item onPress={navigateToPostEvent} title="Create event" />
                    )}
                    {isEventSignedUp && (
                        <Menu.Item onPress={navigateToAddEventToCalendar} title="Add Event to Calendar" />
                    )}
                    <Menu.Item onPress={handleNavigateToAboutUs} title="About us" />
                    <Menu.Item onPress={handleSignOut} title="Sign Out" />
                </Menu>
            )}
        </Appbar.Header>
    );
}

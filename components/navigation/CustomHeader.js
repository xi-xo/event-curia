import React, { useEffect, useState } from 'react';
import { Appbar, Menu } from 'react-native-paper';
import { useNavigation, useNavigationState } from '@react-navigation/native';

export default function CustomHeader({ isDark, user, userRole, onSignOut, isEventSignedUp }) {
    const [menuVisible, setMenuVisible] = useState(false);
    const navigation = useNavigation();
    const navigationState = useNavigationState(state => state);

    const openMenu = () => setMenuVisible(true);
    const closeMenu = () => setMenuVisible(false);

    const handleSignOut = () => {
        console.log("Signing out from header menu...");
        onSignOut(); 
        closeMenu(); 
    };

    useEffect(() => {
        console.log("Navigation state changed:", navigationState);
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

    let headerTitle = "Welcome";
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

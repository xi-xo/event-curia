import React, { useEffect, useState } from 'react';
import { Appbar, Menu } from 'react-native-paper';
import { useNavigation, useNavigationState } from '@react-navigation/native';

export default function CustomHeader({ isDark, user, userRole, onSignOut }) {
    const [menuVisible, setMenuVisible] = useState(false);
    const navigation = useNavigation();
    const navigationState = useNavigationState(state => state);

    const openMenu = () => setMenuVisible(true);
    const closeMenu = () => setMenuVisible(false);

    const handleSignOut = () => {
        console.log("Signing out from header menu...");
        onSignOut(); // Call the sign-out function provided as prop
        closeMenu(); // Close the menu after signing out
    };

    useEffect(() => {
        console.log("Navigation state changed:", navigationState);
        setMenuVisible(false); // Close the menu when navigation state changes
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

    // Get the current screen name
    const currentScreenName = navigationState.routes[navigationState.index].name;

    let headerTitle = "Welcome"; // Default header title
    if (currentScreenName === "HomePage") {
        headerTitle = "Events"; // Set header title for HomePage
    } else if (currentScreenName === "AboutUs") {
        headerTitle = "About Us"; // Set header title for AboutUs page
    } else if (currentScreenName === "CreateEvent") {
        headerTitle = "Create event"; 
    }
    // Add more conditions for other screens as needed


    return (
        <Appbar.Header statusBarHeight={40} dark={isDark} style={{ backgroundColor: '#143D52' }}>
            {navigationState.routes.length > 1 && <Appbar.BackAction onPress={handleGoBack} />}
            <Appbar.Content title={headerTitle} titleStyle={{ alignSelf: 'center' }} />
            {user && ( // Render the menu icon only if user is authenticated
                <Menu
                    visible={menuVisible}
                    onDismiss={closeMenu}
                    anchor={<Appbar.Action icon="menu" color="white" onPress={openMenu} />}
                >
                    {userRole === 'staff' && (
                        <Menu.Item onPress={navigateToPostEvent} title="Create event" />
                    )}
                    <Menu.Item onPress={handleNavigateToAboutUs} title="About us" />
                    <Menu.Item onPress={handleSignOut} title="Sign Out" />
                </Menu>
            )}
        </Appbar.Header>
    );
}

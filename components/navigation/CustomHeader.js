//CustomHeader
import React, { useEffect, useState } from 'react';
import { Appbar, Menu } from 'react-native-paper';
import { useNavigation, useNavigationState } from '@react-navigation/native';

export default function CustomHeader({ title, isDark, user, userRole, onSignOut }) {
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
        console.log("Navigating to PostEvent...");
        navigation.navigate('PostEvent');
    };

    console.log("User role:", userRole);

    // Render only if user object and role exist
    if (!user) {
        return null;
    }

    return (
        <Appbar.Header statusBarHeight={40} dark={isDark} style={{ backgroundColor: '#143D52' }}>
            {navigationState.routes.length > 1 && <Appbar.BackAction onPress={handleGoBack} />}
            <Appbar.Content title={title} titleStyle={{ alignSelf: 'center' }} />
            
            <Menu
                visible={menuVisible}
                onDismiss={closeMenu}
                anchor={<Appbar.Action icon="menu" color="white" onPress={openMenu} />}
            >
                {userRole === 'staff' && (
                    <Menu.Item onPress={navigateToPostEvent} title="Create Event" />
                )}
                <Menu.Item onPress={handleSignOut} title="Sign Out" />
                {/* Add more Menu.Items for additional actions */}
            </Menu>
        </Appbar.Header>
    );
}
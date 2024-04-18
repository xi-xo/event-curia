import React, { useState, useEffect } from 'react';
import { Appbar, Menu } from 'react-native-paper';
import { useNavigation, useNavigationState } from '@react-navigation/native';

export default function CustomHeader({ title, isDark, onSignOut }) {
    const [menuVisible, setMenuVisible] = useState(false);
    const navigation = useNavigation();
    const navigationState = useNavigationState(state => state);

    const openMenu = () => setMenuVisible(true);
    const closeMenu = () => setMenuVisible(false);

    const handleSignOut = () => {
        onSignOut(); // Call the sign-out function provided as prop
        closeMenu(); // Close the menu after signing out
    };

    useEffect(() => {
        setMenuVisible(false); // Close the menu when navigation state changes
    }, [navigationState]);

    const handleGoBack = () => {
        navigation.goBack();
    };

    return (
        <Appbar.Header statusBarHeight={40} dark={isDark} style={{ backgroundColor: '#143D52' }}>
            {navigationState.routes.length > 1 && <Appbar.BackAction onPress={handleGoBack} />}
            <Appbar.Content title={title} titleStyle={{ alignSelf: 'center' }} />
            <Menu
                visible={menuVisible}
                onDismiss={closeMenu}
                anchor={<Appbar.Action icon="menu" color="white" onPress={openMenu} />}
            >
                <Menu.Item onPress={handleSignOut} title="Sign Out" />
                {/* Add more Menu.Items for additional actions */}
            </Menu>
        </Appbar.Header>
    );
}

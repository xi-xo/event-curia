import React, { useState, useEffect } from 'react';
import { Appbar, Menu } from 'react-native-paper';
import { useNavigation ,useNavigationState } from '@react-navigation/native'; // Import useNavigationState hook

export default function CustomHeader({ title, navigation }) {
    const [menuVisible, setMenuVisible] = useState(false);
    const navigationState = useNavigationState(state => state);
    const [showBackButton, setShowBackButton] = useState(false)

    const goBack = () => {
        navigation.goBack();
    };

    const openMenu = () => setMenuVisible(true);

    const closeMenu = () => setMenuVisible(false);

    const navigateToHomePage = () => {
        navigation.navigate('HomePage');
        closeMenu(); // Close the menu after navigating
    };

    useEffect(() => {
        if (navigationState.routes.length > 1) {
            setShowBackButton(true);
        } else {
            setShowBackButton(false);
        }
        setMenuVisible(false);
    }, [navigationState]); // Re-run effect when navigation state changes

    return (
        <Appbar.Header statusBarHeight={1} dark={true} style={{backgroundColor: '#143D52'}}>
            {showBackButton && <Appbar.BackAction onPress={goBack} />}
            <Appbar.Content title={"EventCuria"} />
            <Menu
                visible={menuVisible}
                onDismiss={closeMenu}
                anchor={<Appbar.Action icon="menu" color="white" onPress={openMenu} />}
            >
                <Menu.Item onPress={navigateToHomePage} title="Home Page" />
                {/* Add more Menu.Items for additional pages/services */}
            </Menu>
        </Appbar.Header>
    );
}

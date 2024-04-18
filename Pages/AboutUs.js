// AboutUsPage.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AboutUs() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                This application is designed to help manage events. It allows users to create, view, and manage events.
                Staff members have additional privileges such as creating new events.
            </Text>
        </View>
    );
    
};
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
        },
        text: {
            fontSize: 18,
            textAlign: 'center',
        },
    });
    
    
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import ecLogo from '../assets/EC logo.png';

export default function AboutUs() {
    return (
        <View style={styles.container}>
            <Image source={ecLogo} resizeMode='cover' style={styles.logo} />
            <Text style={styles.text}>
                <Text style={styles.header}>
                    Effortlessly plan and execute events of any scale with Event Curia.
                </Text> 
                {'\n\n'}
                <Text style={styles.info}>
                    Our name, inspired by the efficiency of a courier, reflects our commitment to delivering seamless event experiences.
                </Text> 
                {'\n\n'}
                <Text style={styles.bulletPoint}>
                    - Sign Up & Go:
                </Text> 
                <Text style={styles.info}>
                    Easily sign up for events and let Event Curia handle the rest. No more hassle; just pure convenience.
                </Text>
                {'\n\n'}
                <Text style={styles.bulletPoint}>
                    - Sync with Google Calendar:
                </Text> 
                <Text style={styles.info}>
                    Stay organized by seamlessly syncing events with your Google Calendar. Never miss an important date again.
                </Text>
                {'\n\n'}
                <Text style={styles.bulletPoint}>
                    - View & Create Events:
                </Text> 
                <Text style={styles.info}>
                    Explore upcoming events or create your own with our intuitive interface. Event planning has never been this easy.
                </Text>
                {'\n\n'}
                <Text style={styles.header}>
                    Join Event Curia today and discover the joy of stress-free event management.
                </Text>
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    text: {
        fontSize: 18,
        textAlign: 'center',
    },
    header: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 10,
    },
    bulletPoint: {
        fontWeight: 'bold',
    },
    info: {
        marginBottom: 10,
    }
});

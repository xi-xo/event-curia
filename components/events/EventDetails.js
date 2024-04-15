import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function EventDetails() {
    const navigation = useNavigation();
    const route = useRoute();
    const { event} = route.params;
    const { venue } = event
    console.log("I am event from route params:", event);
    console.log("I am venues from route params:", venue);

    useEffect(() => {
        if (event && event.name && event.name.text) {
            console.log("EventDetails: Setting screen title to:", event.name.text)
            navigation.setOptions({ title: event.name.text });
        }
    }, [event, navigation]);

    // Check if event and venues are present
    if (!event || !venue) {
        console.log("Event or venues not found:", event, venue);
        return (
            <View style={styles.errorContainer}>
                <Text>Error: Event or venues not found</Text>
            </View>
        );
    }

    // Log the event details and venue
    console.log("Event details:", event);
    console.log("Associated Venue:", venue);

    return (
        <View style={styles.details}>
            <Text style={styles.title}>{event.name.text}</Text>
            <Image
                style={styles.image}
                source={{ uri: event.logo.original.url }}
                resizeMode="cover"
            />
            <Text style={styles.description}>{event.description.text}</Text>
            <Text style={styles.capacity}>{event.capacity}</Text>
            {venue && <Text>Venue: {venue.name}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    details: {
        padding: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        marginBottom: 8,
    },
    capacity: {
        fontSize: 14,
        color: "#666",
    },
    image: {
        width: "100%",
        height: 200,
        borderRadius: 8,
        marginBottom: 8,
    },
});

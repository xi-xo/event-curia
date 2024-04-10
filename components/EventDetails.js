import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'

export default function EventDetails({ event }) {
    const navigation = useNavigation()

    useEffect(() => {
        if (event && event.name && event.name.text) {
            console.log("EventDetails: Setting screen title to:", event.name.text)
            navigation.setOptions({title: event.name.text})
        }
    },[event, navigation])

    if (!event) {
        return <Text>Loading...</Text>;
    }

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
        width: "100%", // Adjust width as needed
        height: 200, // Adjust height as needed
        borderRadius: 8,
        marginBottom: 8,
    },
});
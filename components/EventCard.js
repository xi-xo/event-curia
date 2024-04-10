import React from "react";
import { View, StyleSheet, Text, Image, Pressable } from "react-native";

export default function EventCard({ event, onPress }) {


    return (
        <Pressable onPress={onPress}>
            <View style={styles.card}>
                <Text style={styles.title}>{event.name.text}</Text>
                <Image
                    style={styles.image}
                    source={{ uri: event.logo.original.url }}
                    resizeMode="cover"
                />
                <Text style={styles.description}>{event.description.text}</Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        elevation: 4,
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
})
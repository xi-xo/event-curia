import React from "react";
import { View, StyleSheet, Text, Image, Pressable } from "react-native";
import ConditionalImage from "../ConditionalImage";

export default function EventCard({ event, onPress }) {
    const { name, logo, description, status } = event;

    const imageUrl = logo ? logo.original.url : null; 

    const limitedDescription = (text, maxLength) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + "..."; 
    };

    return (
        <Pressable onPress={() => onPress(name.text, event)}>
            <View style={styles.card}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{name.text}</Text>
                    <Text style={[styles.status, status === 'completed' ? styles.completed : styles.live]}>
                        {status === 'completed' ? 'Completed' : 'Live'}
                    </Text>
                </View>
                {imageUrl && (
                    <Image
                        style={styles.logo}
                        source={{ uri: imageUrl }}
                        resizeMode="cover"
                    />
                )}
                {!imageUrl && ( 
                    <ConditionalImage style={styles.ConditionalImage} eventName={name.text} />
                )}
                <Text style={styles.description}>{limitedDescription(description.text, 100)}</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        marginTop: 2,
        backgroundColor: "#fff",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "grey",
        padding: 16,
        marginBottom: 16,
        elevation: 4,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
    },
    status: {
        fontWeight: 'bold',
        color: 'green', 
    },
    completed: {
        color: 'red',
    },
    live: {
        color: 'green',
    },
    description: {
        fontSize: 18,
        marginBottom: 8,
    },
    capacity: {
        fontSize: 14,
        color: "#666",
    },
    logo: {
        width: "100%", 
        height: 200, 
        borderRadius: 8,
        marginBottom: 8,
    },
    ConditionalImage: {
        width: "100%", 
        height: 200, 
        borderRadius: 8,
        marginBottom: 8,
    },
});

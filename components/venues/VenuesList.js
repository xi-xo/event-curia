import React from "react";
import { View, StyleSheet, Text } from "react-native";
import EventsList from "../events/EventsList";


export default function VenuesList({ venues }) {
    

    return (
        <View style={styles.container}>
            {venues && venues.map((venue) => (
                <EventsList key={venue.id} venue={venues} />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});
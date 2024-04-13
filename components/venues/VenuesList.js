import React from "react";
import { View, StyleSheet } from "react-native";
import VenueCard from "./VenueCard";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});

export default function VenuesList({ venues }) {
    console.log("i am in venuesList", venues);

    return (
        <View style={styles.container}>
            {venues && venues.map((venue) => (
                <VenueCard key={venue.id} venue={venue} />
            ))}
        </View>
    );
}

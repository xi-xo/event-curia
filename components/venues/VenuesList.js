/**
 * VenuesList Component
 * 
 * This component displays a list of venues along with the events associated with each venue.
 * 
 * Props:
 * - venues: Array of venue objects
 * 
 * @param {Array} venues - Array of venue objects
 * @returns {JSX.Element} - JSX element representing the VenuesList component
 */

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
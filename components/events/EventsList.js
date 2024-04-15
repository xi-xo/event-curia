import React from "react";
import { View, ScrollView, StyleSheet, useWindowDimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import EventCard from "./EventCard";
import VenuesList from "../venues/VenuesList";

export default function EventsList({ events, venue }) {
    const navigation = useNavigation();
    const window = useWindowDimensions();
    // console.log("I am the venues from EvenstList", venue);

    const handleEventPress = (event, venue) => {
        navigation.navigate("EventDetail", { event: event, venue: venue });
        console.log("i am an event at the handleEventPree", event);
        console.log("i am an venues at the handleEventPree", venue);
    };

    const scrollViewHeight = events ? events.length * (window.height * 0.44) : 0;

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={[styles.scrollViewContent, { height: scrollViewHeight }]}>
                {events && events.map(event => (
                    <EventCard key={event.id} event={event} venue={venue} onPress={() => handleEventPress(event, venue)} />
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
    },
});
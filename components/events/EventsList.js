import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import EventCard from "./EventCard";

export default function EventsList({ events, venue }) {
    const navigation = useNavigation();

    const handleEventPress = (event, venue) => {
        navigation.navigate("EventDetail", { event: event, venue: venue });
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
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
    scrollView: {
        flex: 1,
        maxHeight: 850, // Adjust the maxHeight as needed
        backgroundColor: "lightgrey",
    },
});

import React from "react";
import { View, ScrollView, StyleSheet, useWindowDimensions } from "react-native";
import EventCard from "./EventCard";
import { useNavigation } from '@react-navigation/native';

export default function EventsList({ events }) {
    const navigation = useNavigation();
    const window = useWindowDimensions();

    const handleEventPress = (event) => {
        navigation.navigate("EventDetail", { event });
    };

    const scrollViewHeight = events ? events.length * (window.height * 0.3) : 0;

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={[styles.scrollViewContent, { height: scrollViewHeight }]}>
                {events && events.map(event => (
                    <EventCard key={event.id} event={event} onPress={() => handleEventPress(event)} />
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

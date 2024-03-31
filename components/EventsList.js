import React from "react";
import { View, Text } from "react-native-web";

export default function EventsList({ events }) {
    return (
        <View>
            <Text>Events</Text>
            {events && events.map(event => (
                <Text key={event.id}>{event.name.text}</Text>
            ))}
        </View>
    );
}
import React from "react";
import { View, ScrollView } from "react-native";
import EventCard from "./EventCard";
import { useNavigation } from '@react-navigation/native'

export default function EventsList({ events }) {
    const navigation = useNavigation()

    const handleEventPress = (event) => {
        navigation.navigate("EventDetail", { event })
    };

    return (
        <ScrollView>
            <View>
                {events && events.map(event => (
                    <EventCard key={event.id} event={event} onPress={() => handleEventPress(event)} />
                ))}
            </View>
        </ScrollView>
    );
}
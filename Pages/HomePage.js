import React from "react";
import { View } from "react-native";
import FetchEventsAPI from "../API/FetchEvents";
import FetchVenuesAPI from "../API/FetchVenues"
import EventsList from "../components/EventsList";

export default function HomePage() {
    return (
        <View style={{ flex: 1 }}>
            <FetchEventsAPI personalOAuthToken = 'WLCKG6QCZYMA4F5UH7BP' />
            <FetchVenuesAPI personalOAuthToken = 'WLCKG6QCZYMA4F5UH7BP' />
            <EventsList />
        </View>
    );
}
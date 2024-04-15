import React, { useEffect, useState } from "react";
import EventsList from "../components/events/EventsList"
import { View } from "react-native";

export default function FetchEvents({ personalOAuthToken, venues }) {
    const [events, setEvents] = useState([]);

    const organizationId = '2066542046663';

    useEffect(() => {

        fetch(
            `https://www.eventbriteapi.com/v3/organizations/${organizationId}/events/`,
            {
                headers: {
                    'Authorization': `Bearer ${personalOAuthToken}`
                }
            }
        )
        .then(response => response.json())
        .then(data => {
            console.log('Fetched events:', data);
            const eventsWithVenues = data.events.map(event => {
                const venue = venues.find(venue => venue.id === event.venue_id);
                return { ...event, venue };
            });
            setEvents(eventsWithVenues);
        });

    }, [organizationId, personalOAuthToken, venues]);

    return (
        <View style={{ flex:1 }}>
        <EventsList events={events} />
        </View>
        
    );
}

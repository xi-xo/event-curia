import React, { useEffect, useState } from "react";
import EventsList from "../components/events/EventsList"
import { View } from "react-native";
import { REACT_APP_ORGANIZATION_ID, REACT_APP_API_TOKEN } from '@env';

export default function FetchEvents({ venues }) {
    const [events, setEvents] = useState([]);


    useEffect(() => {

        fetch(
            `https://www.eventbriteapi.com/v3/organizations/${REACT_APP_ORGANIZATION_ID}/events/`,
            {
                headers: {
                    'Authorization': `Bearer ${REACT_APP_API_TOKEN}`
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

    }, [ venues]);

    return (
        <View style={{ flex:1 }}>
        <EventsList events={events} />
        </View>
        
    );
}

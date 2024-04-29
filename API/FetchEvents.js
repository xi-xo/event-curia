/**
 * FetchEvents Component
 * 
 * Component responsible for fetching events data from the Eventbrite API and combining it with venue data provided as props.
 * 
 * This component fetches events data based on the organization ID and API token provided as environment variables,
 * then combines the fetched events data with venue data provided as props. The resulting data is passed to the EventsList component.
 * 
 * Props:
 * - venues: Array of venue objects provided as props to combine with the fetched events data.
 * 
 * @param {Array} venues - Array of venue objects to combine with the fetched events data.
 * @returns {JSX.Element} - JSX element representing the FetchEvents component
 * 
 * State:
 * - events: Stores the array of events fetched from the Eventbrite API and combined with venue data.
 */

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

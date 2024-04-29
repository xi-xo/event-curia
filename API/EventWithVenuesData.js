/**
 * EventWithVenueData Component
 * 
 * Component responsible for fetching venue data and events data with venue information combined from the Eventbrite API.
 * 
 * This component fetches venue data and passes it as props to the FetchEvents component, which fetches events data 
 * and combines it with the fetched venue data. The combined data is then rendered using the EventsList component.
 * 
 * This component acts as a higher-level container that orchestrates the fetching of venue and events data.
 * 
 * Props:
 * None
 * 
 * @returns {JSX.Element} - JSX element representing the EventWithVenueData component
 * 
 * State:
 * - venues: Stores the array of venue data fetched from the Eventbrite API.
 * 
 */

import React, { useState, useEffect } from "react";
import { View } from "react-native";
import FetchEvents from "./FetchEvents";
import { REACT_APP_ORGANIZATION_ID, REACT_APP_API_TOKEN } from '@env';

export default function EventWithVenueData() {
    const [venues, setVenues] = useState([]);

    useEffect(() => {
        fetch(
            `https://www.eventbriteapi.com/v3/organizations/${ REACT_APP_ORGANIZATION_ID}/venues/`,
            {
                headers: {
                    'Authorization': `Bearer ${REACT_APP_API_TOKEN}`
                }
            }
        )
            .then(response => response.json())
            .then(data => {
                setVenues(data.venues);
            })
    }, [REACT_APP_ORGANIZATION_ID, REACT_APP_API_TOKEN]);

    return (
        <View style={{ flex: 1 }}>
            <FetchEvents REACT_APP_API_TOKEN={REACT_APP_API_TOKEN} venues={venues} />
        </View>
    );
}

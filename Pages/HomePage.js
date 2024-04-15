import React, { useState, useEffect } from "react";
import { View } from "react-native";
import FetchEvents from "../API/FetchEvents";

export default function HomePage() {
    const [venues, setVenues] = useState([]);
    const personalOAuthToken = 'WLCKG6QCZYMA4F5UH7BP';
    const organizationId = '2066542046663';

    useEffect(() => {
        fetch(
            `https://www.eventbriteapi.com/v3/organizations/${organizationId}/venues/`,
            {
                headers: {
                    'Authorization': `Bearer ${personalOAuthToken}`
                }
            }
        )
            .then(response => response.json())
            .then(data => {
                console.log('Fetched venues: as data', data);
                setVenues(data.venues);
            })
    }, [organizationId, personalOAuthToken]);

    return (
        <View style={{ flex: 1 }}>
            <FetchEvents personalOAuthToken={personalOAuthToken} venues={venues} />
        </View>
    );
}

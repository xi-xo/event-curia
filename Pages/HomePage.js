import React, { useState, useEffect } from "react";
import { View } from "react-native";
import FetchEvents from "../API/FetchEvents";
import { REACT_APP_ORGANIZATION_ID, REACT_APP_API_TOKEN } from '@env';

export default function HomePage() {
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
                console.log('Fetched venues: as data', data);
                setVenues(data.venues);
            })
    }, [REACT_APP_ORGANIZATION_ID, REACT_APP_API_TOKEN]);

    return (
        <View style={{ flex: 1 }}>
            <FetchEvents REACT_APP_API_TOKEN={REACT_APP_API_TOKEN} venues={venues} />
        </View>
    );
}

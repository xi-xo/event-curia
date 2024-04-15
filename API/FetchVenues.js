import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import VenuesList from '../components/venues/VenuesList';

export default function FetchEventsVenue({ personalOAuthToken }) {
    const [venues, setVenues] = useState([]);
    const [error, setError] = useState(null);

    const organizationId = '2066542046663'

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
        <VenuesList venues={venues} />
    );
}

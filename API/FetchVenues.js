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
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch venues');
            }
            return response.json();
        })
        .then(data => {
            console.log('Fetched venues:', data);
            setVenues(data.venues || []);
        })
        .catch(error => {
            console.error('Error fetching venues:', error);
            setError(error);
        });
    }, [organizationId, personalOAuthToken]);

    if (error) {
        return <Text>Error fetching venues: {error.message}</Text>;
    }

    return (
        <VenuesList venues={venues} />
    );
}

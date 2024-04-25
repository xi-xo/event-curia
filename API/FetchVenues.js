import React, { useEffect, useState } from 'react';
import { REACT_APP_ORGANIZATION_ID, REACT_APP_API_TOKEN } from '@env';

export default function FetchEventsVenue({ REACT_APP_API_TOKEN }) {
    const [venues, setVenues] = useState([]);


    useEffect(() => {
        fetch(
            `https://www.eventbriteapi.com/v3/organizations/${REACT_APP_ORGANIZATION_ID}/venues/`,
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
    return venues;
}

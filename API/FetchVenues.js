
jsx
Copy code
/**
 * FetchEventsVenue Component
 * 
 * Component responsible for fetching venues associated with a specific organization using the Eventbrite API.
 * 
 * This component fetches venue data based on the organization ID and API token provided as environment variables.
 * 
 * Props:
 * - REACT_APP_API_TOKEN: The API token required for authorization.
 * 
 * @param {string} REACT_APP_API_TOKEN - The API token required for authorization.
 * @returns {Array} - An array of venue objects fetched from the Eventbrite API.
 * 
 * State:
 * - venues: Stores the array of venue objects fetched from the Eventbrite API.
 */

import { useEffect, useState } from 'react';
import { REACT_APP_ORGANIZATION_ID } from '@env';

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

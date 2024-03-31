import React, { useEffect, useState } from "react";
import EventsList from "./EventsList";

export default function FetchEvents({ personalOAuthToken }) {
    const [events, setEvents] = useState([]);

    const organizationId = '2066542046663';

    useEffect(() => {
        const personalOAuthToken = 'WLCKG6QCZYMA4F5UH7BP';

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
            setEvents(data.events || []);
        });

    }, [organizationId, personalOAuthToken]);

    return (
        <EventsList events={events} />
    );
}

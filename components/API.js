import React, { useEffect, useState } from "react";
import { Text, View } from "react-native-web";

export default function Api() {
    const [events, setEvents] = useState([]);

    const organizationId = '2066542046663'; // Replace 'YOUR_ORGANIZATION_ID' with your actual organization ID

    useEffect(() => {
        const personalOAuthToken = 'WLCKG6QCZYMA4F5UH7BP'; // Replace 'YOUR_PERSONAL_OAUTH_TOKEN' with your actual personal OAuth token

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

    }, [organizationId]);

    return (
        <View>
            <Text>Events</Text>
            {events.map(event => (
                <Text key={event.id}>{event.name.text}</Text>
            ))}
        </View>
    );
}

import React, { useState } from "react";
import { Button, TextInput, View } from "react-native";
import { REACT_APP_ORGANIZATION_ID, REACT_APP_API_TOKEN } from '@env';

export default function PostEvent() {
    const [eventName, setEventName] = useState('')
    const [eventDescription, setEventDescription] = useState('')

    const handleCreateEvent = async () => {
        const eventDetails = {
            "event": {
                "name": {
                    "html": eventName
                },
                "start": {
                    "timezone": "UTC",
                    "utc": "2024-05-12T02:00:00Z"
                },
                "end": {
                    "timezone": "UTC",
                    "utc": "2024-05-12T04:00:00Z"
                },
                "currency": "GBP"
            }
        };

        const response = await fetch(`https://www.eventbriteapi.com/v3/organizations/${REACT_APP_ORGANIZATION_ID}/events/`, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer REACT_APP_API_TOKEN',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(eventDetails)
        });

        const data = await response.json();

        if (response.ok) {
            alert('Event created successfully');
        } else {
            alert(`Error creating event: ${data.error_description}`)
        }
    };

    return (
        <View>
            <TextInput
                placeholder="Event Name"
                onChangeText={setEventName}
            />
            <TextInput
                placeholder="Event Description"
                onChangeText={setEventDescription}
            />
            <Button
                title="Create Event"
                onPress={handleCreateEvent}
            />
        </View>
    );
};

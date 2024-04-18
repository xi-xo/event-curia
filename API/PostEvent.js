// PostEvent.js
import React, { useState } from "react";
import { Pressable, TextInput, View, ActivityIndicator, Text } from "react-native"; // Import Text from react-native

export default function PostEvent() {
    const [eventName, setEventName] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [loading, setLoading] = useState(false);

    const handleCreateEvent = async () => {
        // Input validation
        if (!eventName.trim() || !eventDescription.trim()) {
            alert('Please enter event name and description.');
            return;
        }

        console.log("Creating event...");
        setLoading(true);
        try {
            const eventDetails = {
                "event": {
                    "name": {
                        "html": eventName
                    },
                    "description": {
                        "html": eventDescription
                    },
                    "start": {
                        "timezone": "Europe/London",
                        "utc": "2024-05-01T12:00:00Z"
                    },
                    "end": {
                        "timezone": "Europe/London",
                        "utc": "2024-05-01T16:00:00Z"
                    },
                    "currency": "GBP",
                    "online_event": false,
                    "listed": false,
                    "shareable": false,
                    "password": '12345',
                    "capacity": 4,
                    "is_reserved_seating": false,
                    "is_series": false,
                    "locale": 'en_GB'
                }
            };

            const response = await fetch(`https://www.eventbriteapi.com/v3/organizations/${REACT_APP_ORGANIZATION_ID}/events/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${REACT_APP_API_TOKEN}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(eventDetails)
            });

            const data = await response.json();

            console.log("Response from Eventbrite API:", data);

            if (response.ok) {
                // Event created successfully, clear input fields
                setEventName('');
                setEventDescription('');
                alert('Event created successfully');
            } else {
                throw new Error(`Error creating event: ${data.error_description}`);
            }
        } catch (error) {
            console.error('Error creating event:', error);
            alert('An error occurred while creating the event. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View>
            <TextInput
                placeholder="Event Name"
                onChangeText={setEventName}
                value={eventName}
            />
            <TextInput
                placeholder="Event Description"
                onChangeText={setEventDescription}
                value={eventDescription}
            />
            <Pressable onPress={handleCreateEvent} style={({ pressed }) => [
                { backgroundColor: pressed ? '#b2b2b2' : '#007bff' },
                styles.pressable
            ]}>
                {({ pressed }) => (
                    <Text style={{ color: pressed ? 'gray' : 'white' }}>Create Event</Text>
                )}
            </Pressable>
            {loading && <ActivityIndicator size="large" color="#0000ff" />}
        </View>
    );
}

const styles = {
    pressable: {
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 10
    }
};

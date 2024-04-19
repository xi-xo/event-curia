import React, { useState } from "react";
import { Pressable, TextInput, View, ActivityIndicator, Text } from "react-native";
import { REACT_APP_ORGANIZATION_ID, REACT_APP_API_TOKEN } from '@env';
import CreateVenue from "../API/CreateVenue";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

if (!REACT_APP_ORGANIZATION_ID || !REACT_APP_API_TOKEN) {
    console.error('Please set your environment variables.');
}

export default function PostEvent() {
    const [eventName, setEventName] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [createdVenueId, setCreatedVenueId] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const formatDateTime = (date) => {
        const formattedDate = new Date(date);
        const year = formattedDate.getFullYear();
        const month = ('0' + (formattedDate.getMonth() + 1)).slice(-2);
        const day = ('0' + formattedDate.getDate()).slice(-2);
        const hours = ('0' + formattedDate.getHours()).slice(-2);
        const minutes = ('0' + formattedDate.getMinutes()).slice(-2);
        const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}:00Z`;
        return formattedDateTime;
    };

    const handleCreateEvent = async () => {
        // Input validation
        if (!eventName.trim() || !eventDescription.trim()) {
            alert('Please enter event name and description.');
            return;
        }

        // Check if a venue has been created
        if (!createdVenueId) {
            alert('Please create a venue.');
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
                        "utc": formatDateTime(startDate)
                    },
                    "end": {
                        "timezone": "Europe/London",
                        "utc": formatDateTime(endDate)
                    },
                    "capacity": 5,
                    "currency": "GBP",
                    "listed": false,
                    "shareable": false,
                    "is_reserved_seating": false,
                    "is_series": false,
                    "locale": 'en_GB',
                    "venue_id": createdVenueId
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

            console.log("Event created successfully:", data);
        } catch (error) {
            console.error('Error creating event:', error.message);
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
            <Text>Select Start Date</Text>
            <DatePicker selected={startDate} onChange={date => setStartDate(date)} showTimeSelect timeFormat="HH:mm" dateFormat="yyyy-MM-dd HH:mm" />

            <Text>Select End Date</Text>
            <DatePicker selected={endDate} onChange={date => setEndDate(date)} showTimeSelect timeFormat="HH:mm" dateFormat="yyyy-MM-dd HH:mm" />

            <CreateVenue onSuccess={setCreatedVenueId} /> 
            <Pressable disabled={loading} onPress={handleCreateEvent} style={({ pressed }) => [
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

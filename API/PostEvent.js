import React, { useState } from "react";
import { Pressable, TextInput, View, ActivityIndicator, Text, StyleSheet, ScrollView } from "react-native";
import { REACT_APP_ORGANIZATION_ID, REACT_APP_API_TOKEN } from '@env';
import CreateVenue from "../API/CreateVenue";
import CreateTicketClass from "./CreateTicketClass";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PublishEvent from "./PublishEvent";

if (!REACT_APP_ORGANIZATION_ID || !REACT_APP_API_TOKEN) {
    console.error('Please set your environment variables.');
}

export default function PostEvent() {
    const [eventName, setEventName] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [capacity, setCapacity] = useState('');
    const [loading, setLoading] = useState(false);
    const [createdVenueId, setCreatedVenueId] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [createdEventId, setCreatedEventId] = useState(null); // State to hold the created event ID

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
        if (!eventName.trim() || !eventDescription.trim() || !capacity.trim()) {
            alert('Please enter event name, description, and capacity.');
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
                    "capacity": parseInt(capacity), // Parse capacity to integer
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
                // Event created successfully, set the created event ID
                setCreatedEventId(data.id);
                // Clear input fields
                setEventName('');
                setEventDescription('');
                setCapacity('');
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
    const handleTicketClassSuccess = (ticketClassId) => {
        console.log('Ticket class created successfully:', ticketClassId);
        // Handle any logic after the ticket class is created
    };

    return (
        <ScrollView>

            <View style={styles.container}>
                <TextInput
                    placeholder="Event Name"
                    onChangeText={setEventName}
                    value={eventName}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Event Description"
                    onChangeText={setEventDescription}
                    value={eventDescription}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Capacity"
                    onChangeText={setCapacity}
                    value={capacity}
                    keyboardType="numeric" // Set keyboard type to numeric
                    style={styles.input}
                />
                <Text style={styles.label}>Select Start Date</Text>
                <DatePicker selected={startDate} onChange={date => setStartDate(date)} showTimeSelect timeFormat="HH:mm" dateFormat="yyyy-MM-dd HH:mm" />

                <Text style={styles.label}>Select End Date</Text>
                <DatePicker selected={endDate} onChange={date => setEndDate(date)} showTimeSelect timeFormat="HH:mm" dateFormat="yyyy-MM-dd HH:mm" />

                <Pressable disabled={loading} onPress={handleCreateEvent} style={({ pressed }) => [
                    { backgroundColor: pressed ? '#b2b2b2' : '#007bff' },
                    styles.pressable
                ]}>
                    {({ pressed }) => (
                        <Text style={{ color: pressed ? 'gray' : 'white' }}>Create Event</Text>
                    )}
                </Pressable>
                {loading && <ActivityIndicator size="large" color="#0000ff" />}
                <CreateVenue onSuccess={setCreatedVenueId} />
                <CreateTicketClass eventId={createdEventId} onSuccess={handleTicketClassSuccess} />
                <PublishEvent eventId={createdEventId} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    pressable: {
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 10,
        backgroundColor: '#007bff',
    },
});

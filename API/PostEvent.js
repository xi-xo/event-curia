import React, { useState } from "react";
import { Pressable, TextInput, View, ActivityIndicator, Text, StyleSheet, ScrollView, Alert } from "react-native";
import { REACT_APP_ORGANIZATION_ID, REACT_APP_API_TOKEN } from '@env';
import CreateVenue from "../API/CreateVenue";
import CreateTicketClass from "./CreateTicketClass";
import PublishEvent from "./PublishEvent";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function PostEvent() {
    const [step, setStep] = useState(1);
    const [eventName, setEventName] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [capacity, setCapacity] = useState('');
    const [loading, setLoading] = useState(false);
    const [createdVenueId, setCreatedVenueId] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [createdEventId, setCreatedEventId] = useState(null);

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
        if (!eventName.trim() || !eventDescription.trim() || !capacity.trim() || isNaN(capacity)) {
            Alert.alert('Invalid input', 'Please enter event name, description, and a valid capacity.');
            return;
        }

        // Check if a venue has been created
        if (!createdVenueId) {
            Alert.alert('Missing venue', 'Please create a venue before proceeding.');
            return;
        }

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
                    "capacity": parseInt(capacity),
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

            if (response.ok) {
                setCreatedEventId(data.id);
                Alert.alert('Event created', 'Event created successfully.');
                setStep(step + 1); // Move to the next step
            } else {
                throw new Error(`Error creating event: ${data.error_description}`);
            }
        } catch (error) {
            console.error('Error creating event:', error.message);
            Alert.alert('Error', 'An error occurred while creating the event. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleTicketClassSuccess = (ticketClassId) => {
        console.log('Ticket class created successfully:', ticketClassId);
        setStep(step + 1); // Move to the next step
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                {step === 1 ? (
                    <CreateVenue onSuccess={id => {
                        setCreatedVenueId(id);
                        setStep(step + 1); // Move to the next step
                    }} />
                ) : step === 2 ? (
                    <View>
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
                            placeholder="attendees capacity"
                            onChangeText={setCapacity}
                            value={capacity}
                            keyboardType="numeric"
                            style={styles.input}
                        />
                        <Text style={styles.label}>Select Start Date</Text>
                        <DatePicker selected={startDate} onChange={date => setStartDate(date)} showTimeSelect timeFormat="HH:mm" dateFormat="yyyy-MM-dd HH:mm" />

                        <Text style={styles.label}>Select End Date</Text>
                        <DatePicker selected={endDate} onChange={date => setEndDate(date)} showTimeSelect timeFormat="HH:mm" dateFormat="yyyy-MM-dd HH:mm" />

                        <Pressable disabled={loading} onPress={handleCreateEvent} style={styles.pressable}>
                            {({ pressed }) => (
                                <Text style={{ color: pressed ? 'gray' : 'white' }}>Create Event</Text>
                            )}
                        </Pressable>
                        {loading && <ActivityIndicator size="large" color="#0000ff" />}
                    </View>
                ) : step === 3 ? (
                    <CreateTicketClass eventId={createdEventId} onSuccess={handleTicketClassSuccess} />
                ) : step === 4 ? (
                    <PublishEvent eventId={createdEventId} />
                ) : null}
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
        backgroundColor: '#1E5B7B',
        padding: 10,
        top: 30,
        paddingVertical: 10,
        paddingHorizontal: -10,
        borderRadius: 5,
        alignItems: 'center',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
    },
});

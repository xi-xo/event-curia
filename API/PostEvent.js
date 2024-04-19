import React, { useState, useEffect } from "react";
import { TextInput, View, ActivityIndicator, Text, Pressable } from "react-native";
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
    const [eventCapacity, setEventCapacity] = useState('');
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

    useEffect(() => {
        if (createdVenueId) {
            handlePublishEvent();
        }
    }, [createdVenueId]); // Run this effect whenever createdVenueId changes

    const handlePublishEvent = async () => {
        // Input validation
        if (!eventName.trim() || !eventDescription.trim() || !eventCapacity.trim()) {
            alert('Please enter event name, description, and capacity.');
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
                    "capacity": eventCapacity,
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
                setEventCapacity('');
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

    const handleCreateVenueSuccess = (venueId) => {
        setCreatedVenueId(venueId);
    };

    return (
        <View>
            <View>
                <Text style={styles.title}>Enter event details</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Event Name"
                    onChangeText={setEventName}
                    value={eventName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Event Description"
                    onChangeText={setEventDescription}
                    value={eventDescription}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Event Capacity"
                    onChangeText={setEventCapacity}
                    value={eventCapacity}
                    keyboardType="numeric"
                />
            </View>
            
            <View>
                <Text>Select Start Date</Text>
            </View>
            <DatePicker selected={startDate} onChange={date => setStartDate(date)} showTimeSelect timeFormat="HH:mm" dateFormat="yyyy-MM-dd HH:mm" />
            <View>
                <Text>Select End Date</Text>
            </View>
            <DatePicker selected={endDate} onChange={date => setEndDate(date)} showTimeSelect timeFormat="HH:mm" dateFormat="yyyy-MM-dd HH:mm" />

            <CreateVenue onSuccess={handleCreateVenueSuccess} />
            <Pressable disabled={loading} onPress={handlePublishEvent} >
            </Pressable>
            {loading && <ActivityIndicator size="large" color="#0000ff" />}
        </View>
    );
}

const styles = {
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    
};

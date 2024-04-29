/**
 * CreateTicketClass Component
 * 
 * Component responsible for creating ticket classes for events. 
 * Allows users to input ticket details such as name, description, and quantity,
 * and then sends the information to the Eventbrite API to create the ticket class.
 * 
 * This component is used in the event creation process to add ticket classes 
 * to the events being created.
 * 
 * Props:
 * - eventId: ID of the event for which the ticket class is being created.
 * - onSuccess: Callback function invoked when the ticket class is successfully created.
 * 
 * @param {string} eventId - ID of the event for which the ticket class is being created.
 * @param {Function} onSuccess - Callback function invoked when the ticket class is successfully created.
 * 
 * @returns {JSX.Element} - JSX element representing the CreateTicketClass component
 * 
 * State:
 * - ticketName: Stores the name of the ticket being created.
 * - ticketDescription: Stores the description of the ticket being created.
 * - quantityTotal: Stores the total quantity of tickets being created.
 * - loading: Indicates whether the component is in a loading state (e.g., while fetching data or performing an operation).
 * 
 * Methods:
 * - handleCreateTicketClass: Handles the process of creating a ticket class, including input validation, API call, and state updates.
 * 
 * External Dependencies:
 * - react: "^17.0.2"
 * - react-native: "^0.66.4"
 * - @env: "^1.0.6"
 * 
 * @requires react
 * @requires react-native
 * @requires @env
 * 
 * @props {string} eventId - ID of the event for which the ticket class is being created.
 * @props {Function} onSuccess - Callback function invoked when the ticket class is successfully created.
 * @params None
 */

import React, { useState } from "react";
import { Pressable, TextInput, View, ActivityIndicator, Text, Alert, StyleSheet } from "react-native";
import { REACT_APP_ORGANIZATION_ID, REACT_APP_API_TOKEN } from '@env';

if (!REACT_APP_ORGANIZATION_ID || !REACT_APP_API_TOKEN) {
    console.error('Please set your environment variables.');
}

export default function CreateTicketClass({ eventId, onSuccess }) {
    const [ticketName, setTicketName] = useState('');
    const [ticketDescription, setTicketDescription] = useState('');
    const [quantityTotal, setQuantityTotal] = useState('');
    const [loading, setLoading] = useState(false);

    const handleCreateTicketClass = async () => {
        if (!ticketName.trim() || !ticketDescription.trim() || !quantityTotal.trim()) {
            Alert.alert('Error', 'Please enter ticket name, description, and quantity.');
            return;
        }

        if (isNaN(quantityTotal)) {
            Alert.alert('Error', 'Quantity should be a number.');
            return;
        }

        setLoading(true);
        try {
            const ticketClassDetails = {
                ticket_class: {
                    name: ticketName,
                    description: ticketDescription,
                    sorting: 5, 
                    cost: "GBP,0", 
                    donation: false,
                    free: true,
                    delivery_methods: ['electronic'],
                    quantity_total: parseInt(quantityTotal), 
                }
            };

            const response = await fetch(`https://www.eventbriteapi.com/v3/events/${eventId}/ticket_classes/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${REACT_APP_API_TOKEN}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(ticketClassDetails)
            });

            const data = await response.json();

            console.log("Response from Eventbrite API:", data);

            if (!response.ok) {
                throw new Error(`Error creating ticket class: ${data.error_description}`);
            }

            onSuccess(data.id);
            console.log("Ticket class created successfully:", data);
        } catch (error) {
            console.error('Error creating ticket class:', error.message);
            Alert.alert('Error', 'An error occurred while creating the ticket class. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Ticket Name"
                onChangeText={setTicketName}
                value={ticketName}
                style={styles.input}
            />
            <TextInput
                placeholder="Ticket Description"
                onChangeText={setTicketDescription}
                value={ticketDescription}
                style={styles.input}
            />
            <TextInput
                placeholder="Quantity"
                onChangeText={setQuantityTotal}
                value={quantityTotal}
                keyboardType="numeric" 
                style={styles.input}
            />
            <Pressable disabled={loading} onPress={handleCreateTicketClass} style={({ pressed }) => [
                { backgroundColor: pressed ? '#b2b2b2' : '#007bff' },
                styles.pressable
            ]}>
                {({ pressed }) => (
                    <Text style={{ color: pressed ? 'gray' : 'white' }}>Create Ticket Class</Text>
                )}
            </Pressable>
            {loading && <ActivityIndicator size="large" color="#0000ff" />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 5,
    },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
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

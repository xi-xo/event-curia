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
        // Input validation
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
                    sorting: 5, // Adjust as needed
                    cost: "GBP,0", // Format cost parameter correctly
                    donation: false,
                    free: true,
                    delivery_methods: ['electronic'],
                    quantity_total: parseInt(quantityTotal), // Parse quantityTotal to integer
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

            // Ticket class created successfully
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
                keyboardType="numeric" // Set keyboard type to numeric
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
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 10,
    },
});

/**
 * CreateVenue Component
 * 
 * Component responsible for creating a venue. Handles input for venue name, address, city,
 * postal code, and region.
 * 
 * This component provides an interface for users to input venue details and create a venue.
 * 
 * Props:
 * - onSuccess: Function to be called upon successful creation of the venue. Accepts the venue ID as a parameter.
 * 
 * @param {Function} onSuccess - Callback function invoked upon successful venue creation.
 * @returns {JSX.Element} - JSX element representing the CreateVenue component
 * 
 * State:
 * - venueName: Stores the name of the venue being created.
 * - venueAddress: Stores the address of the venue being created.
 * - venueCity: Stores the city of the venue being created.
 * - venuePostalCode: Stores the postal code of the venue being created.
 * - venueRegion: Stores the region of the venue being created.
 * - loading: Indicates whether the component is in a loading state (e.g., while fetching data or performing an operation).
 * 
 * Methods:
 * - handleCreateVenue: Handles the venue creation process, including validation, API calls, and state updates.
 * 
 * External Dependencies:
 * None
 */

import React, { useState } from "react";
import { TextInput, Pressable, Text, ActivityIndicator, View, StyleSheet } from "react-native";
import { REACT_APP_ORGANIZATION_ID, REACT_APP_API_TOKEN } from '@env';

export default function CreateVenue({ onSuccess }) {
    const [venueName, setVenueName] = useState('');
    const [venueAddress, setVenueAddress] = useState('');
    const [venueCity, setVenueCity] = useState('');
    const [venuePostalCode, setVenuePostalCode] = useState('');
    const [venueRegion, setVenueRegion] = useState('');
    const [loading, setLoading] = useState(false);

    const handleCreateVenue = async () => {
        if (!venueName.trim() || !venueAddress.trim() || !venueCity.trim() || !venuePostalCode.trim() || !venueRegion.trim()) {
            alert('Please enter venue name, address, city, postal code, and region.');
            return;
        }

        console.log("Creating venue...");
        setLoading(true);
        try {
            const venueDetails = {
                "venue": {
                    "name": venueName,
                    "address": {
                        "address_1": venueAddress,
                        "city": venueCity,
                        "region": venueRegion,
                        "postal_code": venuePostalCode,
                    }
                }
            };

            const response = await fetch(`https://www.eventbriteapi.com/v3/organizations/${REACT_APP_ORGANIZATION_ID}/venues/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${REACT_APP_API_TOKEN}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(venueDetails)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(`Error creating venue: ${data.error_description}`);
            }

            console.log("Venue created successfully:", data);

            onSuccess(data.id);
        } catch (error) {
            console.error('Error creating venue:', error);
            alert('An error occurred while creating the venue. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Venue Name"
                onChangeText={setVenueName}
                value={venueName}
                style={styles.input}
            />
            <TextInput
                placeholder="Address"
                onChangeText={setVenueAddress}
                value={venueAddress}
                style={styles.input}
            />
            <TextInput
                placeholder="City"
                onChangeText={setVenueCity}
                value={venueCity}
                style={styles.input}
            />
            <TextInput
                placeholder="Region"
                onChangeText={setVenueRegion}
                value={venueRegion}
                style={styles.input}
            />
            <TextInput
                placeholder="Postal Code"
                onChangeText={setVenuePostalCode}
                value={venuePostalCode}
                style={styles.input}
            />
            <Pressable onPress={handleCreateVenue} style={({ pressed }) => [
                { backgroundColor: pressed ? '#b2b2b2' : '#007bff' },
                styles.pressable
            ]}>
                {({ pressed }) => (
                    <Text style={{ color: pressed ? 'gray' : 'white' }}>Create Venue</Text>
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

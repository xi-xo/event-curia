//CreateVenues component
import React, { useState } from "react";
import { TextInput, Pressable, Text, ActivityIndicator, View } from "react-native";
import { REACT_APP_ORGANIZATION_ID, REACT_APP_API_TOKEN } from '@env';

export default function CreateVenue({ onSuccess }) {
    const [venueName, setVenueName] = useState('');
    const [venueAddress, setVenueAddress] = useState('');
    const [venueCity, setVenueCity] = useState('');
    const [venuePostalCode, setVenuePostalCode] = useState('');
    const [venueRegion, setVenueRegion] = useState('');
    const [loading, setLoading] = useState(false);

    const handleCreateVenue = async () => {
        // Input validation
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

            // Invoke onSuccess callback with venue data
            onSuccess(data.id);
        } catch (error) {
            console.error('Error creating venue:', error);
            alert('An error occurred while creating the venue. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <TextInput
                placeholder="Venue Name"
                onChangeText={setVenueName}
                value={venueName}
            />
            <TextInput
                placeholder="Address"
                onChangeText={setVenueAddress}
                value={venueAddress}
            />
            <TextInput
                placeholder="City"
                onChangeText={setVenueCity}
                value={venueCity}
            />
            <TextInput
                placeholder="Region"
                onChangeText={setVenueRegion}
                value={venueRegion}
            />
            <TextInput
                placeholder="Postal Code"
                onChangeText={setVenuePostalCode}
                value={venuePostalCode}
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
        </>
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
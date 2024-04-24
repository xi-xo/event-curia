import React, { useState } from "react";
import { Pressable, Text, ActivityIndicator, StyleSheet } from "react-native";
import { REACT_APP_ORGANIZATION_ID, REACT_APP_API_TOKEN } from '@env';

const PublishEvent = ({ eventId }) => {
    const [loading, setLoading] = useState(false);

    const handlePublishEvent = async () => {
        setLoading(true);
        try {
            const response = await fetch(`https://www.eventbriteapi.com/v3/events/${eventId}/publish/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${REACT_APP_API_TOKEN}`,
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            if (response.ok) {
                console.log('Event published:', data);
                alert('Event published successfully');
            } else {
                throw new Error(`Error publishing event: ${data.error_description}`);
            }
        } catch (error) {
            console.error('Error publishing event:', error.message);
            alert('An error occurred while publishing the event. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
        <Pressable disabled={loading} onPress={handlePublishEvent} style={({ pressed }) => [
                { backgroundColor: pressed ? '#b2b2b2' : '#007bff' },
                styles.pressable
            ]}>
                {({ pressed }) => (
                    <Text style={{ color: pressed ? 'gray' : 'white' }}>Publish Event</Text>
                )}
            </Pressable>
            {loading && <ActivityIndicator size="large" color="#0000ff" />}
        </>
    );
};

const styles = StyleSheet.create({
    pressable: {
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 10
    }
});

export default PublishEvent;

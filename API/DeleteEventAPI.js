import React from "react";
import { REACT_APP_API_TOKEN } from '@env';


export async function deleteEvent(eventId) {
    try {
        const response = await fetch(`https://www.eventbriteapi.com/v3/events/${eventId}/`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${REACT_APP_API_TOKEN}`
            }
        });

        console.log('Status:', response.status);
        console.log('Headers:', response.headers);
        console.log('Body:', await response.text());

        if (response.ok) {
            console.log('Event deleted successfully');
            return true; // Indicate successful deletion
        } else {
            console.error('Failed to delete event');
            return false; // Indicate deletion failure
        }
    } catch (error) {
        console.error('An error occurred while deleting event:', error);
        throw error; // Throw error to handle it in the calling function
    }
}

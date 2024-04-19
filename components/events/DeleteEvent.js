import React, { useState } from 'react';
import { View, Button } from 'react-native';
import { deleteEvent } from './DeleteEvent'; // Assuming you'll have a separate file for the deleteEvent function

export default function DeleteEvent({ selectedEvents }) {
    const [deleting, setDeleting] = useState(false);

    const handleDeleteEvents = async () => {
        setDeleting(true);
        try {
            // Iterate over selected events and delete each one
            for (const event of selectedEvents) {
                await deleteEvent(event.id);
                // Optionally, update UI or provide feedback after each deletion
            }
            // Optionally, update UI or provide feedback after all deletions are completed
        } catch (error) {
            console.error('Error deleting events:', error);
            // Optionally, handle error and display appropriate message to the user
        } finally {
            setDeleting(false);
        }
    };

    return (
        <View>
            <Button
                title="Delete Selected Events"
                onPress={handleDeleteEvents}
                disabled={deleting || selectedEvents.length === 0} // Disable button if no events selected or deletion in progress
            />
        </View>
    );
}

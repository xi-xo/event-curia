import React, { useState } from 'react';
import { View, Button } from 'react-native';
import { deleteEvent } from './DeleteEvent'; 

export default function DeleteEvent({ selectedEvents }) {
    const [deleting, setDeleting] = useState(false);

    const handleDeleteEvents = async () => {
        setDeleting(true);
        try {
            for (const event of selectedEvents) {
                await deleteEvent(event.id);
            }
        } catch (error) {
            console.error('Error deleting events:', error);
        } finally {
            setDeleting(false);
        }
    };

    return (
        <View>
            <Button
                title="Delete Selected Events"
                onPress={handleDeleteEvents}
                disabled={deleting || selectedEvents.length === 0}
            />
        </View>
    );
}

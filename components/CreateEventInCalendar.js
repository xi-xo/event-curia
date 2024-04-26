import React, { useState } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { View, Text, StyleSheet, Pressable, TextInput, ActivityIndicator } from "react-native";
import DateTimePicker from "react-datetime-picker";
import PopupMessage from "./PopUpMessage";

export default function CreateEventInCalendar({ route }) {
    const { event } = route.params;
    const [start, setStart] = useState(new Date(event.start.local));
    const [end, setEnd] = useState(new Date(event.end.local));
    const [eventName, setEventName] = useState(event.name.text);
    const [eventDescription, setEventDescription] = useState(event.description.text);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const session = useSession();
    const supabase = useSupabaseClient();

    async function googleSignIn() {
        setIsLoading(true);
        try {
            await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    scopes: 'https://www.googleapis.com/auth/calendar'
                }
            });
            // Log session after signing in with Google
            console.log("Session after signing in with Google:", session);
        } catch (error) {
            alert("Error logging in to Google provider with Supabase");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    async function signOut() {
        await supabase.auth.signOut();
    }

    async function CreateCalendarEvent() {
        console.log("Creating Calendar Event");
        try {
            setIsLoading(true);
            const eventDetails = {
                'summary': eventName,
                'description': eventDescription,
                'start': {
                    'dateTime': start.toISOString(),
                    'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
                },
                'end': {
                    'dateTime': end.toISOString(),
                    'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
                },
            };
            const response = await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
                method: "POST",
                headers: {
                    'Authorization': 'Bearer ' + session.provider_token 
                },
                body: JSON.stringify(eventDetails)
            });
            if (!response.ok) {
                throw new Error('Failed to create event');
            }
            const data = await response.json();
            console.log("Response from Google Calendar API:", data);
            setShowSuccessMessage(true);
        } catch (error) {
            console.error("Error occurred while creating event:", error);
            setShowErrorMessage(true);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            {session ? (
                <>
                    <View style={styles.googleUser}>
                        <Text style={styles.userInfoText}>Signed in as:</Text>
                        <Text style={styles.userInfoText}>{session.user.email}</Text>
                    </View>

                    <View style={styles.eventDetailsContainer}>
                        <Text style={styles.infoTitle}>Event Name</Text>
                        <TextInput
                            style={styles.input}
                            value={eventName}
                            onChangeText={setEventName}
                        />
                        <Text style={styles.infoTitle}>Event Description</Text>
                        <TextInput
                            style={styles.input}
                            value={eventDescription}
                            onChangeText={setEventDescription}
                        />

                        <Text style={styles.infoTitle}>START:</Text>
                        <DateTimePicker
                            onChange={setStart}
                            value={start}
                        />
                        <Text style={styles.infoTitle}>END</Text>
                        <DateTimePicker
                            onChange={setEnd}
                            value={end}
                        />
                    </View>

                    <View style={styles.buttonContainer}>
                        <Pressable style={styles.button} onPress={CreateCalendarEvent}>
                            <Text style={styles.buttonText}>Create Event</Text>
                        </Pressable>
                        <Pressable style={styles.button} onPress={signOut}>
                            <Text style={styles.buttonText}>Sign Out</Text>
                        </Pressable>
                    </View>
                </>
            ) : (
                <Pressable style={styles.button} onPress={googleSignIn}>
                    <Text style={styles.buttonText}>Sign In With Google</Text>
                </Pressable>
            )}

            {isLoading && <ActivityIndicator size="large" color="#1E5B7B" />}

            {showSuccessMessage && !showErrorMessage && (
                <PopupMessage
                    message="Event successfully added to your Google Calendar!"
                    onClose={() => setShowSuccessMessage(false)}
                />
            )}

            {showErrorMessage && (
                <PopupMessage
                    message="Error occurred while adding the event to your Google Calendar. To fix issue Sign out and Sign in again."
                    onClose={() => setShowErrorMessage(false)}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    googleUser: {
        marginBottom: 20,
    },
    userInfoText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: "#666",
    },
    eventDetailsContainer: {
        marginBottom: 20,
    },
    infoTitle: {
        fontWeight: "bold",
        fontSize: 16,
        color: "#666",
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        width: '100%',
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: '100%',
    },
    button: {
        backgroundColor: '#1E5B7B',
        padding: 10,
        borderRadius: 5,
        width: '45%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: 'bold',
    },
});

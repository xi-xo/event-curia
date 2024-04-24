import React, { useState } from "react";
import { useSession, useSupabaseClient, useSessionContext } from "@supabase/auth-helpers-react";
import { View, Text, StyleSheet, Pressable, ScrollView, TextInput } from "react-native";
import DateTimePicker from "react-datetime-picker";

export default function CreateEventInCalendar({ route }) {
    const { event } = route.params;
    const [start, setStart] = useState(new Date(event.start.local));
    const [end, setEnd] = useState(new Date(event.end.local));
    const [eventName, setEventName] = useState(event.name.text);
    const [eventDescription, setEventDescription] = useState(event.description.text);

    const session = useSession();
    const supabase = useSupabaseClient();
    const { isLoading } = useSessionContext();

    async function googleSignIn() {
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
        }
    }

    async function signOut() {
        await supabase.auth.signOut();
    }

    async function CreateCalendarEvent() {
        console.log("Creating Calendar Event");
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
        // Log event details
        console.log("Event details:", eventDetails);
        try {
            // Your event creation logic here...
            const response = await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
                method: "POST",
                headers: {
                    'Authorization': 'Bearer ' + session.provider_token // Access token for google
                },
                body: JSON.stringify(eventDetails)
            });
            const data = await response.json();
            console.log("Response from Google Calendar API:", data);
            alert("Event created, check your Google Calendar");
        } catch (error) {
            console.error("Error occurred while creating event:", error);
            alert("Error occurred while creating event: " + error.message);
        }
    }

    return (

        <View style={styles.Container}>
            {session ? (
                <>
                    <View style={styles.googleUser}>
                        <Text style={styles.googleUser}>Signed in as:</Text>
                        <Text style={styles.googleUser}>{session.user.email}</Text>
                    </View>

                    <View style={styles.eventDetailsConatiner}>
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
                    <hr />
                    <View style={styles.buttonContainer}>
                        <Pressable style={styles.buttons} onPress={CreateCalendarEvent}>
                            <Text style={styles.buttonText}>Create Event</Text>
                        </Pressable>
                        <Pressable style={styles.buttonSignOut} onPress={signOut}>
                            <Text style={styles.buttonText}>Sign Out</Text>
                        </Pressable>
                    </View>
                </>
            ) : (
                <Pressable style={styles.buttons} onPress={googleSignIn}>
                    <Text style={styles.buttonText}>Sign In With Google</Text>
                </Pressable>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    Container: {
        width: "100%",
        justifyContent: 'center',
        padding: 20,

    },
    googleUser: {
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        color: "#666",
    },
    eventDetailsConatiner: {
        padding: 50,
        flex: 2
    },
    dateTimePickerView: {
        flex: 1,
        padding: 16,
    },
    infoTitle: {
        fontWeight: "bold",
        fontSize: 16,
        color: "#666",
    },
    buttonContainer: {
        flexDirection: "row",
        marginTop: 20,
        justifyContent: 'space-evenly',
        adding: 16,
    },
    buttons: {
        backgroundColor: '#1E5B7B',
        padding: 10,
        top: 30,
        paddingVertical: 10,
        paddingHorizontal: -10,
        borderRadius: 5,
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
    },
    buttonSignOut: {
        backgroundColor: '#FE6464',
        padding: 10,
        top: 30,
        paddingVertical: 10,
        paddingHorizontal: -10,
        borderRadius: 5,
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
    },
    buttonText: {
        color: '#ffffff'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginTop: 5,
        marginBottom: 10,
    },
});

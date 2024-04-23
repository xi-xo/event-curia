import React, { useState } from "react";
import { useSession, useSupabaseClient, useSessionContext } from "@supabase/auth-helpers-react";
import { View, Text, StyleSheet, TextInput, Pressable, ScrollView } from "react-native";
import DateTimePicker from "react-datetime-picker";

export default function CreateCalendarEvent() {
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());
    const [eventName, setEventName] = useState("");
    const [eventDescription, setEventDescription] = useState("");


    const session = useSession(); 
    const supabase = useSupabaseClient(); 
    const { isLoading } = useSessionContext()

    if (isLoading) {
        return <></>
    }

    async function googleSignIn() {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                scopes: 'https://www.googleapis.com/auth/calendar'
            }
        })
        if (error) {
            alert("Error logging in to google provider with Supabase")
            console.log(error);
        }
    }

    async function signOut() {
        await supabase.auth.signOut();
    }

    async function CreateCalendarEvent() {
        console.log("Creating Calendar Event");
        const event = {
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
        }
        await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
            method: "POST",
            headers: {
                'Authorization': 'Bearer ' + session.provider_token 
            },
            body: JSON.stringify(event)
        }).then((data) => {
            data.json()
        }).then((data) => {
            console.log(data);
            alert("Event created, check your Google Calendar")
        })
    }

    return (
        <ScrollView style={styles.createEventContainer}>
            <View style={styles.createEventInnerContainer}>
                {session ? (
                    <>
                        <Text>Hey{session.user.email}</Text>
                        <Text>Start of your event</Text>
                        <DateTimePicker 
                            style={styles.dateTimePicker} 
                            onChange={setStart} 
                            value={start} 
                        />
                        <Text>End of your event</Text>
                        <DateTimePicker 
                            style={styles.dateTimePicker} 
                            onChange={setEnd} 
                            value={end} 
                        />
                        <Text>Event Name</Text>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={(e) => setEventName(e)}
                        />
                        <Text>Event description</Text>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={(e) => setEventDescription(e)}
                        />
                        <hr />
                        <View style={styles.buttonContainer}>
                            <Pressable onPress={CreateCalendarEvent}>
                                <Text>Create Event</Text>
                            </Pressable>
                            <Pressable onPress={signOut}>
                                <Text>Sign Out</Text>
                            </Pressable>
                        </View>
                    </>
                ) : (
                    <Pressable onPress={googleSignIn}>
                        <Text>Sign In With Google</Text>
                    </Pressable>
                )}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    createEventContainer: {
        flex: 1,
    },
    createEventInnerContainer: {
        width: "100%",
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    textInput: {
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        width: "100%", 
    },
    dateTimePicker: {
        marginBottom: 10,
        maxWidth: "100%",
        width: "100%",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },
});

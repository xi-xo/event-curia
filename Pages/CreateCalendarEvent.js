import React, { useState } from "react";
import { useSession, useSupabaseClient, useSessionContext } from "@supabase/auth-helpers-react";
import { View, Text, Button, StyleSheet, TextInput } from "react-native";
import DateTimePicker from "react-datetime-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker"
import { SafeAreaView } from "react-native-web";

export default function CreateCalendarEvent() {
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());
    const [eventName, setEventName] = useState("");
    const [eventDescription, setEventDescription] = useState("");


    const session = useSession(); //token, when session exists we have a user
    const supabase = useSupabaseClient(); // talk to superbase
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
                'dateTime': start.toISOString(), //date.toISOString
                'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
            },
            'end': {
                'dateTime': end.toISOString(), //date.toISOString
                'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
            },
        }
        await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
            method: "POST",
            headers: {
                'Authorization': 'Bearer ' + session.provider_token // Access token to google
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
        <SafeAreaView style={styles.createEventContainer}>
            <View style={styles.createEventinnerContainer}>
                {session ? (
                    <>
                        <Text>Hey{session.user.email}</Text>
                        <Text>Start of your event</Text>
                        <DateTimePicker 
                        style={styles.dateTimeStart} 
                        onChange={setStart} 
                        value={start} 
                        />
                        <Text>End of your event</Text>
                        <DateTimePicker 
                        style={styles.dateTimeEnd} 
                        onChange={setEnd} 
                        value={end} 
                        />
                        <Text>Event Name</Text>
                        <TextInput
                        style={styles.textInputName}
                        onChangeText={(e) => setEventName(e)}
                        />
                        <Text>Event description</Text>
                        <TextInput
                        style={styles.textInputDescription}
                        onChangeText={(e) => setEventDescription(e)}
                        />
                        <hr />
                        <View style={styles.buttonContainer}>
                            <Button 
                            title={"Create Event"} 
                            onPress={CreateCalendarEvent} 
                            />
                            <Button 
                            title={"Sign Out"} 
                            onPress={signOut} 
                            />
                        </View>
                    </>
                ) : (
                    <Button title={"Sign In With Google"} onPress={googleSignIn} />
                )}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    createEventContainer: {
        borderColor: "red",
        borderWidth: 2,
        flex: 1,
        },
    createEventinnerContainer: {
        borderColor: "blue",
        borderWidth: 2,
        width: "100%",
    },
    textInputName: {
        borderColor: "gray",
        borderWidth: 3
    },
    textInputDescription: {
        borderColor: "gray",
        borderWidth: 3
    },
    buttonContainer: {
        borderColor: "red",
        borderWidth: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
        width: "100%",
    },
});
import React, { useState } from "react";
import { useSession, useSupabaseClient, useSessionContext } from "@supabase/auth-helpers-react";
import { View, Text, Button, StyleSheet, TextInput } from "react-native";
import DateTimePicker from "react-datetime-picker";

export default function CreateCalendarEvent() {
    const [ start, setStart ] = useState(new Date());
    const [ end, setEnd ] = useState(new Date());
    const [ eventName, setEventName ] = useState("");
    const [ eventDescription, setEventDescription ] = useState("");


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
        if(error) {
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

    // console.log(session);
    // console.log(start)
    // console.log(eventName)
    // console.log(eventDescription)
    return (
        <View style={styles.formContainer}>
            {session ? (
                <>
                    <Text>Hey there {session.user.email}</Text>
                    <Text>Start of your event</Text>
                    <DateTimePicker onChange={setStart} value={start} />
                    <Text>End of your event</Text>
                    <DateTimePicker onChange={setEnd} value={end} />
                    <Text>Event Name</Text>
                    <TextInput 
                    onChangeText={(e) => setEventName(e)}
                    />
                    <Text>Event description</Text>
                    <TextInput 
                    onChangeText={(e) => setEventDescription(e)}
                    />
                    <hr/>
                    <View>
                    <Button title={"Create Calendar Event"} onPress={CreateCalendarEvent} />
                    <hr/>
                    <Button title={"Sign Out"} onPress={signOut} />
                    </View>
                </>
            ) : (
                <Button title={"Sign In With Google"} onPress={googleSignIn} />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    formContainer: {
        width: 400,
        margin: 30,
    }
})
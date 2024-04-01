import React from "react"
import { View, Text, Pressable} from "react-native"
import CreateCalendarEvent from "./CreateCalendarEvent"
import Api from "../components/FetchEvents"
import EventsList from "../components/EventsList"


export default function HomePage() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Pressable title="Browse Events" onPress={() => console.log("Navigate to events page")}></Pressable>
            <Text style={{ fontSize: 24, marginBottom: 20 }}>Welcome to the Home Page</Text>
            <View>
        <CreateCalendarEvent />
            </View >
            <View>
                <Api />
            </View>
            <View>
                <EventsList />
            </View>
        </View>
    )
}
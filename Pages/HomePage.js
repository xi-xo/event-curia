import React from "react"
import { View, Text, Button } from "react-native"
import CreateCalendarEvent from "./CreateCalendarEvent"
import Api from "../components/API"


export default function HomePage() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button title="Browse Events" onPress={() => console.log("Navigate to events page")} />
            <Text style={{ fontSize: 24, marginBottom: 20 }}>Welcome to the Home Page</Text>
            <View>
        <CreateCalendarEvent />
            </View >
            <View>
                <Api />
            </View>
        </View>
    )
}
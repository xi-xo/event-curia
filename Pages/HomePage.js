import React from "react"
import { View, Text, Pressable, ScrollView } from "react-native"
import CreateCalendarEvent from "./CreateCalendarEvent"
import Api from "../components/FetchEvents"
import EventsList from "../components/EventsList"


export default function HomePage() {
    return (
        <ScrollView>

            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <View>
                <Text style={{ fontSize: 24, marginBottom: 20 }}>Welcome to the Home Page</Text>
                    <CreateCalendarEvent />
                    <Api />
                </View>
                <View>
                    <EventsList />
                </View>
            </View>
        </ScrollView>
    )
}
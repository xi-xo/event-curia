import React from "react"
import { View, ScrollView } from "react-native"
import Api from "../components/FetchEvents"
import EventsList from "../components/EventsList"


export default function HomePage() {
    return (
        <ScrollView>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <View>
                    <Api />
                </View>
                <View>
                    <EventsList />
                </View>
            </View>
        </ScrollView>
    )
}
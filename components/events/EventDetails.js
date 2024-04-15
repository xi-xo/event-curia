import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import mapImage from "../../assets/3d-pin-map.jpg"

export default function EventDetails() {
    const navigation = useNavigation();
    const route = useRoute();
    const { event } = route.params;
    const { venue } = event

    const startDatePart = event.start.local.split('T')
    const startTime = startDatePart[1].substring(0, 5);
    const startDate = startDatePart[0]

    const endDatePart = event.end.local.split('T')
    const endTime = endDatePart[1].substring(0, 5);
    const endDate = endDatePart[0]

    useEffect(() => {
        if (event && event.name && event.name.text) {
            console.log("EventDetails: Setting screen title to:", event.name.text)
            navigation.setOptions({ title: event.name.text });
        }
    }, [event, navigation]);

    // Check if event and venues are present
    if (!event || !venue) {
        console.log("Event or venues not found:", event, venue);
        return (
            <View style={styles.errorContainer}>
                <Text>Error: Event or venues not found</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <EventHeader eventName={event.name.text} logoUrl={event.logo.original.url} description={event.description.text}/>
            <EventInfo capacity={event.capacity} status={event.status} startDate={startDate} startTime={startTime} endDate={endDate} endTime={endTime} />
            <EventVenue venueName={venue.name} mapImage={mapImage} />
        </View>
    );
}

const EventHeader = ({ eventName, logoUrl, description, status }) => (
    <View style={styles.header}>
        <View style={styles.titleContainer}>
            <Text style={styles.title}>{eventName}</Text>
        </View>
        <Image style={styles.logo} source={{ uri: logoUrl }} resizeMode="cover" />
        <Text style={styles.description}>{description}</Text>
    </View>
);

const EventInfo = ({ capacity, status, startDate, startTime, endDate, endTime }) => (
    <View style={styles.info}>
        <EventInfoItem title="Capacity" value={capacity} />
        <EventInfoItem title="Date" value={startDate} />
        <EventInfoItem title="Time" value={startTime} />
        <EventInfoItem title="End Date" value={endDate} />
        <EventInfoItem title="End Time" value={endTime} />
    </View>
);

const EventInfoItem = ({ title, value }) => (
    <View style={styles.infoItem}>
        <Text style={styles.infoTitle}>{title}</Text>
        <Text>{value}</Text>
    </View>
);

const EventVenue = ({ venueName, mapImage }) => (
    <View style={styles.venue}>
        <Text style={styles.title}>Venue</Text>
        <Text>{venueName}</Text>
        <Image style={styles.mapImage} source={mapImage} resizeMode='contain' />
    </View>
);

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        padding: 16,
    },
    header: {
        marginBottom: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 8,
    },
    logo: {
        width: "100%",
        height: 200,
        borderRadius: 8,
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        marginBottom: 8,
    },
    info: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    infoItem: {
        flex: 1,
        marginRight: 8,
    },
    infoTitle: {
        fontWeight: "bold",
        fontSize: 14,
        color: "#666",
    },
    venue: {
        marginTop: 10,
    },
    mapImage: {
        width: "100%",
        aspectRatio: 1,
    },
});

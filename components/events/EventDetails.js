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
            <EventHeader eventName={event.name.text} logoUrl={event.logo.original.url} description={event.description.text} />
            <EventInfo 
                capacity={event.capacity} 
                status={event.status} 
                startDate={startDate} 
                startTime={startTime} 
                endDate={endDate} 
                endTime={endTime} 
            />
            <EventVenue 
            venueName={venue.name} 
            venueAddress={venue.address.address_1}
            venueCity={venue.address.city}
            venuePostCode={venue.address.region}
            venueRegion={venue.address.postal_code}
            mapImage={mapImage} 
            />
        </View>
    );
}

const EventHeader = ({ eventName, logoUrl, description }) => (
    <View style={styles.header}>
        <Text style={styles.title}>{eventName}</Text>
        <Image style={styles.logo} source={{ uri: logoUrl }} resizeMode="cover" />
        <Text style={styles.description}>{description}</Text>
    </View>
);

const EventInfo = ({ capacity, startDate, startTime, endDate, endTime }) => (
    <View style={styles.info}>
        <View style={styles.infoItem}>
            <Text style={styles.infoTitle}>Event Start</Text>
            <Text>Date: {startDate}</Text>
            <Text>Time: {startTime}</Text>
        </View>
        <View style={styles.infoItem}>
            <Text style={styles.infoTitle}>Event End</Text>
            <Text>Date: {endDate}</Text>
            <Text>Time: {endTime}</Text>
        </View>
        <View style={styles.infoItem}>
            <Text style={styles.infoTitle}>People Capacity</Text>
            <Text>{capacity}</Text>
        </View>
    </View>
);

const EventVenue = ({ venueName, mapImage, venueAddress, venueCity, venuePostCode, venueRegion }) => (
    <View style={styles.venue}>
        <Text style={styles.venueTitle}>Venue</Text>
        <View style={styles.venueInfo}>
            <View style={styles.venueText}>
                <Text>{venueName}</Text>
                <Text>{venueAddress}</Text>
                <Text>{venueCity}</Text>
                <Text>{venuePostCode}</Text>
                <Text>{venueRegion}</Text>
            </View>
            <Image style={styles.mapImage} source={mapImage} resizeMode='cover' />
        </View>
    </View>
);

const styles = StyleSheet.create({
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
    venueTitle: {
        fontWeight: "bold",
        fontSize: 18,
        marginBottom: 8,
    },
    venueInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    venueText: {
        flex: 1,
        marginRight: 8,
    },
    mapImage: {
        width: 150,
        height: 100,
        right: 50,
        borderRadius: 30,
        marginLeft: 20, // Add some margin to the left to adjust positioning
    },
});

import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import mapImage from "../../assets/3d-pin-map.jpg"
import SignUpButton from '../SignUpButton';

export default function EventDetails({ route }) {
    const navigation = useNavigation();
    const { event, userRole } = route.params;
    const { venue } = event;

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

    if (!venue) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    const imageUrl = event.logo ? event.logo.original.url : 'url_of_your_default_image';

    return (
        <View style={styles.container}>
            <EventHeader eventName={event.name.text} imageUrl={imageUrl} description={event.description.text} />
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
            {userRole !== 'staff' && (
                <SignUpButton event={event}/>
            )}
            
        </View>
    );
}
const EventHeader = ({ eventName, imageUrl, description }) => (
    <View style={styles.header}>
        <Text style={styles.title}>{eventName}</Text>
        {imageUrl && <Image style={styles.logo} source={{ uri: imageUrl }} resizeMode="cover" />}
        <Text style={styles.title}>Description</Text>
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
                {venueName && <Text>{venueName}</Text>}
                {venueAddress && <Text>{venueAddress}</Text>}
                {venueCity && <Text>{venueCity}</Text>}
                {venuePostCode && <Text>{venuePostCode}</Text>}
                {venueRegion && <Text>{venueRegion}</Text>}
            </View>
            {mapImage && typeof mapImage === 'string' && (
                <Image style={styles.mapImage} source={{ uri: mapImage }} resizeMode='cover' />
            )}
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
        borderColor: "#E0E0E0",
        borderWidth: 1,
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
        width: "100%",
        height: 200,
        borderRadius: 8,
        marginBottom: 8,
    },
    description: {
        borderColor: "#E0E0E0",
        borderWidth: 1,
        borderRadius: 5,
        fontSize: 16,
        marginBottom: 8,
    },
    info: {
        boxShadow: '0px 2px 4px rgba(0, 0, 5, 0)',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    infoItem: {
        flex: 1,
        marginRight: 8,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#E0E0E0',
    },
    infoTitle: {
        fontWeight: "bold",
        fontSize: 14,
        color: "#666",
    },
    venue: {
        marginTop: 10,
        borderRadius: 5,
    },
    venueTitle: {
        fontWeight: "bold",
        fontSize: 18,
        marginBottom: 8,
    },
    venueInfo: {
        boxShadow: '0px 2px 4px rgba(0, 0, 5, 0)',
        borderWidth: 2,
        borderColor: '#E0E0E0',
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
        marginLeft: 20, 
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, Pressable } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import mapImage from "../../assets/3d-pin-map.jpg"
import { getCurrentUser } from '../authenticationMock/AuthService';

export default function EventDetails({route}) {
    const navigation = useNavigation();
    const { event, userRole } = route.params;
    const { venue } = event;

    console.log(userRole);

    const eventId = event.id

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

    const handleSignUp = async (eventId) => {
        try{
            console.log("pressable working", eventId);

            const currentUser = getCurrentUser();
            if (!currentUser) {
                console.log("User is not Authenticated. Redirect to sign-in page... ");
                navigation.navigate('SignIn')
                return;
            }

            console.log("User is authenticated. Proceeding with sign-up...");

            console.log("Sign-up successful!");
        } catch (error) {
            console.error("Error occured during sign-up:", error);
        }

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
        <Pressable onPress={() => handleSignUp(eventId)}>
            {userRole !== 'staff' && <Text>Sign Up</Text>}
        </Pressable>
        </View>
    );
}

const EventHeader = ({ eventName, imageUrl, description }) => (
    <View style={styles.header}>
        <Text style={styles.title}>{eventName}</Text>
        {imageUrl && <Image style={styles.logo} source={{ uri: imageUrl }} resizeMode="cover" />}
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
        marginLeft: 20, 
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

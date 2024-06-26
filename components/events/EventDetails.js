/**
 * EventDetails Component
 * 
 * This component displays detailed information about an event, including its name,
 * logo, description, start and end date/time, venue, and sign-up functionality.
 * 
 * Components Within Component Approach:
 * - This component utilizes separate functional components for EventHeader, EventInfo, and EventVenue
 *   to enhance code organization and maintainability.
 * 
 * Props:
 * - route: Object containing route parameters
 * 
 * @param {Object} route - Route object containing parameters
 * @returns {JSX.Element} - JSX element representing the EventDetails component
 */

import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import mapImage from "../../assets/mapImage.png"
import SignUpButton from '../SignUpButton';
import ConditionalImage from '../ConditionalImage';
import PopupMessage from '../PopUpMessage';

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
            navigation.setOptions({ title: event.name.text });
        }
    }, [event, navigation]);

    const handleSignUpResult = (success) => {
        if (success) {
            setShowSuccessMessage(true);
        } else {
            setShowErrorMessage(true);
        }
    };

    const [showSuccessMessage, setShowSuccessMessage] = useState(false); 
    const [showErrorMessage, setShowErrorMessage] = useState(false); 

    if (!venue) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    const imageUrl = event.logo ? event.logo.original.url : null;

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
                <SignUpButton
                    style={styles.SignUpButton}
                    event={event}
                    navigation={navigation}
                    onSignUp={handleSignUpResult}
                />
            )}

            <PopupMessage
                message="Sign-up successful! Add event to Google Calendar."
                visible={showSuccessMessage}
                onClose={() => setShowSuccessMessage(false)}
            />

            <PopupMessage
                message="Sign-up failed. Please try again later."
                visible={showErrorMessage}
                onClose={() => setShowErrorMessage(false)}
            />
        </View>
    );
}

const EventHeader = ({ eventName, imageUrl, description }) => (
    <View style={styles.header}>
        <Text style={styles.title}>{eventName}</Text>
        {imageUrl && (
            <Image
                style={styles.logo}
                source={{ uri: imageUrl }}
                resizeMode="cover" />
        )}
        {!imageUrl && (
            <ConditionalImage style={styles.conditionalImage} eventName={eventName} />
        )}
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
            <Image style={styles.mapImage} source={mapImage} resizeMode='repeat' />
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
    conditionalImage: {
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
        borderWidth: 2,
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
        margin: 30,
        flex: 1,
        marginRight: 8,
    },
    mapImage: {
        width: 150,
        height: 100,
        borderRadius: 10,
        margin: 30,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
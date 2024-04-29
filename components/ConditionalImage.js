/**
 * ConditionalImage Component
 * 
 * This component renders different images based on the event name provided.
 * It checks the event name and selects an appropriate image from assets.
 * 
 * Props:
 * - eventName: String representing the name of the event
 * - style: Styles for the image component
 * - ...props: Additional props for the Image component
 * 
 * @param {string} eventName - Name of the event
 * @param {object} style - Styles for the image component
 * @param {...any} props - Additional props for the Image component
 * @returns {JSX.Element|null} - JSX element representing the ConditionalImage component
 */

import React from 'react';
import { Image } from 'react-native';

const ConditionalImage = ({ eventName, style, ...props }) => {
    let source;

    if (typeof eventName !== 'string') {
        return null; 
    }

    switch (true) {
        case eventName.toLowerCase().includes('party'):
        case eventName.toLowerCase().includes('event'):
            source = require('../assets/images/partyEvent.jpg');
            break;
        case eventName.toLowerCase().includes('music'):
        case eventName.toLowerCase().includes('show'):
            source = require('../assets/images/musicEvent.jpg');
            break;
        default:
            source = null;
            break;
    }

    if (source) {
        return <Image source={source} style={style} {...props} />;
    } else {
        return <Image style={{ display: 'none' }} {...props} />;
    }
};

export default ConditionalImage;

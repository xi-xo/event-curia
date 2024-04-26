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

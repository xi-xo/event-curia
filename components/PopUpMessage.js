/**
 * PopupMessage Component
 * 
 * This component represents a popup message modal that displays a message to the user.
 * It allows the user to close the modal by pressing a "Close" button.
 * 
 * Props:
 * - message: The message to be displayed in the popup modal.
 * - onClose: Function to be called when the modal is closed.
 * - visible: Boolean indicating whether the modal is visible or not.
 * 
 * @param {string} message - The message to be displayed in the popup modal.
 * @param {Function} onClose - Function to be called when the modal is closed.
 * @param {boolean} visible - Boolean indicating whether the modal is visible or not.
 * @returns {JSX.Element} - JSX element representing the PopupMessage component.
 */

import React from 'react';
import { Modal, Text, Pressable, View, StyleSheet } from 'react-native';

const PopupMessage = ({ message, onClose, visible }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>{message}</Text>
                    <Pressable onPress={onClose}>
                        <Text style={styles.closeText}>Close</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    closeText: {
        color: '#1E5B7B',
        marginTop: 10,
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default PopupMessage;

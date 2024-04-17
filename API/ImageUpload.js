import React, { useState } from "react";
import { View, Pressable, Alert, Text, ActivityIndicator, Image } from "react-native";
import { REACT_APP_API_TOKEN } from '@env';
import * as ImagePicker from 'expo-image-picker';

const ImageUpload = () => {
    const [eventImage, setEventImage] = useState(null);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleImageSelected = async () => {
        try {
            console.log("Requesting media library permissions...");
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (permissionResult.granted === false) {
                throw new Error('Permission to access media library denied');
            }
            console.log("Media library permissions granted.");
    
            console.log("Launching image library...");
            const pickerResult = await ImagePicker.launchImageLibraryAsync();
            console.log("Picker result:", pickerResult);
            if (!pickerResult.cancelled && pickerResult.assets.length > 0) {
                // Access the first asset in the assets array and get its URI
                const selectedAsset = pickerResult.assets[0];
                console.log("Selected asset:", selectedAsset);
                const selectedURI = selectedAsset.uri;
                console.log("Selected URI:", selectedURI);
                setEventImage(selectedURI);
                console.log("Image selected:", selectedURI);
            } else {
                console.log("Image selection canceled");
            }
        } catch (error) {
            console.error("Error selecting image:", error);
            Alert.alert('Error selecting image', error.message);
        }
    };
    
    const handleImageUpload = async () => {
        try {
            if (!eventImage) {
                Alert.alert("Please select an image first!");
                return;
            }
    
            setUploading(true);
            console.log("Uploading image:", eventImage);

            // Check if the image needs encoding
            const isEncoded = eventImage.startsWith('data:image/jpeg;base64,');

            // If the image is not encoded, encode it
            if (!isEncoded) {
                const base64 = await encodeImageToBase64(eventImage);
                setEventImage(`data:image/jpeg;base64,${base64}`);
            }
    
            // Now you can proceed with the upload process
            // ...

        } catch (error) {
            // Display error message
            console.error("Error uploading image:", error);
            Alert.alert(`Error uploading image: ${error.message}`);
        } finally {
            // Reset uploading state
            setUploading(false);
        }
    };

    // Function to encode an image file to base64
    const encodeImageToBase64 = async (imageURI) => {
        const response = await fetch(imageURI);
        const blob = await response.blob();
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                resolve(reader.result.replace(/^data:.+;base64,/, ''));
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    };

    return (
        <View>
            <Pressable
                onPress={handleImageSelected}
                style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
            >
                <View>
                    {/* Your image selection UI */}
                    <Text>Select Image</Text>
                </View>
            </Pressable>
            <Pressable
                onPress={handleImageUpload}
                style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
            >
                <View>
                    {/* Your upload image UI */}
                    <Text>Upload Image</Text>
                </View>
            </Pressable>
            {uploading && <ActivityIndicator size="large" color="#0000ff" />}
            {uploadedImage && <Image source={{ uri: uploadedImage }} style={{ width: 200, height: 200 }} />}
        </View>
    );
};

export default ImageUpload;

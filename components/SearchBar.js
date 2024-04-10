import React, { useState } from "react";
import { TextInput, View, Text, Pressable } from 'react-native'
import { StyleSheet } from "react-native";

export default function SearchBar() {
    const [searchQuery, setSearchQuery] = useState('')

    const OnSearch = (query) => {
        console.log("Searching for:", query);
    }

    const HandleSearch = () => {
        OnSearch(searchQuery)
    };

    return (
        <View style={styles.container}>
            <Pressable onPress={HandleSearch}>
                <Text>Search</Text>
            </Pressable>
            <TextInput
                style={styles.input}
                onChangeText={text => setSearchQuery(text)}
                value={searchQuery}
                placeholder="Search For Events"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderWidth: 3,
        borderColor: 'white',
    },
    input: {
        height: 40,
        flex: 1,
        borderColor: 'gray',
        borderWidth: 2,
        paddingHorizontal: 10,
        marginRight: 20
    },
});
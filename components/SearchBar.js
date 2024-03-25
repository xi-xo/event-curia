import React, { useState } from "react";
import { TextInput, View, Button} from 'react-native'
import { StyleSheet } from "react-native";

export default function SearchBar() {
    const [searchQuery, setSearchQuery] = useState('')

    const handleSearch = () => {
        onSearch(searchQuery)
    };

    return (
        <View style={styles.container}>
        <Button title="Search" onPress={handleSearch}/>
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
        height:40,
        flex: 1,
        width: '10%',
        borderColor: 'gray',
        borderWidth: 2,
        paddingHorizontal:10,
        marginRight: 2,
    },
});
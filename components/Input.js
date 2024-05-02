import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'

export default function Input({ label, textInputConfig, style, invalid }) {

    const inputStyles = [styles.textInput];
    if (textInputConfig && textInputConfig.multiline) {
        inputStyles.push(styles.inputTextMultiline);
    }
    if (invalid) {
        inputStyles.push(styles.invalidInput);
    }

    return (
        <View style={[styles.container, style]}>

            <Text style={[styles.label, invalid && styles.invalidLable]}>{label}</Text>
            <TextInput style={inputStyles} {...textInputConfig} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 4,
        marginVertical: 10,
    },
    label: {
        fontSize: 15,
        color: "blue",
        marginBottom: 4,
    },
    textInput: {
        backgroundColor: "pink",
        padding: 6,
        borderRadius: 10,
        fontSize: 18,
    },
    inputTextMultiline: {
        minHeight: 100,
        textAlignVertical: "top",
    },
    invalidLable: {
        color: "red",
    },
    invalidInput: {
        backgroundColor: "red",
    }


})
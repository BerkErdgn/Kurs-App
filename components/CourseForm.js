import { Pressable, StyleSheet, Text, View, Alert } from 'react-native'
import React, { useState } from 'react'
import Input from './Input'
import { getFormatedDate } from '../helper/data';

export default function CourseForm({ cancleHandler, onSubmit, buttonLable, defoultValues }) {

    const [inputs, setInputs] = useState({
        amount: {
            value: defoultValues ? defoultValues.amount.toString() : "",
            isValid: true
        },

        date: {
            value: defoultValues ? getFormatedDate(defoultValues.date) : "",
            isValid: true
        },
        description: {
            value: defoultValues ? defoultValues.description : "",
            isValid: true
        },
    });


    function addOrUpdateHandler(params) {
        const courseData = {
            amount: Number(inputs.amount.value),
            date: new Date(inputs.date.value),
            description: inputs.description.value,
        };
        const amountIsValid = courseData.amount > 0;
        const dateIsValid = courseData.date.toString() !== "Invalid Date";
        const descriptionIsValid = courseData.description.trim().length > 0;

        if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
            setInputs((currentInput) => {
                return {
                    amount: { value: Number(currentInput.amount.value), isValid: amountIsValid },
                    date: { value: currentInput.date.value, isValid: dateIsValid },
                    description: { value: currentInput.description.value, isValid: descriptionIsValid }
                }
            })
            return;
        }

        onSubmit(courseData);
    }


    function inputChange(inputIdendifier, enteredValue) {
        setInputs((currentInput) => {
            return {
                ...currentInput,
                [inputIdendifier]: { value: enteredValue, isValid: true }
            }
        })
    }

    return (
        <View style={styles.form}>
            <Text style={styles.title}>Kurs Bilgileri</Text>
            <View style={styles.priceAndDaye} >
                <Input style={styles.flexAll} label="Tutar" textInputConfig={{
                    keyboardType: "decimal-pad",
                    onChangeText: inputChange.bind(this, "amount"),
                    value: inputs.amount.value.toString()
                }}
                    invalid={!inputs.amount.isValid}
                />
                <Input style={styles.flexAll} label="Tarih" textInputConfig={{
                    placeHolder: "YYYY-MM-DD",
                    maxLength: 10,
                    onChangeText: inputChange.bind(this, "date"),
                    value: inputs.date.value
                }}
                    invalid={!inputs.date.isValid}
                />
            </View>

            <Input label="Başlık" textInputConfig={{
                multiline: true,
                onChangeText: inputChange.bind(this, "description"),
                value: inputs.description.value
            }}
                invalid={!inputs.description.isValid}
            />

            <View style={styles.error}>
                {!inputs.amount.isValid && (
                    <Text>
                        Lütfen tutarı doğru formatta giriniz.
                    </Text>
                )}
                {!inputs.date.isValid && (
                    <Text>
                        Lütfen tarihi doğru formatta giriniz.
                    </Text>
                )}
                {!inputs.description.isValid && (
                    <Text>
                        Lütfen başlığı doğru formatta giriniz.
                    </Text>
                )}
            </View>



            <View style={styles.buttons}>
                <Pressable onPress={cancleHandler}>
                    <View style={styles.cancel}>
                        <Text style={styles.cancelText}>
                            İptal et
                        </Text>
                    </View>
                </Pressable>
                <Pressable onPress={addOrUpdateHandler}>
                    <View style={styles.addOrDelete}>
                        <Text style={styles.addOrDeleteText}>
                            {buttonLable}
                        </Text>
                    </View>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    priceAndDaye: {

        flexDirection: "row",
    },
    flexAll: {
        flex: 1
    },
    form: {
        marginTop: 40,
    },
    title: {
        fontSize: 25,
        fontWeight: "bold",
        textAlign: "center",
        color: "blue",
        marginVertical: 20,
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "center",
    },
    cancel: {
        backgroundColor: "red",
        minWidth: 120,
        marginRight: 10,
        padding: 8,
        alignItems: "center",
    },
    cancelText: {
        color: "white",
    },
    addOrDelete: {
        backgroundColor: "blue",
        minWidth: 120,
        marginRight: 10,
        padding: 8,
        alignItems: "center",
    },
    addOrDeleteText: {
        color: "white",
    },
    error: {
        alignItems: "center",
        marginBottom: 10,
    }
})
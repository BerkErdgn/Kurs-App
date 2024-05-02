import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CourseItem from './CourseItem'


function renderCourseItem(itemData) {
    // console.log(itemData)
    //! {...itemData.item} itemData'nın içinedeki item nesnesini olduğu gibi geç demek.
    return (
        <CourseItem {...itemData.item} />
    )
}

export default function CoursesList({ courses }) {
    return (
        <FlatList
            data={courses}
            keyExtractor={(item) => item.id}
            renderItem={renderCourseItem}
        />
    )
}

const styles = StyleSheet.create({})
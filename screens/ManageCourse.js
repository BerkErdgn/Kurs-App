import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useLayoutEffect, useState } from 'react'
import { EvilIcons } from '@expo/vector-icons';
import { CoursesContext } from '../store/CoursesContext'
import CourseForm from '../components/CourseForm';
import { storeCourse, updateCourse, deleteCourseHttp } from '../helper/https';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorText from '../components/ErrorText';


export default function ManageCourse({ route, navigation }) {

    const coursesContext = useContext(CoursesContext);
    const courseId = route.params?.courseId;
    let isEditing = false;

    const [error, setError] = useState(null);

    const [isSubmiting, setIsSubmiting] = useState(false);

    const selectedCourse = coursesContext.courses.find((course) => course.id == courseId);

    if (courseId) {
        isEditing = true;
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? "Kursu Güncelle" : "Kurs Ekle"

        })
    }, [isEditing, navigation])

    async function deleteCourse() {
        setError(null);
        setIsSubmiting(true);
        try {
            coursesContext.deleteCourse(courseId);
            await deleteCourseHttp(courseId);
            navigation.goBack();
        } catch (error) {
            setError("Kursları silemedik!");
            setIsSubmiting(false);
        }


    }

    function cancleHandler() {
        navigation.goBack();
    }
    async function addOrUpdateHandler(courseData) {
        setError(null);
        setIsSubmiting(true);
        try {
            if (isEditing) {
                coursesContext.updateCourse(courseId, courseData);
                await updateCourse(courseId, courseData);
            } else {
                const id = await storeCourse(courseData);
                coursesContext.addCourse({ ...courseData, id: id });
            }
            navigation.goBack();
        } catch (error) {
            setError("Kurs eklenemedi veya güncellenemedi!");
            setIsSubmiting(false);
        }

    }

    if (error && !isSubmiting) {
        return <ErrorText message={error}></ErrorText>
    }

    if (isSubmiting) {
        return (
            <LoadingSpinner />
        );
    }

    return (
        <View style={styles.container}>

            <CourseForm onSubmit={addOrUpdateHandler} cancleHandler={cancleHandler} buttonLable={isEditing ? "Güncelle" : "Ekle"} defoultValues={selectedCourse} />

            {isEditing &&
                <View style={styles.deleteContainer}>
                    <EvilIcons name="trash" size={36} color="black" onPress={deleteCourse} />
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 25,

    },
    deleteContainer: {
        alignItems: "center",
        borderTopWidth: 2,
        borderTopColor: "blue",
        paddingTop: 10,
        marginTop: 16,
    },

})
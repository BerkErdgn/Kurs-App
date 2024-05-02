import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Courses from '../components/Courses'
import { getLastWeek } from '../helper/data';
import { getCourse, getCourses } from '../helper/https';
import { CoursesContext } from '../store/CoursesContext';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorText from '../components/ErrorText';

export default function RecontCourses() {
    const coursesContext = useContext(CoursesContext);
    const [fetchedCourses, setFetchedCourses] = useState([]);
    const [error, setError] = useState(null);

    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        async function takeCourses(params) {
            setError(null);
            setIsFetching(true);
            try {
                const courses = await getCourses();
                // setFetchedCourses(courses);
                coursesContext.setCourse(courses);
            } catch (error) {
                setError("Kursları Çekemedik");
            }

            setIsFetching(false);
        }

        takeCourses();
    }, []);


    if (error && !isFetching) {
        return <ErrorText message={error}></ErrorText>
    }

    if (isFetching) {
        return (
            <LoadingSpinner />
        );
    }
    const recentCourses = coursesContext.courses.filter((course) => {
        const today = new Date();
        const dateLastWeek = getLastWeek(today, 7);
        return course.date >= dateLastWeek && course.date <= today;
    });
    return (
        <Courses courses={recentCourses} coursesPeriod="Son bir hafta" nullText="Yakın zamanda herhangi bir kursa kayıtlı değilsiniz" />
    )
}

const styles = StyleSheet.create({})
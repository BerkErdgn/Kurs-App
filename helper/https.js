import axios from "axios";

const BASE_URL = "https://deneme-5416a-default-rtdb.firebaseio.com"

export async function storeCourse(courseData) {
    const response = await axios.post(`${BASE_URL}/courses.json`, courseData);
    const id = response.data.name;
    return id;
}

export async function getCourses() {
    const response = await axios.get(`${BASE_URL}/courses.json`);

    const courses = [];

    for (const key in response.data) {
        const coursObj = {
            id: key,
            amount: response.data[key].amount,
            date: new Date(response.data[key].date),
            description: response.data[key].description
        };
        courses.push(coursObj);
    }

    return courses;
}

export function updateCourse(id, courseData) {
    return axios.put(`${BASE_URL}/courses/${id}.json`, courseData);
}

export function deleteCourseHttp(id) {
    return axios.delete(`${BASE_URL}/courses/${id}.json`);
}
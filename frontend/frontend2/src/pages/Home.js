import {useEffect, useState} from 'react'

import TutorDetails from '../components/TutorDetails'
import Panel from '../components/Panel'

const Home = () => {
    const [tutors, setTutors] = useState(null)
    const [filteredTutors, setFilteredTutors] = useState(null)
    const [error, setError] = useState(null);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchTutors = async () => {
            const response = await fetch('/api/tutors')
            const json = await response.json()

            if (response.ok) {
                setTutors(json)
                const allCourses = json.flatMap(tutor => tutor.courses);
                const uniqueCourses = [...new Set(allCourses)];
                setCourses(uniqueCourses);
            }
        }
        
        fetchTutors()
    }, [])


    const handleFilter = async (selectedCourse, specifiedRate) => {
        const query = {
            ...(selectedCourse && { courses: { $in: [selectedCourse] } }),
            ...(specifiedRate && { rate: specifiedRate  })
        };

        const queryString = new URLSearchParams(query).toString();

        console.log("Here: " + queryString)

        const response = await fetch(`/api/tutors?${queryString}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
            return;
        }

        setError(null);
        setFilteredTutors(json);
    };

    const tutorsToDisplay = filteredTutors !== null ? filteredTutors : tutors;

    return (
        <div className="home">
            <div className="tutors">
                {tutorsToDisplay && tutorsToDisplay.map((tutor) => (
                    <TutorDetails key={tutor._id} tutor={tutor} />
                ))}
                {filteredTutors !== null && filteredTutors.length === 0 && (
                    <p>No tutors found</p>
                )}
            </div>
            <Panel onFilter={handleFilter} courses={courses} /> 
            {error && <div className="error">{error}</div>}
        </div>
    )
}

export default Home
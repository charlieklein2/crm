import { useEffect, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'

import TutorDetails from '../components/TutorDetails'
import Panel from '../components/Panel'


const Home = () => {
    const [tutors, setTutors] = useState(null)
    const [filteredTutors, setFilteredTutors] = useState(null)
    const [error, setError] = useState(null);
    const [courses, setCourses] = useState([]);

    const { user } = useAuthContext()

    useEffect(() => {
        const fetchTutors = async () => {
            const response = await fetch(`https://calbridge.onrender.com/api/tutors`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok) {
                setTutors(json)
                const allCourses = json.flatMap(tutor => tutor.courses);
                const uniqueCourses = [...new Set(allCourses)].sort();
                setCourses(uniqueCourses);
            } 
        }

        if (user) {
            fetchTutors()
        }
    }, [user])


    const handleFilter = async (selectedCourse, specifiedRate) => {
        specifiedRate = specifiedRate + 1

        const query = {
            ...(selectedCourse && { courses: selectedCourse}),
            ...(specifiedRate && { rate: specifiedRate  })
        };

        const queryString = new URLSearchParams(query).toString();

        console.log("Here: " + queryString)

        const response = await fetch(`https://calbridge.onrender.com/api/tutors?${queryString}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
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
                    <h5>No tutors found. Try searching for a higher maximum hourly rate.</h5>
                )}
            </div>
            <Panel onFilter={handleFilter} courses={courses} /> 
        
            {error && <div className="error">{error}</div>}
        </div>
    )
}

export default Home
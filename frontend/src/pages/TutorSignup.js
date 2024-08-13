import { useState } from 'react'
import { useSignup } from '../hooks/useSignup'

const TutorSignup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [name, setName] = useState('')
    const [rate, setRate] = useState('')
    // const [courses, setCourses] = useState([])
    const [courseOne, setCourseOne] = useState('')
    const [courseTwo, setCourseTwo] = useState('')
    const [courseThree, setCourseThree] = useState('')
    const [bio, setBio] = useState('')

    const { signup, error } = useSignup()

    const options = [
        {key: "CS 10", value: "CS 10"}, 
        {key: "CS 61A", value: "CS 61A"}, 
        {key: "CS 61B", value: "CS 61B"}, 
        {key: "CS 61C", value: "CS 61C"}, 
        {key: "CS 70", value: "CS 70"},
        {key: "CS 88", value: "CS 88"},
        {key: "CS 161", value: "CS 161"},
        {key: "CS 162", value: "CS 162"},
        {key: "CS 164", value: "CS 164"},
        {key: "CS 170", value: "CS 170"},
        {key: "CS 186", value: "CS 186"},
        {key: "CS 188", value: "CS 188"},
        {key: "CS 189", value: "CS 189"}
    ]

    const handleSubmit = async (e) => {
        e.preventDefault()

        const confirmed = window.confirm('Verify that all the information you have provided is correct. You will not be easily able to make changes later.')
        
        if (confirmed) {
            await signup(email, password)
    
            if (!error) {
                
                const courses = []

                if (courseOne) { courses.push(courseOne) }
                if (courseTwo) { courses.push(courseTwo) }
                if (courseThree) { courses.push(courseThree) }
                
                const requestBody = {
                    "name": name,
                    "email": email,
                    "courses": courses, 
                    "rate": rate, 
                    "bio": bio
                }
                
                try {
                    const response = await fetch('/api/tutors', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(requestBody)
                    })

                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`)
                    }

                } catch (error) {
                    console.error('Error:', error)
                }

            }
        }
    }

    return (
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Tutor Signup</h3>

            <p><strong>First, create your CalBridge account.</strong></p>
            <label>Email: </label>
            <input 
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
            />

            <label>Password:</label>
            <input 
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
            />
            <div id="linebreak"></div>
            <p><strong>Next, create your tutor profile. </strong></p>
            <label>First and last name:</label>
            <input 
                type="text"
                onChange={(e) => setName(e.target.value)}
                required
            />

            <label>Hourly rate:</label>
            <input 
                type="number"
                onChange={(e) => setRate(e.target.value)}
            />

            <label>Supported courses (select up to three):</label>
            <select 
                onChange={(e) => setCourseOne(e.target.value)}
                required
            >
                <option value=""></option> 
                {options.map(course => (
                    <option key={course.key} value={course.value}> {course.value} </option>
                ))} 
            </select>
            <select 
                onChange={(e) => setCourseTwo(e.target.value)}
            >
                <option value=""></option> 
                {options.map(course => (
                    <option key={course.key} value={course.value}> {course.value} </option>
                ))} 
            </select>
            <select
                onChange={(e) => setCourseThree(e.target.value)}
            >
                <option value=""></option> 
                {options.map(course => (
                    <option key={course.key} value={course.value}> {course.value} </option>
                ))} 
            </select>

            
            
            
            <label>Bio:</label>
            <textarea 
                id="bio"
                onChange={(e) => setBio(e.target.value)}
                placeholder="In a few sentences, introduce yourself and describe your qualifications as a tutor."
            ></textarea>

            <button>Sign up</button>

            {error && <div className="error">{error}</div>}
        </form>
    ) 
}

export default TutorSignup

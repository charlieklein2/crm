import { useState} from 'react'

const Panel = ({ onFilter, courses }) => {
    const [selectedCourse, setSelectedCourse] = useState('');
    const [selectedRate, setSelectedRate] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const rate = parseFloat(selectedRate);
            await onFilter(selectedCourse, rate);
        } catch (err) {
            setError(err.message);
        }

    }
    const handleCourseChange = (e) => {
        setSelectedCourse(e.target.value);
    }

    const handleRateChange = (e) => {
        setSelectedRate(e.target.value);
    }
    
    return (
        <form className="filter" onSubmit={handleSubmit}> 
            <h3>Filter Tutors</h3>

            <label>Course:</label>
            <select
                value={selectedCourse}
                onChange={handleCourseChange}
            >
                <option value=""></option>
                {courses.map(course => (
                    <option key={course} value={course}>{course}</option>
                ))}
            </select>

            <label>Maximum hourly rate:</label>
            <input
                type="number"
                value={selectedRate}
                onChange={handleRateChange}
            >
            </input>

            <button>Search</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default Panel;
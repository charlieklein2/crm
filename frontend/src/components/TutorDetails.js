const TutorDetails = ({ tutor }) => {
    return (
        <div className="tutor-details">
            <h4>{tutor.name}</h4>
            <p><strong>Email: </strong>{tutor.email}&emsp;|&emsp;<strong>Hourly Rate: </strong>${tutor.rate}&emsp;|&emsp;<strong>Courses: </strong>{tutor.courses.join(', ')}</p>
            <div className="break"></div>
            <p><strong>Bio: </strong>{tutor.bio}</p>
        </div>
    )
}

export default TutorDetails
import { useState } from 'react'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { useAuthContext } from '../hooks/useAuthContext'

import emailjs from '@emailjs/browser'

const TutorDetails = ({ tutor }) => {
    const { user } = useAuthContext()

    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const [message, setMessage] = useState('')

    const sendEmail = () => {
        if (!message) {
            window.alert("Please compose a message.")
        } else {
            emailjs.send("service_hao0c6c","template_4jfnpec", {
                message: message,
                receiver: tutor.email,
                sender: user.email,
            }, process.env.REACT_APP_EMAILJS_PRIVATE_KEY)
            
            window.alert("Email sent!")
            handleClose()
        }
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: '#fafafa',
        p: 4,
    }
    
    return (
        <div className="tutor-details">
            <h4>{tutor.name}</h4>
            <p><strong>Email: </strong>{tutor.email}&emsp;|&emsp;<strong>Hourly Rate: </strong>${tutor.rate}&emsp;|&emsp;<strong>Courses: </strong>{tutor.courses.join(', ')}</p>
            <div className="break"></div>
            <p><strong>Bio: </strong>{tutor.bio}</p>

            <Button onClick={handleOpen} style={{fontSize: "10px"}}>Contact via email</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                <p style={{fontSize: "24px"}}>Compose Message</p>
                <p style={{fontSize: "16px"}}>From: {user.email}</p>
                <p style={{fontSize: "16px"}}>To: {tutor.email}</p>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <textarea 
                    id="bio"
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="In a few sentences, introduce yourself and explain what you are looking for in a tutor."
                    required
                ></textarea>
                <button id="send" onClick={sendEmail}>Send</button>
            </Typography>
            </Box>
            </Modal>
        </div>
    )
}

export default TutorDetails
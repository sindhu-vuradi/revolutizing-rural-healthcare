const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const app = express();
const port = 3000;

// Twilio Credentials (Replace with your own Twilio SID and Auth Token)
const accountSid = 'your_twilio_account_sid';
const authToken = 'your_twilio_auth_token';
const twilioClient = twilio(accountSid, authToken);
const twilioPhoneNumber = 'your_twilio_phone_number';

app.use(cors());
app.use(bodyParser.json());

// API to send OTP
app.post('/send-otp', (req, res) => {
    const { mobile } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP
    
    // Send OTP via Twilio SMS
    twilioClient.messages
        .create({
            body: `Your OTP is: ${otp}`,
            from: twilioPhoneNumber,
            to: `+91${mobile}` // Assuming Indian numbers
        })
        .then(message => res.json({ success: true, otp: otp, messageSid: message.sid }))
        .catch(error => res.status(500).json({ success: false, error: error.message }));
});

// API to verify OTP (For simplicity, we are not storing OTPs)
app.post('/verify-otp', (req, res) => {
    const { otp, enteredOtp } = req.body;
    if (otp === enteredOtp) {
        res.json({ success: true, message: 'OTP Verified Successfully' });
    } else {
        res.status(400).json({ success: false, message: 'Invalid OTP' });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

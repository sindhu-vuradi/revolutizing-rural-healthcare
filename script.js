function sendOTP() {
    let mobile = document.getElementById('mobile').value;
    if (mobile.length === 10) {
        alert('OTP sent to ' + mobile); // Replace this with actual OTP sending logic
        document.getElementById('otpSection').style.display = 'block';
    } else {
        alert('Enter a valid 10-digit mobile number');
    }
}

function verifyOTP() {
    let otp = document.getElementById('otp').value;
    if (otp.length === 6) {
        alert('OTP Verified! Login Successful'); // Replace this with actual OTP verification logic
    } else {
        alert('Enter a valid 6-digit OTP');
    }
}
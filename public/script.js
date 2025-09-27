async function sendEmail() {
    // Generate a random 6-digit code for 2FA
    let verificationCode = Math.floor(100000 + Math.random() * 900000);
    
    // Reusable message format with the dynamic code
    let messageText = `Your verification code is: ${verificationCode}. Please enter this code to complete your login. Do not share this code with anyone.`;

    const response = await fetch("http://localhost:3001/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            to: "",
            subject: "Your 2FA Verification Code",
            message: messageText // Sending the formatted message
        }),
    });
    const result = await response.json();
    alert(result.success || result.error);
}

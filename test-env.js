// Test environment variables
import dotenv from 'dotenv';
dotenv.config();

console.log('=== Environment Variables Test ===');
console.log('UIC_BASE_URL:', process.env.UIC_BASE_URL);
console.log('UIC_USERNAME:', process.env.UIC_USERNAME);
console.log('UIC_PASSWORD:', process.env.UIC_PASSWORD ? '***' : 'NOT SET');
console.log('UIC_SRVSRCE:', process.env.UIC_SRVSRCE);
console.log('PORT:', process.env.PORT);
console.log('===================================');

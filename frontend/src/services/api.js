import axios from 'axios';

const api = axios.create({
    baseURL: 'https://your-backend-url.com/api',
});

export const getServices = async () => {
    try {
        const response = await api.get('/services');
        return response.data;
    } catch (error) {
        console.error('Failed to fetch services:', error);
    }
};

export const sendSignupDataToAdmin = async (signupData) => {
    try {
      const response = await axios.post('https://your-api-url.com/admin/signup', signupData);
      return response.data;
    } catch (error) {
      return { success: false, message: 'Signup failed. Try again later.' };
    }
  };
  
  export const sendBookingDataToAdmin = async (bookingData) => {
    // Send booking details to admin
    try {
      const response = await axios.post('https://your-api-url.com/admin/bookings', bookingData);
      return response.data;
    } catch (error) {
      return { success: false, message: 'Booking failed. Try again later.' };
    }
  };

  export const sendPaymentDataToAdmin = async (paymentData) => {
    try {
      const response = await axios.post('https://your-api-url.com/admin/payments', paymentData);
      return response.data;
    } catch (error) {
      return { success: false, message: 'Payment failed. Try again later.' };
    }
  };


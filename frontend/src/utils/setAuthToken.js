import axios from 'axios';

// Helper function to take in token. 
// If token is there, it will add to Header if not then it will delete from Header
const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common['x-auth-token'] = token;
    } else {
        delete axios.defaults.headers.common['x-auth-token'];
        localStorage.removeItem('token');
    }
}

export default setAuthToken;
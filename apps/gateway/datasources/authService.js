const axios = require('axios');
const { GraphQLError } = require('graphql');

function handleAxiosError(err) {
  const message = err.response?.data?.message || err.response?.data?.error || err.message || 'Service error';
  const code = err.response?.status || 500;
  throw new GraphQLError(message, { extensions: { code } });
}

class AuthService {
  constructor(token) {
    const port = process.env.AUTH_PORT || 4100;
    this.client = axios.create({
      baseURL: process.env.AUTH_URL || `http://localhost:${port}`,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  }

  async register(name, email, password, role) {
    try {
      const res = await this.client.post('/api/auth/register', { name, email, password, role });
      return res.data;
    } catch (err) { handleAxiosError(err); }
  }

  async login(email, password) {
    try {
      const res = await this.client.post('/api/auth/login', { email, password });
      return res.data;
    } catch (err) { handleAxiosError(err); }
  }

  async getMe() {
    try {
      const res = await this.client.get('/api/auth/me');
      return res.data;
    } catch (err) { handleAxiosError(err); }
  }
}

module.exports = AuthService;


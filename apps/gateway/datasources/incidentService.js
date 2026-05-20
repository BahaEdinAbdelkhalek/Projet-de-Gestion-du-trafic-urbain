const axios = require('axios');
const { GraphQLError } = require('graphql');

function handleAxiosError(err) {
  const message = err.response?.data?.message || err.response?.data?.error || err.message || 'Service error';
  const code = err.response?.status || 500;
  throw new GraphQLError(message, { extensions: { code } });
}

class IncidentService {
  constructor(token) {
    const port = process.env.INCIDENTS_PORT || 4500;
    this.client = axios.create({
      baseURL: process.env.INCIDENTS_URL || `http://localhost:${port}`,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  }

  async getIncidents(zoneId, status) {
    try {
      const res = await this.client.get('/api/incidents', { params: { zoneId, status } });
      return res.data;
    } catch (err) { handleAxiosError(err); }
  }

  async getIncident(id) {
    try {
      const res = await this.client.get(`/api/incidents/${id}`);
      return res.data;
    } catch (err) { handleAxiosError(err); }
  }

  async createIncident(type, description, location, zoneId) {
    try {
      const res = await this.client.post('/api/incidents', { type, description, location, zoneId });
      return res.data;
    } catch (err) { handleAxiosError(err); }
  }

  async updateIncidentStatus(id, status) {
    try {
      const res = await this.client.patch(`/api/incidents/${id}/status`, { status });
      return res.data;
    } catch (err) { handleAxiosError(err); }
  }
}

module.exports = IncidentService;

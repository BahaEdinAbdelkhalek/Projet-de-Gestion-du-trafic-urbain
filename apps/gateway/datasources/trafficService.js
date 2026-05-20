const axios = require('axios');
const { GraphQLError } = require('graphql');

function handleAxiosError(err) {
  const message = err.response?.data?.message || err.response?.data?.error || err.message || 'Service error';
  const code = err.response?.status || 500;
  throw new GraphQLError(message, { extensions: { code } });
}

class TrafficService {
  constructor(token) {
    const port = process.env.TRAFFIC_PORT || 4300;
    this.client = axios.create({
      baseURL: process.env.TRAFFIC_URL || `http://localhost:${port}`,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  }

  async getTrafficZones() {
    try {
      const res = await this.client.get('/api/traffic/zones');
      return res.data;
    } catch (err) { handleAxiosError(err); }
  }

  async getTrafficZone(id) {
    try {
      const res = await this.client.get(`/api/traffic/zones/${id}`);
      return res.data;
    } catch (err) { handleAxiosError(err); }
  }

  async createTrafficZone(name, description, coordinates) {
    try {
      const res = await this.client.post('/api/traffic/zones', { name, description, coordinates });
      return res.data;
    } catch (err) { handleAxiosError(err); }
  }

  async getTrafficMeasurements(zoneId) {
    try {
      const res = await this.client.get(`/api/traffic/zones/${zoneId}/measurements`);
      return res.data;
    } catch (err) { handleAxiosError(err); }
  }

  async addTrafficMeasurement(zoneId, vehicleCount, speedAverage, density) {
    try {
      const res = await this.client.post(`/api/traffic/zones/${zoneId}/measurements`, { vehicleCount, speedAverage, density });
      return res.data;
    } catch (err) { handleAxiosError(err); }
  }
}

module.exports = TrafficService;

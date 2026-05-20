const axios = require('axios');
const { GraphQLError } = require('graphql');

function handleAxiosError(err) {
  const message = err.response?.data?.message || err.response?.data?.error || err.message || 'Service error';
  const code = err.response?.status || 500;
  throw new GraphQLError(message, { extensions: { code } });
}

class VehicleService {
  constructor(token) {
    const port = process.env.VEHICLES_PORT || 4200;
    this.client = axios.create({
      baseURL: process.env.VEHICLES_URL || `http://localhost:${port}`,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  }

  async getVehicles() {
    try {
      const res = await this.client.get('/api/vehicles');
      return res.data;
    } catch (err) { handleAxiosError(err); }
  }

  async getVehicle(id) {
    try {
      const res = await this.client.get(`/api/vehicles/${id}`);
      return res.data;
    } catch (err) { handleAxiosError(err); }
  }

  async createVehicle(plateNumber, type, model, status) {
    try {
      const res = await this.client.post('/api/vehicles', { plateNumber, type, model, status });
      return res.data;
    } catch (err) { handleAxiosError(err); }
  }

  async getVehiclePositions(vehicleId) {
    try {
      const res = await this.client.get(`/api/vehicles/${vehicleId}/positions`);
      return res.data;
    } catch (err) { handleAxiosError(err); }
  }

  async addVehiclePosition(vehicleId, latitude, longitude, speed) {
    try {
      const res = await this.client.post(`/api/vehicles/${vehicleId}/positions`, { latitude, longitude, speed });
      return res.data;
    } catch (err) { handleAxiosError(err); }
  }
}

module.exports = VehicleService;

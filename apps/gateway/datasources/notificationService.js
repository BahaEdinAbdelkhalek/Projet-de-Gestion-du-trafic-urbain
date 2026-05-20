const axios = require('axios');
const { GraphQLError } = require('graphql');

function handleAxiosError(err) {
  const message = err.response?.data?.message || err.response?.data?.error || err.message || 'Service error';
  const code = err.response?.status || 500;
  throw new GraphQLError(message, { extensions: { code } });
}

class NotificationService {
  constructor(token) {
    const port = process.env.NOTIFICATIONS_PORT || 4400;
    this.client = axios.create({
      baseURL: process.env.NOTIFICATIONS_URL || `http://localhost:${port}`,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  }

  async getNotifications(recipientId) {
    try {
      const res = await this.client.get('/api/notifications', { params: { recipientId } });
      return res.data;
    } catch (err) { handleAxiosError(err); }
  }

  async sendNotification(recipientId, title, message) {
    try {
      const res = await this.client.post('/api/notifications', { recipientId, title, message });
      return res.data;
    } catch (err) { handleAxiosError(err); }
  }

  async markNotificationRead(id) {
    try {
      const res = await this.client.patch(`/api/notifications/${id}/read`);
      return res.data;
    } catch (err) { handleAxiosError(err); }
  }
}

module.exports = NotificationService;

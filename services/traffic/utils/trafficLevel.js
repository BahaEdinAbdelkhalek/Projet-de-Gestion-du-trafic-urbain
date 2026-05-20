const getTrafficLevel = (density) => {
  if (density <= 30) {
    return 'LOW';
  }
  if (density <= 70) {
    return 'MEDIUM';
  }
  return 'HIGH';
};

module.exports = getTrafficLevel;

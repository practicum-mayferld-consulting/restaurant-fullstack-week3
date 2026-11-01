// api/health.js → GET /api/health
module.exports = function handler(req, res) {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() })
}

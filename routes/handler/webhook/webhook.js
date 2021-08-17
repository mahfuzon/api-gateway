const axios = require('axios');
require('dotenv').config();
const url = process.env.URL_SERVICE_ORDER_PAYMENT;

module.exports = async (req, res) => {
    try {
        const response = await axios.post(`${url}/api/webhook`, req.body);
        return res.json(response.data);
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({
                status: 'error',
                message: 'service unavailable'
            });
        }
        const {
            status,
            data
        } = error.response;
        return res.status(status).json(data);
    }
}
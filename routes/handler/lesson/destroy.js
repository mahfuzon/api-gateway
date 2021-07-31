const axios = require('axios');
require('dotenv').config();

module.exports = async (req, res) => {
    try {
        const url = process.env.URL_SERVICE_COURSE;
        const lessons_id = req.params.id;
        const response = await axios.delete(`${url}/api/lessons/${lessons_id}`);
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
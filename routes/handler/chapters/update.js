require('dotenv').config();
const axios = require('axios');

module.exports = async (req, res) => {
    try {
        const url = process.env.URL_SERVICE_COURSE;
        const data = req.body;
        const chapter_id = req.params.id;
        const response = await axios.put(`${url}/api/chapters/${chapter_id}`, data);
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
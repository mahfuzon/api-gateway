const axios = require('axios');
require('dotenv').config();
module.exports = async (req, res) => {
    try {
        const url = process.env.URL_SERVICE_COURSE;
        const id = req.params.id;
        const response = await axios.put(`${url}/api/reviews/${id}`, {
            rate: req.body.rate,
            note: req.body.note
        });
        return res.json(response.data);
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({
                status: "error",
                message: "service unavailable"
            });
        }

        const {
            status,
            data
        } = error.response;

        return res.status(status).json(data);
    }
}
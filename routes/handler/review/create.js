const axios = require('axios');
require('dotenv').config();
module.exports = async (req, res) => {
    try {
        const url = process.env.URL_SERVICE_COURSE;
        const user_id = req.user.data.id;
        const response = await axios.post(`${url}/api/reviews`, {
            user_id: user_id,
            course_id: req.body.course_id,
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
const axios = require("axios");
require('dotenv').config();

module.exports = async (req, res) => {
    try {
        const url = process.env.URL_SERVICE_COURSE;
        const userId = req.user.data.id;
        const courseId = req.body.course_id;
        const response = await axios.post(`${url}/api/my-courses`, {
            course_id: courseId,
            user_id: userId
        });
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
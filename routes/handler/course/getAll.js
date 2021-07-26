require('dotenv').config();
const axios = require('axios');

module.exports = async (req, res) => {
    try {
        const url = process.env.URL_SERVICE_COURSE;
        const HOSTNAME = process.env.HOSTNAME;
        const response = await axios.get(`${url}/api/courses/`, {
            params: {
                name: req.query.name,
                status: 'published'
            }
        });

        const courseData = response.data;
        const firstPage = courseData.data.first_page_url.split('?').pop();
        const lastPage = courseData.data.last_page_url.split('?').pop();

        courseData.data.first_page_url = `${HOSTNAME}/courses?/${firstPage}`;
        courseData.data.last_page_url = `${HOSTNAME}/courses?/${lastPage}`;

        if (courseData.data.next_page_url) {
            const nextPage = courseData.data.next_page_url.split('?').pop();
            courseData.data.next_page_url = `${HOSTNAME}/courses?${nextPage}`;
        }

        if (courseData.data.prev_page_url) {
            const prevPage = courseData.data.prev_page_url.split('?').pop();
            courseData.data.prev_page_url = `${HOSTNAME}/courses?${prevPage}`;
        }

        courseData.data.path = `${HOSTNAME}/courses`;

        return res.json(courseData);
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
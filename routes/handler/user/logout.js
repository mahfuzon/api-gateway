const axios = require('axios');

const {
    URL_SERVICE_USER
} = process.env;

module.exports = async (req, res) => {
    try {
        const id = req.user.data.id;
        const response = await axios.post(`${URL_SERVICE_USER}/users/logout`, {
            user_id: id
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
const axios = require('axios');
const jwt = require('jsonwebtoken');
const {
    URL_SERVICE_USER,
    JWT_SECRET,
    JWT_SECRET_REFRESH_TOKEN,
    JWT_ACCESS_TOKEN_EXPIRED,
    JWT_REFRESH_TOKEN_EXPIRED
} = process.env;

module.exports = async (req, res) => {
    try {
        const response = await axios.post(`${URL_SERVICE_USER}/users/login`, req.body);

        const token = jwt.sign({
            data: response.data.data
        }, JWT_SECRET, {
            expiresIn: JWT_ACCESS_TOKEN_EXPIRED
        });

        const refresh_token = jwt.sign({
            data: response.data.data
        }, JWT_SECRET_REFRESH_TOKEN, {
            expiresIn: JWT_REFRESH_TOKEN_EXPIRED
        });

        await axios.post(`${URL_SERVICE_USER}/refresh-tokens/`, {
            user_id: response.data.data.id,
            token: refresh_token
        });

        return res.json({
            token: token,
            refresh_token: refresh_token
        });
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
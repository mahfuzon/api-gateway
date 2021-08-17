const axios = require('axios');
const jwt = require('jsonwebtoken');

const {
    URL_SERVICE_USER,
    JWT_SECRET,
    JWT_SECRET_REFRESH_TOKEN,
    JWT_ACCESS_TOKEN_EXPIRED,
} = process.env;

module.exports = async (req, res) => {
    try {
        const token = req.body.token;
        const user_id = req.body.user_id;

        if (!token || !user_id) {
            return res.status(400).json({
                status: "error",
                message: "invalid token"
            });
        }

        await axios.get(`${URL_SERVICE_USER}/refresh-tokens`, {
            params: {
                refresh_token: token
            }
        });

        jwt.verify(token, JWT_SECRET_REFRESH_TOKEN, function (err, decoded) {
            if (err) {
                return res.status(403).json({
                    status: "error",
                    message: err.message
                });
            }

            if (user_id !== decoded.data.id) {
                return res.status(400).json({
                    status: "error",
                    message: "user not valid"
                });
            }

            const newToken = jwt.sign({
                data: jwt.decode.data
            }, JWT_SECRET, {
                expiresIn: JWT_ACCESS_TOKEN_EXPIRED
            });

            return res.json({
                status: "success",
                data: newToken
            });
        });
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
require('dotenv').config ();

const config = {
    host: process.env.HOST,
    port: process.env.PORT,
    baseURL: `http://${process.env.HOST}:${process.env.PORT}`
};

module.exports = config;
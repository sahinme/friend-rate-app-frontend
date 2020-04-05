import axios from 'axios';

const qs = require('qs');

const http = axios.create({
    baseURL: "https://friendrate.radinyazilim.com/",
    timeout: 30000,
    paramsSerializer: function (params) {
        return qs.stringify(params, {
            encode: false,
        });
    },
});

export default http;
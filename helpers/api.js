import axios from 'axios';

import getAccessToken from './access-token';

const createAPI = baseURL => {
    const authToken = getAccessToken();

    const headersObj = {
        'X-Requested-With': 'XMLHttpRequest'
    };

    if (authToken) {
        headersObj['Authorization'] = `Bearer ${authToken}`;
    }

    headersObj['Content-Type'] = 'application/vnd.api+json';
    headersObj['Accept'] = 'application/vnd.api+json';

    const instance = axios.create({
        baseURL,
        headers: {
            common: headersObj
        }
    });

    instance.interceptors.request.use(config => {
        config.headers['Content-Type'] = 'application/vnd.api+json';
        return config;
    });

    instance.interceptors.response.use(
        function(response) {
            return response ? response.data : response;
        },
        function(error) {
            return Promise.reject(error);
        }
    );

    // instance.interceptors.request.use(request => {
    //     console.log('Starting Request', request);
    //     return request;
    // });

    // instance.interceptors.response.use(response => {
    //     console.log('Response:', response);
    //     return response;
    // });

    return instance;
};

export const talentUrl =
    '/talent?include=workExperienceYears,educationalDegree,user.homeCountry,user.residenceCountry,user.residenceCity.country,user.residenceArea.city,user.status';

export default createAPI;

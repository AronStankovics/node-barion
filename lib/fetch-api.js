const fetch = require('node-fetch').default;
const { URL, URLSearchParams } = require('url');
const { BarionError } = require('./errors');

/**
 * Handles errors during fetch.
 * @param {Error} err The error that should have been handled.
 */
function handleError (err) {
    throw err;
}

/**
 * Checks if response from Barion indicates error.
 * @param {Object} res Response data from Barion API.
 */
function isErrorResponse (res) {
    return (
        !res.Errors && !res.ErrorList ||           // response does not contain error indicator field
        res.Errors && res.Errors.length > 0 ||     // there are errors in Errors array
        res.ErrorList && res.ErrorList.length > 0  // there are errors in ErrorList array (used in barion transfer)
    );
}

/**
 * Sends request to Barion API with the given data.
 * @param {String} url - URL of the endpoint to send request to.
 * @param {Object} options - Settings of the request (see: documentation of Fetch API).
 * @returns {Promise} Promise with the response. 
 */
function fetchBarion (url, options) {
    let success;

    return fetch(url, options)
        .then(res => {
            success = res.ok;
            return res.json();
        })
        .catch(handleError) //response is not a valid JSON or network error occured
        .then(data => {
            if (!success || isErrorResponse(data)) {
                throw new BarionError('Barion request errored out', data.Errors || data.ErrorList);
            }
            
            return data;
        });
}

/**
 * Gets information from Barion API.
 * @param {String} url - URL of the endpoint to send request to.
 * @param {Object} params - Search params of the endpoint. 
 * @returns {Promise} Promise with the response.
 */
function getFromBarion (url, params) {
    url = new URL(url);
    url.search = new URLSearchParams(params).toString();
    return fetchBarion(url);
}

/**
 * Posts information to Barion API.
 * @param {String} url - URL of the endpoint to send request to.
 * @param {Object} body - Body of the request.
 * @returns {Promise} Promise with the response.
 */
function postToBarion (url, body) {
    url = new URL(url);

    return fetchBarion(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
}

module.exports = {
    getFromBarion,
    postToBarion
};
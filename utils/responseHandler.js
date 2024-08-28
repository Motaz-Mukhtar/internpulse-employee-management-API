/**
 * 
 * @param {Object} error - error object
 * @param {Number} error.statusCode - error status code
 * @param {String} error.message - error message
 * @param {Response} res - response module
 * @return {Response} - return error message with http status code
 */
export const handleError = (responseData, res) => {
    const {
        status,
        message,
    } = responseData;

    return res.status(status).json({
        status,
        success: false,
        message,
    });
}

/**
 * 
 * @param {Object} sucess - sucess object
 * @param {Number} sucess.statusCode - sucess status code
 * @param {String} sucess.message - sucess message
 * @param {Response} res - response module
 * @return {Response} - return sucess message with http status code
 */
export const handleSuccess = (responseData, res) => {
    const {
        status,
        message,
        data
    } = responseData;

    return res.status(status).json({
        status,
        success: true,
        message,
        data: data || nul
    });
}
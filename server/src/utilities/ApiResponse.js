class ApiResponse {
    constructor(statusCode, data, message, error = null) {
        this.status = statusCode;
        this.data = data;
        this.message = message;
        this.error = error;
    }
}

export { ApiResponse };


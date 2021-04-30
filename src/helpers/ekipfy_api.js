exports.sendRequest = async ({ controller, method, body }) => {
    try {
        const url = `${process.env.REACT_APP_API_URL}${controller[0] === '/' ? controller : `/${controller}`}`,
            options = {
                timeout: Number(process.env.REACT_APP_TIMEOUT),
                method: method,
                body: JSON.stringify(body),
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                    'Content-Type': 'application/json'
                }
            };

        let response = await fetch(url, options);

        const statusCode = response.status;

        response = await response.json();

        if (![200, 201].includes(statusCode)) {
            throw new Error(`Server responded with : ${statusCode}, Message : ${response.message}`)
        }

        return response.content;

    } catch (error) {
        throw new Error(error.message);
    }
}
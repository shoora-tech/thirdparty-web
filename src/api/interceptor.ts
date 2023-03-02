export function requestInterceptor(request: any) {
    // console.log(request);
    const { tokenNotRequired = false } = request || {}
    // if (!tokenNotRequired) {
    // const tokenKey = "2a857efc-a6c0-478b-8043-175157202802";
    request.headers["Authorization"] = `Basic YWNlckBhY2VyLmNvbToxQFJlbWVtYmVy`;
    // }
    // request.headers["username"] = "admin@admin.com";
    // request.headers["password"] = "admin";
    return request
}

export function responseInterceptor(error: any) {
    return error.isAxiosError ? Promise.reject(error) : error;
}

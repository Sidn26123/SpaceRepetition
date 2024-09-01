import axios from "axios";

let refresh = false;

axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        console.log("Error: ", error.response.status);
        if (error.response.status === 401 && !refresh) {
            refresh = true;
            try {
                console.log("Refresh token: ", localStorage.getItem("refreshToken"));

                const refreshToken = localStorage.getItem("refreshToken");
                const response = await axios.post(
                    "http://localhost:8000/api/auth/refresh",
                    { refresh: refreshToken },
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                        // withCredentials: true,
                    }
                );

                if (response.status === 200) {
                    axios.defaults.headers.common[
                        "Authorization"
                    ] = `Bearer ${response.data.access}`;
                    localStorage.setItem("access_token", response.data.access);
                    localStorage.setItem("refresh_token", response.data.refresh);

                    return axios(error.config); // Thử lại yêu cầu ban đầu với token mới
                }
            } catch (err) {
                console.error("Failed to refresh token", err);
            }
        }
        else if (error.response.status === 400){
            // localStorage.clear();
            // axios.defaults.headers.common["Authorization"] = null;
            // window.location.href = "/login";

        }
        refresh = false;
        return Promise.reject(error); // Trả về lỗi nếu không thể refresh token
    }
);

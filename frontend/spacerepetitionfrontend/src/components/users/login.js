import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { loginAction } from "../../redux/actions/userActions";
import { toggleLoginFormAction, toggleRegisterFormAction, turnOffLoginFormAction } from "../../redux/actions/uiActions";
import { STUDY_API_URL } from "../../constants/apis";
import { useLocation } from "react-router-dom";
import { API_URL,AUTH_API_URL} from "../../constants/apis";
const LoginComponent = (props) => {
    const loginUrl = AUTH_API_URL + "/login";
    const fetchUrl = API_URL +  "/user/info";
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const location = useLocation(); // Lấy thông tin đường dẫn hiện tại
    const { from } = location.state || { from: { pathname: "/" } }; // Lấy thông tin đường dẫn trước đó
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(loginUrl, { username, password });

            if (response.status === 200) {
                // Đăng nhập thành công
                // Xử lý dữ liệu token nếu cần
                const token = {
                    access: response.data.access,
                    refresh: response.data.refresh,
                };

                // Lưu token trong localStorage
                localStorage.setItem("accessToken", token.access);
                localStorage.setItem("refreshToken", token.refresh);

                // Set header, send request to get user info
                axios.defaults.headers.common["Authorization"] = `Bearer ${token.access}`;

                try {
                    const responseUser = await axios.get(fetchUrl);
                    const user = {
                        username: username,
                        email: responseUser.data.user.email,
                        permissions: ["user"],
                        id: responseUser.data.user.id,
                        avatar: responseUser.data.user.avatar,
                    };

                    const payload = {
                        user: user,
                        isAuthenticated: true,
                        access: token.access,
                        refresh: token.refresh,
                    };
                    console.log(payload);
                    //store user to local storage
                    localStorage.setItem("user", JSON.stringify(user));
                    props.loginAction(payload);
                    props.turnOffLoginFormAction();
                    // go to url
                    // window.location.href = "/can-hoc";
                    navigate('/can-hoc');
                    // fetchLearningSets();
                    // onToggleShow(0);
                } catch (error) {
                    console.error("Error fetching user info:", error);
                    setError("Có lỗi xảy ra khi lấy thông tin người dùng");
                }
            } else {
                setError("Đăng nhập thất bại");
            }
        } catch (error) {
            // Xử lý lỗi đăng nhập
            console.error("Login error:", error);
            setError("Tài khoản hoặc mật khẩu không đúng");
        }
    };
    const fetchLearningSets = async () => {
        try {
            const res = await axios.get(STUDY_API_URL + "/study", {
                headers: { Authorization: `Bearer ${props.accessToken}` },
            });


    
        } catch (error) {
            console.log(error);
        }
    };

    
    return (
        <div>
            {true && (
                <section class="h-60 z-100">
                    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                        <div class="w-full secondary-bg rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <div className="flex flex-row justify-between items-center">
                                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                        Đăng nhập
                                    </h1>
                                    {/* <FontAwesomeIcon
                                        icon={faXmark}
                                        onClick={() => props.toggleLoginFormAction()}
                                        className="cursor-pointer"
                                    /> */}
                                </div>

                                <form class="space-y-4 md:space-y-6 box-content" action="#">
                                    {error && <p class="text-red-500">{error}</p>}
                                    <div>
                                        <label
                                            for="email"
                                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Tài khoản
                                        </label>
                                        <input
                                            name="email"
                                            id="email"
                                            class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Tên tài khoản hoặc email"
                                            required=""
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label
                                            for="password"
                                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Mật khẩu
                                        </label>
                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            placeholder="••••••••"
                                            class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            onChange={(e) => setPassword(e.target.value)}
                                            required=""
                                        />
                                    </div>
                                    <div class="flex items-center justify-between">
                                        <div class="flex items-start">
                                            <div class="flex items-center h-5">
                                                <input
                                                    id="remember"
                                                    aria-describedby="remember"
                                                    type="checkbox"
                                                    class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                                    required=""
                                                />
                                            </div>
                                            <div class="ml-3 text-sm">
                                                <label
                                                    for="remember"
                                                    class="text-color dark:text-gray-300"
                                                >
                                                    Ghi nhớ tôi
                                                </label>
                                            </div>
                                        </div>
                                        <a
                                            href="#a"
                                            class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                                        >
                                            Quên mật khẩu?
                                        </a>
                                    </div>
                                    <button
                                        type="submit"
                                        onClick={(e) => handleSubmit(e)}
                                        class="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                    >
                                        Đăng nhập
                                    </button>
                                    <div className="flex justify-end">
                                        <p class="text-sm font-light text-color dark:text-gray-400" onClick={() => props.showRegisterFormAction()}>
                                            Chưa có tài khoản?{" "}
                                            <a
                                                href="#a"
                                                
                                                class="font-medium text-blue-600 hover:underline dark:text-primary-500"
                                            >
                                                Đăng ký
                                            </a>
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        isAuth: state.user.isAuthenticated,
        user: state.user.user,
        accessToken: state.user.accessToken,
        showLoginForm: state.ui.showLoginForm,
        learning: state.learning,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loginAction: (data) => dispatch(loginAction(data)),
        toggleLoginFormAction: () => dispatch(toggleLoginFormAction()),
        turnOffLoginFormAction: () => dispatch(turnOffLoginFormAction()),
        showRegisterFormAction: () => dispatch(toggleRegisterFormAction()),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);

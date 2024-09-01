import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { closeRegisterFormAction } from "../../redux/actions/uiActions";
const User = (props) => {
    return (
        <div>
            <h1>User</h1>
            {props.isAuth && <span>{props.user.username}</span>}

        </div>
    );
};
const mapStateToProps = (state) => {
    return {
        user: state.user.user,
        isAuth: state.user.isAuthenticated,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(User);

export const RegisterComponent = () => {
    const dispatch = useDispatch();

    function closeForm() {
        console.log("A")
        dispatch(closeRegisterFormAction());
    }
    return (
        <div>
            <section class="h-60">
                <div class="flex flex-col items-center justify-center px-3 py-4 mx-auto md:h-screen lg:py-0">
                    <div class="w-full secondary-bg rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0  dark:border-gray-700">
                        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <div className="flex flex-row justify-between items-center">
                                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                    Đăng ký tài khoản
                                </h1>
                                <FontAwesomeIcon
                                    icon={faXmark}
                                    onClick={() => closeForm()}
                                    className="cursor-pointer"
                                />
                            </div>
                            <form class="space-y-4 md:space-y-6" action="#">
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
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Tên tài khoản hoặc email"
                                        required=""
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
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required=""
                                    />
                                </div>
                                <div>
                                    <label
                                        for="confirm-password"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Nhập lại mật khẩu
                                    </label>
                                    <input
                                        type="confirm-password"
                                        name="confirm-password"
                                        id="confirm-password"
                                        placeholder="••••••••"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required=""
                                    />
                                </div>
                                <div class="flex items-start">
                                    <div class="flex items-center h-5">
                                        <input
                                            id="terms"
                                            aria-describedby="terms"
                                            type="checkbox"
                                            class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                            required=""
                                        />
                                    </div>
                                    <div class="ml-3 text-sm">
                                        <label
                                            for="terms"
                                            class="font-light text-gray-400 dark:text-gray-300"
                                        >
                                            Tôi đồng ý{" "}
                                            <a
                                                class="font-medium text-blue-700 hover:underline dark:text-primary-500"
                                                href="#a"
                                            >
                                                Điều khoản sử dụng
                                            </a>
                                        </label>
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    class="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                >
                                    Tạo tài khoản
                                </button>
                                <div className="flex justify-between">
                                    <span></span>
                                    <p class="text-sm font-light text-gray-400 dark:text-gray-400">
                                        Đã có tài khoản?{" "}
                                        <a
                                            href="#a"
                                            // onClick={() => onToggleShow(1)}
                                            class="font-medium text-blue-600 hover:underline dark:text-primary-500"
                                        >
                                            Đăng nhập
                                        </a>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

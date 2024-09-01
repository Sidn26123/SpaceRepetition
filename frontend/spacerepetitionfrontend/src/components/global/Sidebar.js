import React from "react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChartLine,
    faChalkboard,
    faPenToSquare,
    faGear,
    faTrashCan,
    faUser,
    faRightFromBracket,
    faArrowRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { fetchUser } from "../../redux/actions/authActions";
import { RegisterComponent } from "../users/index";
import LoginComponent from "../users/login";
import {
    toggleLoginFormAction,
    toggleRegisterFormAction,
    showLoginFormAction,
    showRegisterFormAction,
    closeLoginFormAction,
    closeRegisterFormAction,
} from "../../redux/actions/uiActions";
import { Logout } from "../users/logout";
// import msvg from "../../assets/logo.svg";
// Import your page component
import axios from "axios";
const Sidebar = (props) => {
    const navigate = useNavigate();

    async function handleLogout() {
        try {
            const { data } = await axios.post(
                "http://localhost:8000/api/auth/logout",
                {
                    refresh_token: localStorage.getItem("refresh_token"),
                },
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );

            // Xóa toàn bộ thông tin lưu trữ trong localStorage
            localStorage.clear();

            // Loại bỏ Authorization header
            axios.defaults.headers.common["Authorization"] = null;

            // Chuyển hướng người dùng về trang đăng nhập
            navigate("/login");
            console.log("Logout successful");
        } catch (e) {
            console.log("logout not working", e);
        }
    }

    return (
        <div className="flex flex-row flex-wrap w-32">
            <div className="logo w-32 h-14">
                {/* <img src = {msvg} alt = ""/> */}
                <span className="text-5xl">SpRe</span>
            </div>
            <div className="flex w-32 h-full flex-col sidebar">
                <Link to="/">
                    <div className="sidebar-item">
                        <span className="w-6">
                            <FontAwesomeIcon icon={faChartLine} />
                        </span>
                        <span>Dashboard</span>
                    </div>
                </Link>

                <Link to="/noi-dung">
                    <div className="sidebar-item">
                        <span className="w-6">
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </span>
                        <span>Nội dung</span>
                    </div>
                </Link>

                <Link to="/can-hoc">
                    <div className="sidebar-item">
                        <span className="w-6">
                            <FontAwesomeIcon icon={faChalkboard} />
                        </span>
                        <span>Cần học</span>
                    </div>
                </Link>

                <Link to="/cau-hinh">
                    <div className="sidebar-item">
                        <span className="w-6">
                            <FontAwesomeIcon icon={faGear} />
                        </span>
                        <span>Cấu hình</span>
                    </div>
                </Link>

                <Link to="/thung-rac">
                    <div className="sidebar-item">
                        <span className="w-6">
                            <FontAwesomeIcon icon={faTrashCan} />
                        </span>
                        <span>Thùng rác</span>
                    </div>
                </Link>

                <div className="sidebar-item-last-child">
                    {!props.isAuth ? (
                        <Link to="/login">
                            <div className="sidebar-item" onClick={() => props.toggleLoginFrom()}>
                                <span className="w-6">
                                    <FontAwesomeIcon icon={faArrowRightToBracket} />
                                </span>
                                <span>Đăng nhập</span>
                            </div>
                        </Link>
                    ) : (
                        <div>
                            <Link to="/tai-khoan">
                                <div className="sidebar-item">
                                    <span className="w-6">
                                        <FontAwesomeIcon icon={faUser} />
                                    </span>
                                    <span>Tài khoản</span>
                                </div>
                            </Link>
                            <div className="sidebar-item" onClick={() => handleLogout()}>
                                <span className="w-6">
                                    <FontAwesomeIcon icon={faRightFromBracket} />
                                </span>
                                <span>Đăng xuất</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {props.showLoginForm && (
                <div class="abs-div center mr-10">
                    <LoginComponent />
                </div>
            )}
            {props.showRegisterForm && (
                <div class="abs-div center mr-10">
                    <RegisterComponent onToggleShow={props.toggleRegisterFormAction} />
                </div>
            )}
        </div>
    );
};

const mapStateToProps = (state, props) => {
    return {
        user: state.user.user,
        isAuth: state.user.isAuthenticated,
        error: state.user.error,
        accessToken: state.user.accessToken,
        showLoginForm: state.ui.showLoginForm,
        showRegisterForm: state.ui.showRegisterForm,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUser: () => dispatch(fetchUser()),
        toggleLoginFrom: () => dispatch(toggleLoginFormAction()),
        toggleRegisterForm: () => dispatch(toggleRegisterFormAction()),
        showLoginFormAction: () => dispatch(showLoginFormAction()),
        showRegisterFormAction: () => dispatch(showRegisterFormAction()),
        closeLoginFormAction: () => dispatch(closeLoginFormAction()),
        closeRegisterFormAction: () => dispatch(closeRegisterFormAction()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);

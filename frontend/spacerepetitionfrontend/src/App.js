import React from "react";
import "./App.css";
import "./styles/utils/utils.css";
import "./index.scss";
import "../src/styles/main.scss";
import "../src/styles/main.css";
import Sidebar from "./components/global/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Settings from "./components/settings";
import Dashboard from "./components/dashboard";
import Learning from "./components/learning";
import Reviewing from "./components/reviewing";
import Trash from "./components/trash";
import User from "./components/users";
import Login from "./components/users/login";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { navigate } from "react-router-dom";
import { connect } from "react-redux";
import { useDispatch } from 'react-redux';
import { loginAction } from './redux/actions/userActions'; // Action để cập nhật Redux stor
function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        // Kiểm tra xem access token có trong localStorage hay không
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            // Nếu có token, coi như người dùng đã đăng nhập
            // Dispatch thông tin người dùng vào Redux store
            const user = JSON.parse(localStorage.getItem('user')); // Giả sử bạn lưu user vào localStorage
            var payload = {
                user: user,
                access: accessToken,
                refresh: localStorage.getItem('refreshToken'),
                isAuthenticated: true
            }
            dispatch(loginAction(payload));
        } else {
            // Nếu không có token, điều hướng người dùng tới trang đăng nhập
        }
    }, []);
    if (localStorage.getItem("theme") === "dark") {
        document.querySelector("body").setAttribute("data-theme", "dark");

    }
    else if (localStorage.getItem("theme") === "light") {
        document.querySelector("body").setAttribute("data-theme", "light");
    }
    else {
        localStorage.setItem("theme", "dark");
        document.querySelector("body").setAttribute("data-theme", "dark");
    }
    const location = useLocation(); // Lấy thông tin đường dẫn hiện tại

    const isLoginPage = location.pathname === "/login"; // Kiểm tra xem có phải trang đăng nhập không
    return (
        // <Router>
            <div className="app w-screen">
                <main className="content flex w-screen z-2">
                    {isLoginPage ? <></> :
                        <div>
                            <Sidebar />
                        </div>
                    }
                    <div className="flex-1 mt-6 ml-4">
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/can-hoc" element={<Reviewing />} />
                            <Route path="/noi-dung" element={<Learning />} />
                            <Route path="/cau-hinh" element={<Settings />} />
                            <Route path="/thung-rac" element={<Trash />} />
                            <Route path="/tai-khoan" element={<User />} />
                            <Route path="/login" element={<Login />} />
                        </Routes>
                    </div>
                </main>
                <div id = "overlay-div" className="absolute w-screen h-full z-1"></div>
            </div>
        // </Router>
    );
}

export default function WrappedApp() {
    return (
        <Router>
            <App />
        </Router>
    );
}
import React from "react";
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
} from "@fortawesome/free-solid-svg-icons";
// import msvg from "../../assets/logo.svg";
// Import your page component
const Sidebar = () => {

    return (
        <div className="flex flex-row flex-wrap w-32">
            <div className="logo w-32 h-14">
                {/* <img src = {msvg} alt = ""/> */}
                <span className = "text-5xl">SpRe</span>
            </div>
            <div className="flex w-32 h-full flex-col sidebar">
                <div className="sidebar-item">
                    <span className="w-6">
                        <FontAwesomeIcon icon={faChartLine} />
                    </span>
                    <span>
                        <Link to="/">Dashboard</Link>
                    </span>
                </div>
                <div className="sidebar-item">
                    <span className="w-6">
                        <FontAwesomeIcon icon={faChalkboard} />
                    </span>
                    <span>
                        <Link to="/can-hoc">Cần học</Link>
                    </span>
                </div>
                <div className="sidebar-item">
                    <span className="w-6">
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </span>
                    <span>
                        <Link to="/noi-dung">Nội dung</Link>
                    </span>
                </div>
                <div className="sidebar-item">
                    <span className="w-6">
                        <FontAwesomeIcon icon={faGear} />
                    </span>
                    <span>
                        <Link to="/cau-hinh">Cấu hình</Link>
                    </span>
                </div>
                <div className="sidebar-item">
                    <span className="w-6">
                        <FontAwesomeIcon icon={faTrashCan} />
                    </span>
                    <span>
                        <Link to="/thung-rac">Thùng rác</Link>
                    </span>
                </div>
                <div className = "sidebar-item-last-child">
                    <div className="sidebar-item">
                        <span className="w-6">
                            <FontAwesomeIcon icon={faUser} />
                        </span>
                        <span>
                            <Link to="/tai-khoan">Tài khoản</Link>
                        </span>
                    </div>
                    <div className="sidebar-item">
                        <span className="w-6">
                            <FontAwesomeIcon icon={faRightFromBracket} />
                        </span>
                        <span>
                            <Link to="/dang-xuat">Đăng xuất</Link>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Sidebar;

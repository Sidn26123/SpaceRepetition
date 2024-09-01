import React, { useEffect, useState } from "react";
import "./App.css";
import "./index.scss";
import "../src/styles/main.scss";
import "../src/styles/main.css";
import Sidebar from "./components/global/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Settings from "./components/settings";
import Dashboard from "./components/dashboard";
import Learning from "./components/learning";
import Content from "./components/content";
import Trash from "./components/trash";
import User from "./components/users";

function App() {
    if (localStorage.getItem("theme") === "dark") {
        document.querySelector("html").classList.add("dark");
    }
    document.querySelector('body').setAttribute('data-theme', 'dark');
    // document.querySelector("html").classList.toggle("dark");
    // document.querySelector("#root").classList.add("bg-slate-200 dark:bg-slate-600");

        return (
            <Router>
                <div className="app w-screen">
                    <main className="content flex w-screen">
                        <div>
                            <Sidebar />

                        </div>
                        <div className="flex-1 p-4">
                            <Routes>
                                <Route path="/" element={<Dashboard />} />
                                <Route path="/can-hoc" element={<Learning />} />
                                <Route path="/noi-dung" element={<Content />} />
                                <Route path="/cau-hinh" element={<Settings />} />
                                <Route path="/thung-rac" element={<Trash />} />
                                <Route path="/tai-khoan" element={<User />} />
                            </Routes>
                        </div>
                    </main>
                </div>
            </Router>
        );
}

export default App;

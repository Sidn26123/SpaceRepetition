import React from "react";
import ApexCharts from "apexcharts";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { connect } from "react-redux";
import { DropdownType1 } from "../common/common";
import axios from "axios";
import { INTERVAL_API_URL, STUDY_API_URL } from "../../constants/apis";

const timeChooserData = [
    { "id": 1, "value": 3, "name": "3 ngày" },
    { "id": 2, "value": 7, "name": "7 ngày" },
    { "id": 3, "value": 30, "name": "30 ngày" },
];
const Dashboard = (props) => {
    const [dataTotalLearnedChart, setDataTotalLearnedChart] = useState([]);
    const [catagoriesTotalLearnedChart, setCatagoriesTotalLearnedChart] = useState([]);
    useEffect(() => {
        document.addEventListener("DOMContentLoaded", function () {
            renderCompletedProcessChart();
            renderTotalLearnedChart();
        });

        return () => {
            document.removeEventListener("DOMContentLoaded", function () {
                renderCompletedProcessChart();
                renderTotalLearnedChart();
            });
        };
    }, []);
    function handleToggleDropdown() {
        const dropdown = document.getElementById("dropdown");
        dropdown.classList.toggle("hidden");
    }
    const [selected, setSelected] = useState(timeChooserData[0].id);
    function onSelectedChange(selected) {
        setSelected(selected.id);
    }
    async function renderTotalLearnedChart() {
        var date_start = "01/08/2024";
        var date_end = "19/08/2024";
        var d = {
            "date_start": date_start,
            "date_end": date_end,
            "quantity": 5,
        };
        try {
            // Gọi API và chờ response
            const response = await axios.get(STUDY_API_URL + "/learned-data-chart", {
                params: d,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            });
    
            // Xử lý dữ liệu sau khi nhận được response
            const data = [];
            const categories = [];
    
            response.data.forEach((item) => {
                data.push(item.counts);
                categories.push(item.group);
            });
    
            // Cấu hình biểu đồ
            const options = {
                chart: {
                    type: "line",
                },
                series: [
                    {
                        name: "Sales",
                        data: data,
                    },
                ],
                xaxis: {
                    categories: categories,
                },
                markers: {
                    colors: ["#FFFFFF", "#FFFFFF", "#FFFFFF"],
                },
                stroke: {
                    width: 2,
                },
            };
    
            // Khởi tạo và render biểu đồ
            const chart = new ApexCharts(document.querySelector("#total-learned-chart"), options);
            chart.render();
    
        } catch (error) {
            // Xử lý lỗi khi gọi API
            console.error("Error fetching data for chart: ", error);
        }
    }
    

    function renderCompletedProcessChart() {
        var options = {
            chart: {
                type: "line",
            },
            series: [
                {
                    name: "sales",
                    data: [1, 3, 7, 16, 35],
                },
            ],
            xaxis: {
                categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
            },
            markers: {
                colors: ["#FFFFFF", "#FFFFFF", "#FFFFFF"],
            },

            stroke: {
                width: 2,
            },
        };

        var chart = new ApexCharts(document.querySelector("#completed-process-chart"), options);

        chart.render();
    }

    function getNeedReviewItem() {
        let count = 0;
        props.reviewsData.forEach((item) => {
            if (!item.is_learned) {
                count++;
            }
        });
        return count;
    }

    function getAddNewStudyItem() {
        return props.learningsData.length;
    }

    function getLearnedItem() {
        let count = 0;
        props.reviewsData.forEach((item) => {
            if (item.is_learned) {
                count++;
            }
        });
        return count;
    }
    return (
        <div>
            {/* Today overview */}
            <div className="">
                <div className=" mb-3">
                    <span className="text-3xl font-bold">Hôm nay</span>
                </div>
                <div className="flex flex-wrap px-4 md:px-10">
                    {/* Các mục hôm trước thêm cần ôn tập lại vào ngày này */}
                    <div className="flex flex-col card h-28 w-40 mb-4 mr-1 md:mr-6 md:mb-2">
                        <div className="flex">
                            <span className="text-xl font-semibold px-4 py-2">Cần học</span>
                        </div>
                        <div className="flex justify-end p-2 mt-3">
                            <span>{getNeedReviewItem()} mục</span>
                        </div>
                    </div>
                    {/* <div className = "flex flex-row flex-wrap sm:flex-col"> */}
                    {/* Các mục hôm nay đã học */}
                    <div className="flex flex-col card h-28 w-40 mb-4 mr-1 md:mr-6 md:mb-2 min-w-[100px]">
                        <div className="flex">
                            <span className="text-xl font-semibold px-4 py-2">Đã học</span>
                        </div>
                        <div className="flex justify-end p-2 mt-3">
                            <span>{getLearnedItem()} mục</span>
                        </div>
                    </div>
                    {/* Tổng số mục đã thêm */}
                    <div className="flex flex-col card h-28 w-40 mb-4 mr-1 md:mr-6 md:mb-2">
                        <div className="flex">
                            <span className="text-xl font-semibold px-4 py-2">Mới</span>
                        </div>
                        <div className="flex justify-end p-2 mt-3">
                            <span>{getAddNewStudyItem()} mục</span>
                        </div>
                    </div>
                </div>
            </div>
            {/* Total view */}
            <div>
                <div className="mb-3">
                    <span className="text-3xl font-bold">Tổng quát</span>
                </div>
                {/* Time chooser */}
                <div className="ml-5">
                    <DropdownType1
                        options={timeChooserData}
                        selected={timeChooserData[0]}
                        onSelectedChange={onSelectedChange}
                        color={"gray"}
                    />
                </div>
                <div className="flex flex-row mt-3 ml-5">
                    {/* Total learned / total add new item */}
                    <div className="flex flex-col card w-5/12 h-92 mr-3">
                        <span className="text-xl font-bold px-2 py-1">Tổng đã học</span>
                        <div>
                            <div id="total-learned-chart" className="h-48"></div>
                        </div>
                    </div>
                    {/* Process */}
                    <div className="flex flex-col card w-5/12 h-92">
                        <span className="text-xl font-bold px-2 py-1">Tổng hoàn thành</span>
                        <div>
                            <div id="completed-process-chart" className="h-40"></div>
                        </div>
                    </div>
                </div>
                <button onClick={renderTotalLearnedChart}>Render Total Learned Chart</button>
                <button onClick={renderCompletedProcessChart}>
                    Render Completed Process Chart
                </button>
            </div>
        </div>
    );
};
const mapStateToProps = (state) => {
    return {
        learningsData: state.learning.learningsData,
        settings: state.settings,
        reviewsData: state.reviewing.reviewsData,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

import { Box, IconButton, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPlus, faArrowsRotate, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import ApexCharts from "apexcharts";
import { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { INTERVAL_API_URL } from "../../constants/apis";
import { useDispatch } from "react-redux";
import {
    addIntervalItem,
    addIntervalTemplate,
    deleteIntervalItem,
    deleteIntervalTemplate,
    setIntervalTemplates,
    updateIntervalItem,
} from "../../redux/actions/settingsActions";
import { CenterWrapper } from "../common/wrappers";
const Settings = (props) => {
    const [isAddIntervalTemplateVisible, setIsAddIntervalTemplateVisible] = useState(false);
    const [isAddIntervalFormShow, setIsAddIntervalFormShow] = useState(false);
    const divIntervalTemplateRef = useRef(null);
    const divIntervalItem = useRef(null);
    const [activeTemplateId, setActiveTemplateId] = useState(0);
    const handleClickOutside = (event) => {
        if (
            divIntervalTemplateRef.current &&
            !divIntervalTemplateRef.current.contains(event.target)
        ) {
            setIsAddIntervalTemplateVisible(false); // Ẩn div khi nhấn bên ngoài
        }

        if (divIntervalItem.current && !divIntervalItem.current.contains(event.target)) {
            setIsAddIntervalFormShow(false);
        }
    };

    useEffect(() => {
        if (isAddIntervalTemplateVisible) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isAddIntervalTemplateVisible]);

    function handleToggleAddIntervalTemplate() {
        setIsAddIntervalTemplateVisible(!isAddIntervalTemplateVisible);
    }
    function handleToggleAddIntervalForm() {
        setIsAddIntervalFormShow(!isAddIntervalFormShow);
    }
    function handleToggleDownEffect(id) {
        const triangle = document.querySelector(id);
        triangle.classList.toggle("down");
    }
    function handleToggleHiddenEffect(id) {
        console.log("id: ", id);
        const content = document.querySelector(id);
        content.classList.toggle("hidden");
    }
    function handleShowIntervalContent(id, triangleId) {
        handleToggleDownEffect(triangleId);
        handleToggleHiddenEffect(id);
    }
    function handleShowIntervalItem(id) {
        handleToggleDownEffect(id);
        handleToggleHiddenEffect(id);
    }
    function renderChart(data) {
        var options = {
            chart: {
                type: "line",
            },
            series: [
                {
                    name: "sales",
                    // data: [1, 3, 7, 16, 35],
                    data: data["series"],
                },
            ],
            xaxis: {
                // categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
                categories: data["categories"],
            },
            markers: {
                colors: ["#FFFFFF", "#FFFFFF", "#FFFFFF"],
            },

            stroke: {
                width: 2,
            },
        };

        var chart = new ApexCharts(document.querySelector("#" + data["id"]), options);
        chart.render();
    }
    function getCurrentTemplate() {
        var template = {};
        props.settings.intervalTemplate.forEach((item) => {
            if (item.id === props.settings.currentTemplateId) {
                template = item;
            }
        });
        return template;
    }
    function setAddIntervalFormVisible(value) {
        setIsAddIntervalFormShow(value);
    }
    const extractInterval = (interValTemplateId) => {
        const interValTemplate =
            props.settings.intervalTemplate.find(
                (interval) => interval.id === interValTemplateId
            ) || {};
        return interValTemplate.intervals?.map((interval) => interval?.value).filter(Boolean) || [];
    };
    async function deleteIntervalTemplateServer(intervalId) {
        if (props.settings.intervalTemplate.length === 1) {
            return;
        }
        const data = {
            id: intervalId,
            replace_id: 4,
        };
        try {
            const res = await axios.post(`${INTERVAL_API_URL}/delete-template`, data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            });
            props.deleteIntervalTemplate(intervalId);
        } catch (error) {
            console.log(error);
        }
    }
    async function deleteIntervalItemServer(intervalId) {
        try {
            const res = await axios.get(`${INTERVAL_API_URL}/delete-item/${intervalId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            });
            console.log(res.data);
            props.deleteIntervalItem(intervalId);
        } catch (error) {
            console.log(error);
        }
    }
    async function handleAddIntervalItem(intervalTemplateId, value) {
        const data = {
            interval_template_id: intervalTemplateId,
            value: value,
        };
        var intervalItem = {
            id: getTempIdOfIntervalItem(intervalTemplateId),
            value: value,
            template: intervalTemplateId,
        };
        try {
            const res = await axios.post(`${INTERVAL_API_URL}/add-item`, data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            });
            props.addIntervalItem({ id: intervalTemplateId, interval: intervalItem });
        } catch (error) {
            console.log(error);
        }
    }
    async function addIntervalTemplateServer(data) {
        // data = {
        //     "name":,
        //     "intervals": []
        // }

        try {
            const res = await axios.post(`${INTERVAL_API_URL}/add-template`, data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            });
            data = {
                ...data,
                id: getTempIdOfNewIntervalTemplate(),
                is_deleted: false,
                intervals: data.intervals.map((item) => {
                    return { id: 0, value: item.value, template: getTempIdOfNewIntervalTemplate() };
                }),
            };
            props.addIntervalTemplate(data);
        } catch (error) {
            console.log(error);
        }
    }
    function getIntervalTemplate(intervalTemplateId) {
        var template = {};
        props.settings.intervalTemplate.forEach((item) => {
            if (item.id === intervalTemplateId) {
                template = item;
            }
        });
        return template;
    }
    function getTempIdOfIntervalItem(intervalTemplateId) {
        var tempId = 0;
        var curTemplate = getIntervalTemplate(intervalTemplateId);
        curTemplate.intervals.forEach((item) => {
            if (item.id < tempId) {
                tempId = item.id;
            }
        });
        return tempId - 1;
    }
    function getTempIdOfNewIntervalTemplate() {
        var tempId = 0;
        props.settings.intervalTemplate.forEach((item) => {
            if (item.id < tempId) {
                tempId = item.id;
            }
        });
        return tempId - 1;
    }

    function getDataForTemplateChart(intervalTemplateId) {
        var template = getIntervalTemplate(intervalTemplateId);
        var categories = [];
        var series = [];
        console.log("template: ", template);
        template.intervals.forEach((item, index) => {
            categories.push(item.value);
            series.push(index + 1);
        });
        return {
            id: "chart-" + intervalTemplateId,
            categories: series,
            series: categories,
        };
    }
    return (
        <div>
            <div className="">
                {/* Topbar */}
                <div className="flex flex-row topbar">
                    <div>
                        <span className="text-3xl">Cài đặt</span>
                    </div>
                </div>

                {/* Interval settings */}
                <div className="interval-content interval-settings">
                    {/* Main title */}

                    <div className="w-[145px] flex flex-row">
                        <div id="interval-title" className="inline rotate-triangle">
                            <FontAwesomeIcon
                                icon={faPlay}
                                onClick={() =>
                                    handleShowIntervalContent(
                                        "#interval-settings-content",
                                        "#interval-title"
                                    )
                                }
                            />
                        </div>
                        <span className="pl-3">Thời gian ôn tập</span>
                    </div>
                    <div id="interval-settings-content" className="mx-8 my-2">
                        {props.settings.intervalTemplate.map((item) => {
                            return (
                                <div
                                    className="my-5"
                                    // id={"interval-settings-content-" + item.id}
                                >
                                    {/* Interval title */}
                                    <div className="w-[140px] flex flex-row justify-between items-center">
                                        <div className="inline rotate-triangle">
                                            <FontAwesomeIcon
                                                icon={faPlay}
                                                onClick={() =>
                                                    handleShowIntervalItem("#interval-" + item.id)
                                                }
                                            />
                                        </div>
                                        <span>{item.name}</span>
                                        <FontAwesomeIcon
                                            icon={faXmark}
                                            onClick={() => deleteIntervalTemplateServer(item.id)}
                                        />
                                    </div>
                                    {/* Interval item content */}
                                    <div id={"interval-" + item.id} className="hidden">
                                        <button
                                            onClick={() =>
                                                renderChart(getDataForTemplateChart(item.id))
                                            }
                                        >
                                            Render Chart
                                        </button>
                                        {/* Interval item chart */}
                                        <div className="flex justify-center">
                                            <div
                                                id={"chart-" + item.id}
                                                className="flex justify-center w-6/12 h-5"
                                            ></div>
                                        </div>
                                        {/* Interval item time-stone content*/}
                                        <div className="">
                                            <div className="flex flex-row justify-between">
                                                <div className="flex items-center justify-between w-40">
                                                    <FontAwesomeIcon
                                                        icon={faPlus}
                                                        className="cursor-pointer"
                                                    />
                                                    <span
                                                        onClick={() => {
                                                            handleToggleAddIntervalForm();
                                                            setActiveTemplateId(item.id);
                                                        }}
                                                    >
                                                        Thêm mốc thời gian
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between w-32 p-1">
                                                    <FontAwesomeIcon icon={faArrowsRotate} />
                                                    <span>Tự điều chỉnh</span>
                                                </div>
                                            </div>
                                            {/* Time-stones */}
                                            <div className="interval-items flex flex-row flex-wrap">
                                                {/* Time-stone */}
                                                {extractInterval(item.id).map(
                                                    (intervalId, index) => {
                                                        return (
                                                            <div className="flex interval-item mr-24 justify-between items-center">
                                                                <span>
                                                                    Mốc {index}:{" "}
                                                                    <input
                                                                        className="styled-input w-6"
                                                                        value={intervalId}
                                                                    ></input>{" "}
                                                                    ngày
                                                                </span>
                                                                <FontAwesomeIcon
                                                                    icon={faXmark}
                                                                    className="px-2 cursor-pointer"
                                                                    onClick={() =>
                                                                        deleteIntervalItemServer(
                                                                            intervalId
                                                                        )
                                                                    }
                                                                />
                                                            </div>
                                                        );
                                                    }
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                        <div className="w-[165px] flex flex-row justify-between items-center cursor"  onClick={() => handleToggleAddIntervalTemplate()}>
                            <FontAwesomeIcon icon={faSquarePlus} />

                            <span>
                                Thêm mẫu thời gian
                            </span>
                        </div>
                    </div>

                    {/* Interval items */}
                </div>
                <div class="">
                    {/* Appearance settings */}
                    <div className=" flex flex-row w-[100px]">
                        <div id="interval-settings-title" className="inline rotate-triangle">
                            <FontAwesomeIcon
                                icon={faPlay}
                                onClick={() =>
                                    handleShowIntervalContent(
                                        "#appearance-settings-content",
                                        "#interval-settings-title"
                                    )
                                }
                            />
                        </div>
                        <span className="pl-3">Hiển thị</span>
                    </div>
                    {/* Appearance settings */}
                    <div id="appearance-settings-content" className="pt-2 px-16 hidden">
                        <div className="appearance-settings-part flex flex-row justify-between items-center min-h-24">
                            <span>Font chữ</span>
                            <div className="flex flex-row justify-between items-center space-x-2">
                                <div className="flex-grow rounded-md bg-slate-600 dark:bg-slate-400 opacity-80 size-12 mr-1 mb-1 flex items-center justify-center flex-col serif-font text-white">
                                    <span className="sans-serif-font text-xl">Aa</span>
                                    Serif
                                </div>
                                <div className="flex-grow rounded-md bg-slate-600 dark:bg-slate-400 opacity-80 size-12 mr-1 mb-1 flex items-center justify-center flex-col sans-serif-font text-white">
                                    <span className="serif-font text-xl">Aa</span>
                                    Sans
                                </div>
                                <div className="flex-grow rounded-md bg-slate-600 dark:bg-slate-400 opacity-80 size-12 mr-1 mb-1 flex items-center justify-center flex-col mono-font text-white">
                                    <span className="mono-font text-xl">Aa</span>
                                    Mono
                                </div>
                            </div>
                        </div>
                        <div className="break-line-light opacity-40"></div>
                        <div className="appearance-settings-part flex flex-row justify-between items-center min-h-24">
                            <span>Kích cỡ</span>
                            <div className="flex flex-row items-center ">
                                <input
                                    value="14"
                                    className="bg-none border-2 border-slate-600 dark:border-slate-400 w-12 styled-input"
                                ></input>
                                <input
                                    id="default-range"
                                    type="range"
                                    value="50"
                                    class="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                                ></input>
                            </div>
                        </div>
                        <div className="break-line-light opacity-40"></div>
                        <div className="flex flex-row justify-between items-center min-h-24">
                            <span>Chủ đề</span>
                            <div className="flex-center">
                                <input
                                    type="radio"
                                    name="theme"
                                    value="light"
                                    checked={true}
                                ></input>
                                <label>Sáng</label>
                                <input type="radio" name="theme" value="dark"></input>
                                <label>Tối</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                {isAddIntervalTemplateVisible && (
                    <CenterWrapper>
                        <div
                            className="w-4/12 h-5/12 outline-2 z-11 bg-neutral-600 rounded-lg p-2"
                            ref={divIntervalTemplateRef}
                        >
                            <AddIntervalTemplateForm onSubmit={addIntervalTemplateServer} onDelete={() => setIsAddIntervalTemplateVisible(false)}/>
                        </div>
                    </CenterWrapper>
                )}
                {isAddIntervalFormShow && (
                    // <div className="w-full h-screen z-10 fixed top-0 left-0 flex items-center justify-center">

                    <CenterWrapper>
                        <div className="w-4/12 h-5/12 outline-2 z-11" ref={divIntervalItem}>
                            <AddIntervalItem
                                templateId={activeTemplateId}
                                onSubmit={handleAddIntervalItem}
                                onDelete={() => setAddIntervalFormVisible(false)}
                            />
                        </div>
                    </CenterWrapper>
                    // </div>
                )}
            </div>
        </div>
    );
};
const mapStateToProps = (state) => {
    return {
        settings: state.settings,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setIntervalTemplates: (payload) => dispatch(setIntervalTemplates(payload)),
        deleteIntervalTemplate: (payload) => dispatch(deleteIntervalTemplate(payload)),
        addIntervalTemplate: (payload) => dispatch(addIntervalTemplate(payload)),
        deleteIntervalItem: (payload) => dispatch(deleteIntervalItem(payload)),
        addIntervalItem: (payload) => dispatch(addIntervalItem(payload)),
        updateIntervalItem: (payload) => dispatch(updateIntervalItem(payload)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Settings);

const AddIntervalTemplateForm = ({ onSubmit, onDelete }) => {
    const [name, setName] = useState("");
    const [intervals, setIntervals] = useState([]);
    const [value, setValue] = useState(0);
    function deleteItem(value) {
        setIntervals(intervals.filter((item) => item !== value));
    }
    function addItem(value) {
        if (value === 0) {
            return;
        } else if (intervals.includes(value)) {
            return;
        }
        setIntervals([...intervals, value]);
    }
    return (
        <div>
            <div className="flex flex-row justify-between items-center">
                <span>Thêm mẫu thời gian</span>
                <FontAwesomeIcon icon={faXmark} onClick={onDelete} />
            </div>
            <div className="flex flex-col">
                <input
                    className="w-20 "
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nhập tên"
                ></input>
                <button onClick={() => addItem(value)}>+</button>
                <input
                    className="w-20"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    type="number"
                ></input>
                {intervals.map((item) => {
                    return (
                        <div>
                            <span>{item}</span>
                            <FontAwesomeIcon
                                icon={faXmark}
                                onClick={() => deleteItem(item)}
                            ></FontAwesomeIcon>
                        </div>
                    );
                })}
                <button onClick={() => onSubmit({ "name": name, "intervals": intervals })}>
                    Hoàn thành
                </button>
            </div>
        </div>
    );
};

const AddIntervalItem = ({ templateId, onSubmit, onDelete }) => {
    const [value, setValue] = useState(0);

    return (
        <div>
            <div className="flex flex-row justify-between items-center">
                <span>Thêm mốc thời gian</span>
                <FontAwesomeIcon icon={faXmark} onClick={onDelete} />
            </div>
            <div>
                <input value={value} onChange={(e) => setValue(e.target.value)}></input>
                <button onClick={() => onSubmit(templateId, value)}>Thêm</button>
            </div>
        </div>
    );
};

import React, { useEffect } from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { DifficultyDropdown, Dropdown } from "../common/common";
import { faArrowUpAZ, faArrowDownAZ, faArrowUpWideShort, faArrowDownShortWide } from "@fortawesome/free-solid-svg-icons";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import axios from "axios";
import { INTERVAL_API_URL, STUDY_API_URL } from "../../constants/apis";
import { formatDateString } from "../../utils/dateUtils";
import DatePickerValue from "../common/dateCommon";
import { learningTableStructure } from "../../constants/componentConstants";
import {
    addLearningTask,
    decreaseTempID,
    setLearningsTask,
    setLearningFilterResults,
    setSearchText,
    updateLearningTask,
    addLearningFilterResult,
    resetLearningFilterResults,
    resetLearningFilter,
    deleteLearningFilterResult,
    changeLearnId,
    changeDate,
    filterLearning,
} from "../../redux/actions/learningActions";
import { setIntervalTemplates } from "../../redux/actions/settingsActions";
import { SearchBar } from "../common/common";
import { LearningTable } from "./learningTable";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useRef } from "react";
const Learning = (props) => {
    const dispatch = useDispatch();
    const interval = useSelector((state) => state.settings.intervalTemplate);
    const datas = {};
    const [showFilter, setShowFilter] = useState(false);
    useEffect(() => {
        fetchLearningSets(formatDateString(props.learning.date, "dd-mm-yyyy"));
        structureLearningData(learningTableStructure["header_id"], props.learning.learningsData);
        setIntervalTemplates();
        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, []);

    function handleClick(event) {
        if (showFilter) {
            event.stopPropagation();
            event.preventDefault();
            setShowFilter(false);
        }
    }

    const extractInterval = (interValTemplateId) => {
        var interValTemplate = props.settings.intervalTemplate.find(
            (interval) => interval.id === interValTemplateId
        );
        var result = [];
        if (interValTemplate === undefined || interValTemplate.intervals.length === 0) {
            return result;
        }

        interValTemplate.intervals.forEach((interval) => {
            if (interval){
                result.push(interval.id);
            }
        });

        return result;
    }
    function handleToggleDropdown() {
        const dropdowns = document.querySelectorAll("[dropdown-data-container]");
    }

    async function onChangeDate(date) {
        console.log("DAte: ", date);
        dispatch(changeDate(date));
        try {
            await fetchLearningSets(formatDateString(date, "dd-mm-yyyy"));
            structureLearningData(
                learningTableStructure["header_id"],
                props.learning.learningsData
            );
        } catch (error) {
            console.log(error);
        }
    }

    function onSelectedChange(itemChangeId, payload) {
        console.log(
            "itemChangeId: ",
            interval.find((interval) => interval.id === payload.id)
        );
        var changeData = {
            id: itemChangeId,
            study: { difficulty: interval.find((interval) => interval.id === payload.id) },
        };
        dispatch(updateLearningTask(changeData));
        // updateReviewingTaskServer(changeData);
    }

    const fetchLearningSets = async (date = "09-08-2024") => {
        try {
            const res = await axios.get(STUDY_API_URL + "/study", {
                headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
                params: { date: date },
            });
            var idList = [];
            res.data.forEach((item) => {
                idList.push(item.id);
            });
            props.setLearningFilterResults(idList);
            props.setLearningsTask(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const setIntervalTemplates = async () => {
        var data = await fetchIntervalTemplate();
        props.setIntervalTemplates(data);
    };

    async function fetchIntervalTemplate() {
        try {
            const res = await axios.get(INTERVAL_API_URL + "/get-user", {
                headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
            });
            return res.data;
        } catch (error) {
            console.log(error);
        }
    }

    function getDataFiltered() {
        var idsFilter = props.learning.filterResults;
        var results = [];
        idsFilter.forEach((id) => {
            props.learning.learningsData.forEach((item) => {
                if (item.id === id) {
                    results.push(item);
                    return;
                }
            });
        });
        return results;
    }

    function structureLearningData(structure, data = props.learning.learningsData) {
        var result = [];
        // result["rows"] = [];

        var intervals = [];
        if (
            props.settings.intervalTemplate === undefined ||
            props.settings.intervalTemplate.length === 0
        ) {
            return result;
        }
        props.settings.intervalTemplate.forEach((interval) => {
            var temp = {};
            temp["id"] = interval.id;
            temp["name"] = interval.name;
            temp["color"] = interval.color;
            intervals.push(temp);
        });
        data.forEach((item) => {
            var temp = [];
            var button = {
                "type": "button-dropdown",
                "data": {
                    "options": intervals,
                    "selected":
                        intervals[
                            intervals.findIndex((interval) => interval.id === item.difficulty.id)
                        ],
                },
            };
            structure.forEach((key) => {
                if (key === "interval") {
                    temp.push(button);
                } else {
                    temp.push(item[key]);
                }
            });

            result.push(temp);
        });
        return result;
    }

    function getDataForTable() {
        var data = {};
        var results = getDataFiltered();
        data["title"] = "Cần học hôm nay";
        data["headers"] = learningTableStructure["header_name"];
        data["structure"] = learningTableStructure["header_id"];
        data["renderColumn"] = [false, true, true, true];
        data["editable"] = [false, true, true, true];
        data["rows"] = structureLearningData(data["structure"], results);
        return data;
    }

    function handleAddLearningTask() {
        var inter = {};
        props.interval.forEach((interval) => {
            if (interval.id === props.settings.settings.intervalTemplateId) {
                inter = interval;
            }
        });

        // var curInterval = props.interval.find(
        //     (interval) => interval.id === props.settings.settings.intervalTemplateId
        // );
        var curInterval = extractInterval(4);
        var newTask = {
            id: props.learning.tempId,
            content: "",
            study_time: formatDateString(props.learning.date, "dd/mm/yyyy"),
            difficulty: inter,
            interval: curInterval,
        };
        console.log("newTask: ", newTask);
        dispatch(resetLearningFilter());
        dispatch(addLearningTask(newTask));
        // dispatch(addLearningFilterResult(newTask.id));
        dispatch(decreaseTempID());
        addLearningTaskServer(newTask);
    }

    function findSearchOutput(input) {
        var result = [];
        if (input === "") {
            props.learning.learningsData.forEach((item) => {
                result.push(item.id);
            });
        } else {
            props.learning.learningsData.forEach((item) => {
                if (item.content.includes(input)) {
                    result.push(item.id);
                }
            });
        }

        return result;
    }

    function handleSearch(input) {
        dispatch(setSearchText(input));
        var temp = findSearchOutput(input);
        dispatch(setLearningFilterResults(temp));
    }

    function handleToggleFilter() {
        setShowFilter(!showFilter);
    }

    function getCurInterval() {
        var curInterval = {};
        props.interval.forEach((interval) => {
            if (interval.id === props.settings.settings.intervalTemplateId) {
                curInterval = interval;
            }
        });
        return curInterval;
    }
    async function addLearningTaskServer(data) {
        const url = "http://localhost:8000/api/study/add";
        try {
            const response = await axios.post(
                url,
                data, // Đưa trực tiếp dữ liệu vào đây
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                        "Content-Type": "application/json",
                    },
                    withCredentials: true, // Nếu cần truyền cookies
                }
            );
            console.log("response: ", response.data.id);
            dispatch(changeLearnId({ id: data.id, newId: response.data.id }));
            dispatch(updateLearningTask(response.data))
            return response.data.new_id;
        } catch (error) {
            console.log("error: ", error.response); // Log thêm chi tiết của lỗi
        }
    }
    return (
        <div className="">
            <div className="flex flex-row topbar">
                <div className="flex justify-between items-center w-10/12">
                    <span className="text-3xl">Nội dung mới</span>

                    <span>{props.learning.learningsData.length}</span>
                </div>
            </div>
            <div className="mr-32 mt-3">
                {/* Search, filter */}
                <div className="flex flex-row justify-between">
                    <div className="card-color flex justify-center items-center w-[220px] p-1 rounded-lg mr-10">
                        <DatePickerValue
                            onChangeDate={onChangeDate}
                            defaultValue={formatDateString(props.learning.date, "yyyy-mm-dd")}
                        />
                    </div>
                    <div className="flex flex-row justify-between items-center w-3/12">
                        <span onClick={handleAddLearningTask}>Thêm</span>
                        <SearchBar className="px-3 h-4" handleSearch={handleSearch} />
                        <FontAwesomeIcon
                            icon={faSliders}
                            className="px-3 size-5 cursor-pointer"
                            onClick={() => handleToggleFilter()}
                        />
                        {showFilter && (
                            <div className="relative">
                                <FilterPanel />
                            </div>
                        )}
                    </div>
                </div>
                {/* Group content */}
                <div className="mt-3">
                    {/* Group name */}
                    {/* <div>
                        <div id="interval-title" className="inline rotate-triangle">
                            <FontAwesomeIcon icon={faChevronDown} />
                        </div>
                        <div className="p-1 mx-2 card-color inline-block rounded-lg">
                            <span className="">Nội dung</span>
                        </div>
                    </div> */}

                    {/* Group content */}
                    <div className="mx-10 my-2 mb-10 pb-10">
                        <div>
                            <LearningTable datas={getDataForTable()} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.user,
        learning: state.learning,
        settings: state.settings,
        interval: state.settings.intervalTemplate,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setLearningsTask: (payload) => dispatch(setLearningsTask(payload)),
        updateLearningTask: (payload) => dispatch(updateLearningTask(payload)),
        addLearningTask: (payload) => dispatch(addLearningTask(payload)),
        setIntervalTemplates: (payload) => dispatch(setIntervalTemplates(payload)),
        setLearningFilterResults: (payload) => dispatch(setLearningFilterResults(payload)),
        setSearchText: (payload) => dispatch(setSearchText(payload)),
        addLearningFilterResult: (payload) => dispatch(addLearningFilterResult(payload)),
        resetLearningFilterResults: () => dispatch(resetLearningFilterResults()),
        resetLearningFilter: () => dispatch(resetLearningFilter()),
        deleteLearningFilterResult: (payload) => dispatch(deleteLearningFilterResult(payload)),
        changeLearnId: (payload) => dispatch(changeLearnId(payload)),
        changeDate: (payload) => dispatch(changeDate(payload)),
        filterLearning: (payload) => dispatch(filterLearning(payload)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Learning);

const FilterPanel = () => {
    const [filterArr, setFilterArr] = useState([]);
    const [sortArr, setSortArr] = useState([]);
    const intervals = useSelector((state) => state.settings.intervalTemplate);
    const dispatch = useDispatch();
    function changeCondition(status, type, value){
        if (status === true){
            var temp = filterArr;
            setFilterArr(temp);
        }
        else {
            setFilterArr(filterArr.filter(item => !(item.type === type && item.value === value)));
        }
    
        // dispatch(changeCondition({"type": type, "value": value,"status": e}));
    }
    function checkSortConditionStatus(type, value){
        return sortArr.some(item => item.type === type && item.value === value);
    }
    function changeSort(status, type, value){
        if (status === true){
            var temp = [];
            temp.push({"type": type, "value": value});
            console.log("temp: ", temp);
            setSortArr(temp);
        }
        else {
            setSortArr(sortArr.filter(item => !(item.type === type && item.value === value)));
        }
    }
    function changeSortAlphabet(){
        console.log("O")
        if (checkSortConditionStatus("content", "asc")){
            changeSort(false, "content", "asc");
            changeSort(true, "content", "desc");
        }
        else if (checkSortConditionStatus("content", "desc")){
            changeSort(false, "content", "desc");
        }
        else {
            console.log("sa")
            changeSort(true, "content", "asc");
        }
    }

    function changeSortDifficulty(){
        if (checkSortConditionStatus("difficulty", "asc")){
            console.log("up")
            changeSort(false, "difficulty", "asc");
            changeSort(true, "difficulty", "desc");
        
        }
        else if (checkSortConditionStatus("difficulty", "down")){
            console.log("down")
            changeSort(false, "difficulty", "desc");
        }
        else{
            changeSort(true, "difficulty", "asc");
            console.log("init")
        }
    }
    return (
        <div className="flex flex-row -left-[255px] top-3 z-10 absolute rounded-lg">
            <div className="flex flex-col w-72 bg-gray-700 rounded-lg">
                <div className="flex flex-row justify-between line-under items-center">
                    <span className="px-2 py-1 font-bold text-xl">Bộ lọc</span>
                    <div>
                        <span className="px-2 py-1">Lưu mẫu</span>
                        <span className="pr-2 py-1">Phục hồi</span>
                    </div>
                </div>
                <div className="flex items-center justify-center p-4 flex-col line-under-light">
                    <span>Độ khó: </span>
                    {/* <Dropdown /> */}
                    {intervals.map((interval) => {
                        return (
                            <div className = "flex flex-row flex-wrap">
                                <input type = "checkbox" name = {interval.id}  onChange = {(e) => changeCondition(e.target.checked, "difficulty", interval.id)}></input>
                                <label value = {interval.id}>{interval.name}</label>
                            </div>
                        )
                    })}
                </div>
                <div className="flex justify-between p-1 flex-col line-under-light">
                    <span>Sắp xếp: </span>
                    <div className = "flex flex-row justify-between items-center p-2 px-5">
                        <div className = "cursor-pointer" onClick = {()=>changeSortAlphabet()}>
                            Theo nội dung {checkSortConditionStatus("content", "asc") ? <FontAwesomeIcon icon={faArrowUpAZ} /> : checkSortConditionStatus("content", "desc") ? <FontAwesomeIcon icon={faArrowDownAZ} /> : ""}
                        </div>
                        <div className = "cursor-pointer" onClick = {()=>changeSortDifficulty()}>
                            Loại: <span>Độ khó</span>
                             {checkSortConditionStatus("difficulty", "asc") ? <FontAwesomeIcon icon={faArrowDownShortWide} /> : checkSortConditionStatus("difficulty", "desc") ? <FontAwesomeIcon icon={faArrowUpWideShort} /> : ""}
                        </div>
                    </div>
                    {/* <Dropdown /> */}
                </div>
            </div>
        </div>
    );
};

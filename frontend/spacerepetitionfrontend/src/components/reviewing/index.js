import React, { useEffect } from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Dropdown, LearnsContentTable } from "../common/common";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import axios from "axios";
import { STUDY_API_URL } from "../../constants/apis";
import { formatDateString } from "../../utils/dateUtils";
import { learningTableStructure } from "../../constants/componentConstants";
import { getCurrentDateFormatted } from "../../utils/dateUtils";
import { setReviewsTask } from "../../redux/actions/learningActions";
import { SearchBar } from "../common/common";
import DatePickerValue from "../common/dateCommon";
import { reviewingTableStructure } from "../../constants/componentConstants";
import { INTERVAL_API_URL } from "../../constants/apis";
import { ReviewingTable } from "./reviewingTable";
import { setIntervalTemplates } from "../../redux/actions/settingsActions";
const Reviewing = (props) => {
    useEffect(() => {
        setIntervalTemplates();
        fetchLearningSets(formatDateString(new Date(), "dd/mm/yyyy"));
        structureStudyData(reviewingTableStructure["header_id"], props.reviewing.reviewsData);
    }, []);
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
    async function onChangeDate(date) {
        try {
            await fetchLearningSets(formatDateString(date, "dd/mm/yyyy"));
            structureStudyData(reviewingTableStructure["header_id"], props.reviewing.reviewsData);
        } catch (error) {
            console.log(error);
        }
    }
    const fetchLearningSets = async (date) => {
        try {
            const res = await axios.get(STUDY_API_URL + "/review", {
                headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
                params: { date: date },
            });
            props.setReviews(res.data);
        } catch (error) {
            console.log(error);
        }
    };
    function structureStudyData(structure) {
        var result = [];
        // result["rows"] = [];

        var intervals = [];
        if (
            props.settings.intervalTemplate === undefined ||
            props.settings.intervalTemplate.length === 0
        ) {
            return result;
        }
        try {
            props.settings.intervalTemplate.forEach((interval) => {
                var temp = {};
                temp["id"] = interval.id;
                temp["name"] = interval.name;
                temp["color"] = interval.color;
                intervals.push(temp);
            });

            props.reviewing.reviewsData.forEach((item) => {
                var temp = [];
                // var button = {
                //     "type": "button-dropdown",
                //     "data": {
                //         "options": intervals,
                //         "selected":
                //             intervals[
                //                 intervals.findIndex(
                //                     (interval) => interval.id === item.study.difficulty.id
                //                 )
                //             ],
                //     },
                // };
                structure.forEach((key) => {
                    if (key === "is_learned") {
                        temp.push(item[key]);
                    } else {
                        temp.push(item[key]);
                    }
                });

                result.push(temp);
            });
            return result;
        } catch (error) {
            console.log(error);
        }
    }
    function getDataForTable() {
        var data = {};
        data["title"] = "Cần học hôm nay";
        data["headers"] = reviewingTableStructure["header_name"];
        data["structure"] = reviewingTableStructure["header_id"];
        data["renderColumn"] = [false, true, true, true];
        data["rows"] = structureStudyData(data["structure"]);
        return data;
    }

    
    return (
        <div>
            <div className="flex flex-row topbar">
                <div className="flex justify-between items-center w-10/12">
                    <span className="text-3xl">Cần học hôm nay</span>
                    <span>{getCurrentDateFormatted()}</span>
                    <span>0/0</span>
                </div>
            </div>
            <div className="mr-32 mt-3">
                {/* Search, filter */}
                <div className="flex flex-row justify-between">
                    <div className="card-color flex justify-center items-center w-[220px] p-1 rounded-lg mr-10">
                        <DatePickerValue
                            onChangeDate={onChangeDate}
                            defaultValue={formatDateString(props.reviewing.date, "yyyy-mm-dd")}
                        />
                    </div>
                    <div className="flex flex-row justify-between items-center w-3/12">
                        <SearchBar className="px-3 h-4" />
                        <FontAwesomeIcon icon={faSliders} className="px-3 size-5 cursor-pointer" />
                    </div>
                </div>
            </div>
            {/* Group content */}
            <div className="mt-3">
                {/* Group name */}
                <div>
                    <div id="interval-title" className="inline rotate-triangle">
                        <FontAwesomeIcon icon={faChevronDown} />
                    </div>
                    <div className="p-1 mx-2 card-color inline-block rounded-lg">
                        <span className="">Nội dung ôn tập</span>
                    </div>
                </div>
                <div className="mx-10 my-2 mb-10">
                    <div>
                        <ReviewingTable datas={getDataForTable()} />
                    </div>
                </div>
            </div>
        </div>
    );
};
const mapStateToProps = (state) => {
    return {
        reviewing: state.reviewing,
        settings: state.settings,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setReviews: (payload) => dispatch(setReviewsTask(payload)),
        setIntervalTemplates: (payload) => dispatch(setIntervalTemplates(payload)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Reviewing);

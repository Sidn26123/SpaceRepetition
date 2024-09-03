import React, { useCallback, useEffect, useState } from "react";
import { Dropdown } from "../common/common";
import { useDispatch } from "react-redux";
import { updateReviewTask } from "../../redux/actions/learningActions";
import axios from "axios";
import { useSelector } from "react-redux";
import ContextMenu from "./contextMenu";
import { CenterWrapper } from "../common/wrappers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { reviewingTableStructure } from "../../constants/componentConstants";
export const ReviewingTable = () => {
    const intervalTemplates = useSelector((state) => state.settings.intervalTemplate);
    const reviewing = useSelector((state) => state.reviewing.reviewsData);
    const [datas, setDatas] = useState(getDataForTable());
    function structureStudyData(structure) {
        var result = [];
        // result["rows"] = [];

        var intervals = [];
        if (
            intervalTemplates === undefined ||
            intervalTemplates === 0
        ) {
            return result;
        }
        try {
            intervalTemplates.forEach((interval) => {
                var temp = {};
                temp["id"] = interval.id;
                temp["name"] = interval.name;
                temp["color"] = interval.color;
                intervals.push(temp);
            });

            reviewing.forEach((item) => {
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
    
    const contextMenuButtons = [
        {
            text: "Thay đổi",
            icon: "edit",
            onClick: () => {
                setContextMenu();
            },
        },
        {
            text: "Delete",
            icon: "delete",
            onClick: () => {
                console.log("delete");
            },
        },
        {
            isSpacer: true,
        },
        {
            text: "Cancel",
            icon: "cancel",
            onClick: () => {
                console.log("cancel");
            },
        },
    ];
    const dispatch = useDispatch();
    const contextMenuRef = React.useRef(null);
    const changeStudyFormRef = React.useRef(null);
    const [contextMenu, setContextMenu] = useState({
        position: {
            x: 0,
            y: 0,
        },
        isToggle: false,
    });
    const [curStudyItem, setCurStudyItemId] = useState({});
    const interval = useSelector((state) => state.settings.intervalTemplate);
    const [isShowChangeStudyItemForm, setIsShowChangeStudyItemForm] = useState(false);
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    const handleClickOutside = useCallback((e) => {
        if (
            contextMenu.isToggle &&
            contextMenuRef !== null &&
            contextMenuRef.current &&
            !contextMenuRef.current.contains(e.target)
        ) {
            setContextMenu({
                position: {
                    x: 0,
                    y: 0,
                },
                isToggle: false,
            });
        }
    
        if (
            isShowChangeStudyItemForm &&
            changeStudyFormRef !== null &&
            changeStudyFormRef.current &&
            !changeStudyFormRef.current.contains(e.target)
        ) {
            setIsShowChangeStudyItemForm(false);
        }
    }, [contextMenu, isShowChangeStudyItemForm, contextMenuRef, changeStudyFormRef]);
    

    function handleUpdateReviewTask(e, payload) {
        var changeData = {
            id: payload[0],
            study_content: e.target.value,
        };
        // dispatch(updateReviewTask(changeData));
        // updateReviewingTaskServer(changeData);
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
        dispatch(updateReviewTask(changeData));
        // updateReviewingTaskServer(changeData);
    }
    async function updateReviewingTaskServer(dataToChange) {
        const url = "http://localhost:8000/api/study/update";
        const data = {
            id: dataToChange.id,
            content: dataToChange.content,
        };

        try {
            const response = await axios.post(url, {
                headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },

                data: data,
            });
            console.log("response: ", response);
        } catch (error) {
            console.log("error: ", error);
        }
    }
    async function handleChangeStatus(e, id) {
        const url = "http://localhost:8000/api/study/update-review";
        const data = {
            id: id,
            is_learned: e.target.checked,
        };
        try {
            const response = await axios.post(url, data, {
                headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
                // data: data,
            });
            dispatch(updateReviewTask({ id: id, is_learned: !e.target.checked }));
            console.log("response: ", response);
        } catch (error) {
            console.log("error: ", error);
        }
    }
    function showChangeStudyItemForm() {
        setIsShowChangeStudyItemForm(true);
    }
    function closeChangeStudyItemForm() {
        setIsShowChangeStudyItemForm(false);
    }

    function handleOnContextMenu(e, rightClickPerson) {
        e.preventDefault();
        const contextMenuAttr = contextMenuRef.current.getBoundingClientRect();
        const isLeft = e.clientX < window?.innerWidth / 2;
        let x;
        let y = e.clientY;

        if (isLeft) {
            x = e.clientX;
        } else {
            x = e.clientX - contextMenuAttr.width;
        }

        setContextMenu({
            position: {
                x: x,
                y: y,
            },
            isToggle: true,
        });
    }

    // function openChangeStudyItem(id) {
    //     var study = getStudyItemData(id);

    //     showChangeStudyItemForm();
    // }

    // function getStudyItemData(id) {
    //     var data = {

    //     }
    //     data.id = id;
    //     data.content = datas.rows.find((row) => row[0] === id)[1];
    //     return data;
    // }
    // function getStudys(){
    //     var studys = [];
    //     datas.rows.map((row) => {
    //         studys.push({id: row[0], content: row[1]});
    //     })
    //     return studys;
    // }
    return (
        <div>
            <div class="relative overflow-x-auto">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-500 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            {datas.headers.map((header, index) => {
                                return (
                                    <th key={index} scope="col" class="px-6 py-3">
                                        {header}
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {datas.rows.map((row) => {
                            return (
                                <tr
                                    key={row[0]}
                                    onContextMenu={(e) => {
                                        handleOnContextMenu(e, row[0]);
                                        setCurStudyItemId({ id: row[0] });
                                    }}
                                    className="content-row-transparent-hover line-under"
                                >
                                    {row.map((cell, index) => {
                                        if (datas.renderColumn[index] === true) {
                                            if (index === 2) {
                                                return (
                                                    <td class="px-6 py-4 font-medium secondary whitespace-nowrap dark:text-white z-2 relative w-2/12">
                                                        {/* <Dropdown
                                                            options={cell.data.options}
                                                            selected={cell.data.selected}
                                                            color={cell.data.color}
                                                            onSelectedChange={onSelectedChange}
                                                            key = {row[0]}
                                                            className="dropdown-data-container absolute"
                                                        /> */}
                                                        <input
                                                            type="checkbox"
                                                            checked={cell}
                                                            onChange={(e) =>
                                                                handleChangeStatus(e, row[0])
                                                            }
                                                        ></input>
                                                    </td>
                                                );
                                            } else {
                                                if (index === 3) {
                                                    return (
                                                        <td class="px-6 py-4 font-medium secondary whitespace-nowrap dark:text-white w-1/12">
                                                            {cell}
                                                        </td>
                                                    );
                                                } else {
                                                    return (
                                                        <td class="px-6 py-4 font-medium secondary whitespace-nowrap dark:text-white">
                                                            <input
                                                                defaultValue={cell}
                                                                className="w-full styled-input"
                                                                onChange={(e) =>
                                                                    handleUpdateReviewTask(e, row)
                                                                }
                                                            ></input>
                                                        </td>
                                                    );
                                                }
                                            }
                                        } else {
                                            return <></>;
                                        }
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <ContextMenu
                    contextMenuRef={contextMenuRef}
                    isToggle={contextMenu.isToggle}
                    x={contextMenu.position.x}
                    y={contextMenu.position.y}
                    buttons={[
                        {
                            text: "Edit",
                            icon: "edit",
                            onClick: () => {
                                showChangeStudyItemForm();
                            },
                        },
                        {
                            text: "Delete",
                            icon: "delete",
                            onClick: () => {
                                console.log("delete");
                            },
                        },
                        {
                            isSpacer: true,
                        },
                        {
                            text: "Cancel",
                            icon: "cancel",
                            onClick: () => {
                                console.log("cancel");
                            },
                        },
                    ]}
                />
                {isShowChangeStudyItemForm && (
                    <ChangeStudyItemForm
                        selected_item={curStudyItem}
                        changeStudyRef={changeStudyFormRef}
                        onClose={closeChangeStudyItemForm}
                    />
                )}
            </div>
        </div>
    );
};

var statusDropdownData = [
    { id: 1, name: "Chưa ôn" },
    { id: 2, name: "Đã ôn" },
    { id: 3, name: "Đang ôn" },
];
const statusDropdownBtn = () => {};

const ChangeStudyItemForm = ({ selected_item, changeStudyRef, onClose }) => {
    // data = {
    //     "id":,
    //     "content":,
    //     "template_id":,
    // }
    useEffect(() => {
        
    });
    const dispatch = useDispatch();
    const interval_templates = useSelector((state) => state.settings.intervalTemplate);
    const studyItem = useSelector((state) =>
        state.reviewing.reviewsData.find((study) => study.id === selected_item.id)
    );
    const [updatedData, setUpdatedData] = useState({
        id: FindStudyIdByReviewId(selected_item.id),
        content: studyItem.study_content,
        difficulty_id: studyItem.study.difficulty.id,
    });
    const [selectedItem , setSelectedItem] = useState(FindTemplateIdOfStudyItem(selected_item.id));
    function handleChangeContent(e) {
        setUpdatedData({ ...updatedData, content: e.target.value });
    }
    function handleChangeTemplate(id, obj) {
        setSelectedItem({id: obj.id, name: obj.name});
        console.log("id: ", obj.id);
        setUpdatedData({ ...updatedData, difficulty_id: obj.id });
    }
    function FindStudyIdByReviewId(review_id) {
        var review = useSelector((state) =>
            state.reviewing.reviewsData.find((review) => review.id === review_id)
        );
        return review.study.id;
    }
    function getOptionsData() {
        var options = [];
        interval_templates.map((template) => {
            options.push({ id: template.id, name: template.name });
        });
        return options;
    }
    function FindTemplateIdOfStudyItem(study_id) {
        var study = useSelector((state) =>
            state.reviewing.reviewsData.find((study) => study.id === study_id)
        );
        return {id: study.study.difficulty.id, name: study.study.difficulty.name};
    }
    function getSelectedOption() {
        // setSelectedItem(FindTemplateIdOfStudyItem(selected_item.id));
        return FindTemplateIdOfStudyItem(selected_item.id);
    }

    async function handleUpdateStudyItem() {
        var upData = {
            id: selected_item.id,
            study_content: updatedData.content,
            difficulty_id: updatedData.difficulty_id,
        }
        dispatch(updateReviewTask(upData));

        const url = "http://localhost:8000/api/study/update";
        const data = {
            id: updatedData.id,
            content: updatedData.content,
            difficulty_id: updatedData.difficulty_id,
        };
        console.log("data: ", data);
        try {
            const response = await axios.post(url, data, {
                headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
            });
            console.log("response: ", response);
        } catch (error) {
            console.log("error: ", error);
        }
        
    }
    // console.log("selected_id: ", selected_item.id);
    // console.log("selected_option: ", getSelectedOption());
    // console.log("interval_templates: ", getOptionsData());
    return (
        <div ref={changeStudyRef}>
            <CenterWrapper>
                <div className="flex flex-col min-h-[220px] w-4/12 bg-slate-600 rounded-lg">
                    <div className="flex flex-row justify-between items-center mt-3 mx-3 text-green-200">
                        <span></span>
                        <span className="font-bold text-3xl">Chỉnh sửa nội dung</span>
                        <FontAwesomeIcon
                            icon={faXmark}
                            className="cursor-pointer"
                            onClick={() => onClose()}
                        />
                    </div>
                    <div className="flex flex-col m-4">
                        <div className="min-h-[60px]">
                            <span>Nội dung:</span>
                            <input
                                className="styled-input"
                                value={updatedData.content}
                                onChange={(e) => handleChangeContent(e)}
                            ></input>
                        </div>
                        <div>
                            <span>Mẫu: </span>
                            <Dropdown
                                options={getOptionsData()}
                                selected={selectedItem}
                                color="green"
                                className="dropdown-data-container"
                                onSelectedChange={handleChangeTemplate}
                            />
                        </div>
                        <div className="flex flex-row justify-center mt-4">
                            <div className="flex items-center justify-center rounded-xl bg-green-700 min-w-[100px] mx-10 h-[32px] cursor-pointer">
                                <span className="text-gray-200" onClick = {() => handleUpdateStudyItem()}>Chỉnh sửa</span>
                            </div>
                            <div className="flex items-center justify-center rounded-xl bg-red-700 min-w-[100px] mx-10 cursor-pointer">
                                <span className="text-gray-200">Huỷ</span>
                            </div>
                        </div>
                    </div>
                </div>
            </CenterWrapper>
        </div>
    );
};

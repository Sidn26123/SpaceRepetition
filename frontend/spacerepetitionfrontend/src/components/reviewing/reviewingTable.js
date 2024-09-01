import React, { useEffect, useState } from "react";
import { Dropdown } from "../common/common";
import { useDispatch } from "react-redux";
import { updateReviewTask } from "../../redux/actions/learningActions";
import axios from "axios";
import { useSelector } from "react-redux";
import ContextMenu from "./contextMenu";

const contextMenuButtons = [
    {
        text: "Thay đổi",
        icon: "edit",
        onClick: () => {console.log("edit")},
    },
    {
        text: "Delete",
        icon: "delete",
        onClick: () => {console.log("delete")},
    },
    {
        isSpacer: true,
    },
    {
        text: "Cancel",
        icon: "cancel",
        onClick: () => {console.log("cancel")},
    }
]
export const ReviewingTable = ({ datas }) => {
    const dispatch = useDispatch();
    const contextMenuRef = React.useRef(null);
    const [contextMenu, setContextMenu] = useState({
        position:
        {
            x: 0,
            y: 0
        },
        isToggle: false,
    })
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
        
    }, []);
    function handleClickOutside(e) {
        if (contextMenu.isToggle && !contextMenuRef.current.contains(e.target)) {
            setContextMenu({
                position: {
                    x: 0,
                    y: 0,
                },
                isToggle: false,
            })
        }
    }
    const interval = useSelector((state) => state.settings.intervalTemplate);
    function handleUpdateReviewTask(e, payload) {
        console.log("pa: ", payload[0]);
        var changeData = {
            id: payload[0],
            study_content: e.target.value,
        };
        // dispatch(updateReviewTask(changeData));
        // updateReviewingTaskServer(changeData);
    }

    function onSelectedChange(itemChangeId, payload) {
        console.log("itemChangeId: ", interval.find((interval) => interval.id === payload.id));
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
        console.log(data)
        try {
            const response = await axios.post(url,
                data,
                {
                headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
                // data: data,
            });
            dispatch(updateReviewTask({id: id, is_learned: !e.target.checked}));
            console.log("response: ", response);
        } catch (error) {
            console.log("error: ", error);
        }
    }

    function handleOnContextMenu(e, rightClickPerson){
        e.preventDefault();
        console.log(contextMenuRef.current);
        const contextMenuAttr = contextMenuRef.current.getBoundingClientRect();
        const isLeft = e.clientX < window?.innerWidth / 2;
        let x
        let y = e.clientY

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
        })
    }
    return (
        <div>
            <div class="relative overflow-x-auto">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-500 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            {datas.headers.map((header, index) => {
                                return (
                                    <th key = {index} scope="col" class="px-6 py-3">
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
                                    onContextMenu={(e) => handleOnContextMenu(e, row[0])}
                                    className="content-row-transparent-hover line-under"
                                >
                                    {row.map((cell, index) => {
                                        if (datas.renderColumn[index] === true) {
                                            if (index === 2 ) {
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
                                                        <input type= "checkbox" checked = {cell} onChange = {(e)=> handleChangeStatus(e, row[0])}></input>
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
                    contextMenuRef = {contextMenuRef}
                    isToggle={contextMenu.isToggle}
                    x = {contextMenu.position.x}
                    y = {contextMenu.position.y}
                    buttons = {
                        [
                            {
                                text: "Edit",
                                icon: "edit",
                                onClick: () => {console.log("edit")},
                            },
                            {
                                text: "Delete",
                                icon: "delete",
                                onClick: () => {console.log("delete")},
                            },
                            {
                                isSpacer: true,
                            },
                            {
                                text: "Cancel",
                                icon: "cancel",
                                onClick: () => {console.log("cancel")},
                            }
                        ]
                    }
                />
            </div>
        </div>
    );
};

var statusDropdownData = [
    {id: 1, name: "Chưa ôn"},
    {id: 2, name: "Đã ôn"},
    {id: 3, name: "Đang ôn"},
]
const statusDropdownBtn = () => {
    
}
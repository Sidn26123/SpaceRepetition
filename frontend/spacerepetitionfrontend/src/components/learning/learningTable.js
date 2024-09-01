import React from "react";
import { Dropdown } from "../common/common";
import { useDispatch } from "react-redux";
import {
    updateLearningTask,
    updateLearningTaskDifficulty,
    deleteLearningTask,
} from "../../redux/actions/learningActions";

import { useSelector } from "react-redux";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { ConfirmDiv } from "../common/common";

export const LearningTable = ({ datas }) => {
    const dispatch = useDispatch();
    const [confirmDiv, setConfirmDiv] = React.useState(false);
    const [tempDeleteId, setTempDeleteId] = React.useState(0);
    const interval = useSelector((state) => state.settings.intervalTemplate);
    function handleUpdateLearningTask(e, payload) {
        console.log("pa: ", payload[0]);
        var changeData = {
            id: payload[0],
            content: e.target.value,
        };
        dispatch(updateLearningTask(changeData));
        updateLearningTaskServer(changeData);
    }
    function handleUpdateLocalLearningTask(e, payload) {
        var changeData = {
            id: payload[0],
            content: e.target.value,
        };
        dispatch(updateLearningTask(changeData));
    }
    async function updateLearningTaskServer(dataToChange) {
        const url = "http://localhost:8000/api/study/update";
        try {
            const response = await axios.post(
                url,
                dataToChange, // Đưa trực tiếp dữ liệu vào đây
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                        "Content-Type": "application/json",
                    },
                    withCredentials: true, // Nếu cần truyền cookies
                }
            );
            console.log("response: ", response);
        } catch (error) {
            console.log("error: ", error.response); // Log thêm chi tiết của lỗi
        }
    }
    async function addToTrash(id) {
        const url = "http://localhost:8000/api/trash/add";
        const data = {
            study_id: id,
        };
    
        try {
            const response = await axios.post(url, data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            });
        } catch (error) {
            console.log("error: ", error);
        }
    }
    function handleDeleteRow(id) {
        setTempDeleteId(id);
        addToTrash(id);
        setConfirmDiv(!confirmDiv);
    }
    async function deleteLearningTaskServer(id) {
        console.log("id: ", typeof (id));
        const url = "http://localhost:8000/api/study/delete";
        try {
            await axios.post(
                url,
                { id: id },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );
            dispatch(deleteLearningTask({ "id": id }));
        } catch (error) {
            console.log("error: ", error.response);
        }
    }
    function closeConfirmDiv() {
        setConfirmDiv(false);
    }
    function onSelectedChange(itemChangeId, payload) {
        console.log("itemChangeId: ", itemChangeId);
        var changeData = {
            id: itemChangeId,
            difficulty: interval.find((interval) => interval.id === payload.id),
        };
        dispatch(updateLearningTaskDifficulty(changeData));
        updateLearningTaskServer(changeData);
        // updateReviewingTaskServer(changeData);
    }
    function getTempId() {
        return tempDeleteId;
    }
    return (
        <div>
            <div class="relative overflow-x-auto">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-500 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            {datas.headers.map((header) => {
                                return (
                                    <th scope="col" class="px-6 py-3">
                                        {header}
                                    </th>
                                );
                            })}
                            <th>Xoá</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datas.rows.map((row, index1) => {
                            var id = row[0];
                            return (
                                <tr
                                    key={id}
                                    className="content-row-transparent-hover line-under-light"
                                >
                                    {row.map((cell, index) => {
                                        if (datas.renderColumn[index] === true) {
                                            if (
                                                typeof cell === "object" &&
                                                cell.type === "button-dropdown"
                                            ) {
                                                return (
                                                    <td class="px-6 py-4 font-medium secondary whitespace-nowrap dark:text-white z-2 relative w-2/12">
                                                        <Dropdown
                                                            options={cell.data.options}
                                                            selected={cell.data.selected}
                                                            color={cell.data.color}
                                                            idValue={id}
                                                            onSelectedChange={onSelectedChange}
                                                            className="dropdown-data-container absolute"
                                                        />
                                                    </td>
                                                );
                                            } else if (cell.type === "trash") {
                                                return <></>;
                                            } else {
                                                if (index === 3) {
                                                    return (
                                                        <td class="px-6 py-4 font-medium secondary whitespace-nowrap dark:text-white w-1/12">
                                                            <input value={cell}></input>
                                                        </td>
                                                    );
                                                } else {
                                                    return (
                                                        <td class="px-6 py-4 font-medium secondary whitespace-nowrap dark:text-white line-under-rs">
                                                            <input
                                                                value={cell}
                                                                className="w-full styled-input"
                                                                onChange={(e) =>
                                                                    handleUpdateLocalLearningTask(
                                                                        e,
                                                                        row
                                                                    )
                                                                }
                                                                onBlur={(e) =>
                                                                    handleUpdateLearningTask(e, row)
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
                                    <td class="px-6 py-4 w-[20px] font-medium secondary whitespace-nowrap dark:text-white">
                                        <FontAwesomeIcon
                                            icon={faTrashCan}
                                            className="text-red-500 cursor-pointer"
                                            onClick={() => handleDeleteRow(id)}
                                        />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                {confirmDiv &&
                    <ConfirmDiv
                        confirmText="abc"
                        onConfirm={() => deleteLearningTaskServer(tempDeleteId)}
                        onCancel={() => {}}
                        onClose={() => closeConfirmDiv()}
                    />
                }{" "}
            </div>
        </div>
    );
};

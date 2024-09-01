import React from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { removeTrashItem } from "../../redux/actions/trashActions";
export const TrashTable = ({ datas }) => {
    const dispatch = useDispatch();

    async function handleRestoreLearningItem(e, payload) {
        const url = "http://localhost:8000/api/study/update-review";
        const data = {
            id: payload[0],
            is_deleted: false,
        };
        console.log(data);
        try {
            const response = await axios.post(url, data, {
                headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
                // data: data,
            });
        } catch (error) {
            console.log("error: ", error);
        }
    }

    async function handleRestoreItem(trashId, studyId){
        const url = "http://localhost:8000/api/trash/delete";
        const url1 = "http://localhost:8000/api/study/update";
        const data = {
            id: trashId,
        };
        try{
            const response = await axios.post(url, data, {
                headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
            });
            dispatch(removeTrashItem(trashId));
        }
        catch(error){
            console.log("error: ", error);
        }
        const updateStudyData = {
            id: studyId,
            is_deleted: false,
        }
        try {
            const response = await axios.post(url1, updateStudyData, {
                headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
                // data: data,
            });
        } catch (error) {
            console.log("error: ", error);
        }

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
                        </tr>
                    </thead>
                    <tbody>
                        {datas.rows.map((row) => {
                            var tempId = row[1];
                            return (
                                <tr
                                    key={row[0]}
                                    className="content-row-transparent-hover line-under"
                                >
                                    {row.map((cell, index) => {
                                        if (datas.renderColumn[index] === true) {
                                            if (index === 2) {
                                                return (
                                                    <td class="px-6 py-4 font-medium secondary whitespace-nowrap dark:text-white w-1/12">
                                                        {cell}
                                                    </td>
                                                );
                                            } else {
                                                return (
                                                    <td class="px-6 py-4 font-medium secondary whitespace-nowrap dark:text-white">
                                                        <input
                                                            value={cell}
                                                            className="w-full styled-input"
                                                            // onChange={(e) =>
                                                            //     handleRestoreLearningItem(e, row)
                                                            // }
                                                        ></input>
                                                    </td>
                                                );
                                            }
                                        }
                                    })}
                                    <td class="px-6 py-4 w-[20px] font-medium secondary whitespace-nowrap dark:text-white">
                                        <FontAwesomeIcon
                                            icon={faTrashCan}
                                            className="text-red-500 cursor-pointer"
                                            onClick={() => handleRestoreItem(row[0], tempId)}
                                        />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

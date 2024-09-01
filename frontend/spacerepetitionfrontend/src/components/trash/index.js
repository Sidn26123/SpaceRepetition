import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { trashTableStructure } from "../../constants/componentConstants";
import { TrashTable } from "./trashTable";
import { setTrash, restoreTrash } from "../../redux/actions/trashActions";
const Trash = (props) => {

    async function fetchTrashSets() {
        const url = "http://localhost:8000/api/trash/get";
        try {
            const response = await axios.get(url, {
                headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
            });
            props.setTrash(response.data);
            console.log("trash: ", response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchTrashSets();
    }, []);
    function structureStudyData(structure) {
        var result = [];
        // result["rows"] = [];


        try {


            props.trash.recycleBins.forEach((item) => {
                var temp = [];
                
                structure.forEach((key) => {
                    if (key === "study_id") {
                        var study = item["study"];
                        temp.push(study["id"]);
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
        data["headers"] = trashTableStructure["header_name"];
        data["structure"] = trashTableStructure["header_id"];
        data["renderColumn"] = [false, true, true];
        data["rows"] = structureStudyData(data["structure"]);
        return data;
    }
    return (
        <div>
            <div className="flex flex-row topbar">
                <div className="flex justify-between items-center w-10/12">
                    <span className="text-3xl">Thùng rác</span>
                    <span>0/0</span>
                </div>
            </div>
            <div className="mr-32 mt-3">
                <TrashTable datas={getDataForTable()} />
            </div>
        </div>
    );
}


const mapStateToProps = (state) => {
    return {
        reviewing: state.reviewing,
        trash: state.recycleBin,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setTrash: (data) => dispatch(setTrash(data)),
        restoreTrash: (data) => dispatch(restoreTrash(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Trash);
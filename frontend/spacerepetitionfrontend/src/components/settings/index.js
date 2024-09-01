import {Box, IconButton, useTheme} from "@mui/material";
import { tokens } from "../../theme";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPlus } from "@fortawesome/free-solid-svg-icons";

const Settings = () => {

    function handleToggleDownEffect(id) {
        const triangle = document.querySelector(id);
        triangle.classList.toggle('down');
    }

    return (
        <div className = "">
            <div className = "flex flex-row topbar">
                <div>
                    <span className = "text-3xl">Cài đặt</span>
                </div>
            </div>

            <div className = "interval-settings mt-5 ml-2">
                <div className="w-[140px] flex flex-row justify-between">
                    <div id = "interval-title" className = "inline rotate-triangle">
                        <FontAwesomeIcon icon={faPlay} onClick = {()=>handleToggleDownEffect("#interval-title")} />
                    </div>
                    <span>Thời gian ôn tập</span>


                </div>
                <div className = "mx-8 my-2">
                    <div className="w-[140px] flex flex-row justify-between">
                        <div id = "interval-..." className = "inline rotate-triangle">
                            <FontAwesomeIcon icon={faPlay} onClick = {()=>handleToggleDownEffect("#interval-...")} />
                        </div>
                        <span>{}</span>
                    </div>

                    <div className = "chart">

                    </div>

                    <div id = "interval-content" className = "hsidden">
                        <div className = "flex-row justify-between">
                            <div className = "flex items-center justify-between w-40"> 
                                <FontAwesomeIcon icon={faPlus} />
                                <span>Thêm mốc thời gian</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className = "appearance-settings">

            </div>
        </div>
    );
};

export default Settings;
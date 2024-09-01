import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { set } from "react-datepicker/dist/date_utils";
export const Dropdown = ({ options, selected, onSelectedChange, color, idValue }) => {
    // useEffect(() => {
    //     // Hàm xử lý sự kiện khi click vào một phần tử
    //     const handleClick = (event) => {
    //       // Lấy danh sách class của phần tử được click
    //       const elementClasses = event.target.className;
    //       console.log(`Tôi đang click vào phần tử có class: ${elementClasses}`);
    //     };

    //     // Thêm event listener cho sự kiện click vào document
    //     document.addEventListener('click', handleClick);

    //     // Dọn dẹp event listener khi component unmount
    //     return () => {
    //       document.removeEventListener('click', handleClick);
    //     };
    //   }, []);
    const [show, setShow] = useState(false);
    function handleShow() {
        setShow(!show);
    }
    const buttonClasses =
        color === "blue"
            ? "text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            : "text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-gray-400 dark:hover:bg-gray-500 dark:focus:ring-gray-600";
    return (
        <div>
            <button
                id="dropdownDefaultButton"
                data-dropdown-toggle="dropdown"
                class={buttonClasses}
                type="button"
                onClick={() => handleShow()}
            >
                {selected.name}
                <svg
                    class="w-2.5 h-2.5 ms-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                >
                    <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 1 4 4 4-4"
                    />
                </svg>
            </button>
            {show && (
                <div
                    id="dropdown"
                    class="z-50 absolute secondary-bg divide-y divide-gray-100 rounded-lg shadow w-44"
                >
                    <ul
                        class="py-2 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="dropdownDefaultButton"
                    >

                        {options.map((option) => {
                            return (
                                <li>
                                    <span
                                        class="block px-4 py-2 hover:bg-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                                        onClick={() => {
                                            onSelectedChange(idValue, option);
                                            setShow(false);
                                        }}
                                    >
                                        {option.name}
                                    </span>
                                </li>
                            );
                        })}

                        {/* <li>
                            <span class="block px-4 py-2 hover:bg-gray-300 dark:hover:bg-gray-600 dark:hover:text-white">
                                Dashboard
                            </span>
                        </li> */}
                    </ul>
                </div>
            )}
        </div>
    );
};
export const DropdownType1 = ({ options, selected, onSelectedChange, color }) => {
    // useEffect(() => {
    //     // Hàm xử lý sự kiện khi click vào một phần tử
    //     const handleClick = (event) => {
    //       // Lấy danh sách class của phần tử được click
    //       const elementClasses = event.target.className;
    //       console.log(`Tôi đang click vào phần tử có class: ${elementClasses}`);
    //     };

    //     // Thêm event listener cho sự kiện click vào document
    //     document.addEventListener('click', handleClick);

    //     // Dọn dẹp event listener khi component unmount
    //     return () => {
    //       document.removeEventListener('click', handleClick);
    //     };
    //   }, []);
    const [show, setShow] = useState(false);
    function handleShow() {
        setShow(!show);
    }
    const buttonClasses =
        color === "blue"
            ? "text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            : "text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-gray-400 dark:hover:bg-gray-500 dark:focus:ring-gray-600";
    return (
        <div>
            <button
                id="dropdownDefaultButton"
                data-dropdown-toggle="dropdown"
                class={buttonClasses}
                type="button"
                onClick={() => handleShow()}
            >
                {selected.name}
                <svg
                    class="w-2.5 h-2.5 ms-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                >
                    <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 1 4 4 4-4"
                    />
                </svg>
            </button>
            {show && (
                <div
                    id="dropdown"
                    class="z-50 absolute secondary-bg divide-y divide-gray-100 rounded-lg shadow w-44"
                >
                    <ul
                        class="py-2 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="dropdownDefaultButton"
                    >

                        {options.map((option) => {
                            return (
                                <li>
                                    <span
                                        class="block px-4 py-2 hover:bg-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                                        onClick={() => {
                                            onSelectedChange(option);
                                            setShow(false);
                                        }}
                                    >
                                        {option.name}
                                    </span>
                                </li>
                            );
                        })}

                        {/* <li>
                            <span class="block px-4 py-2 hover:bg-gray-300 dark:hover:bg-gray-600 dark:hover:text-white">
                                Dashboard
                            </span>
                        </li> */}
                    </ul>
                </div>
            )}
        </div>
    );
};
export const SearchBar = ({handleSearch}) => {
    const [searchText, setSearchText] = useState("");
    function handleSearchText(e) {
        e.preventDefault();
        handleSearch(searchText);
    }

    return (
        <div>
            <form class="flex items-center max-w-sm mx-auto" onSubmit={(e) => handleSearchText(e)}>
                <label for="simple-search" class="sr-only">
                    Search
                </label>
                <div class="relative w-full">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg
                            class="w-4 h-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                        </svg>
                    </div>
                    <input
                        type="text"
                        id="simple-search"
                        class="card-color text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-1  dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search branch name..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    class="p-1 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="20"
                        height="20"
                        viewBox="0 0 50 50"
                    >
                        <path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"></path>
                    </svg>
                    <span class="sr-only" onClick = { (e) =>handleSearchText(e)}>Search</span>
                </button>
            </form>
        </div>
    );
};

export const DifficultyDropdown = ({onSelectedChange, itemId}) => {
    const intervals = useSelector((state) => state.settings.intervalTemplate);
    const selectedId = useSelector((state) => state.settings.settings.intervalTemplateId);
    const selectedTemp = intervals.find((interval) => interval.id === selectedId);
    var selectedInterval = {
        id: selectedTemp.id,
        name: selectedTemp.name,
    }

    return (
        <Dropdown
            idValue={itemId}
            options={intervals}
            selected={selectedInterval}
            onSelectedChange={onSelectedChange}
            color="gray"
        />
    );
}

export const ConfirmDiv = ({ confirmText, onConfirm, onCancel, onClose }) => {
    const [isClosed, setIsClosed] = useState(false);

    if (isClosed) return null;

    return (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-3/12 h-1/5 bg-slate-700 rounded-xl p-4 flex flex-col items-center justify-between">
                <FontAwesomeIcon icon={faXmark} className="self-end cursor-pointer" onClick={() => {setIsClosed(true); onClose()}} />
                <span className="text-white mb-4">{confirmText}</span>
                <div className="flex space-x-4">
                    <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded" onClick={() => { onConfirm(); setIsClosed(true); }}>Yes</button>
                    <button className="bg-red-500 text-white font-bold py-2 px-4 rounded" onClick={() => { onCancel(); setIsClosed(true); }}>No</button>
                </div>
            </div>
        </div>
    );
};
import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";

const newTheme = (theme) =>
    createTheme({
        ...theme,
        components: {
            MuiDateCalendar: {
                styleOverrides: {
                    root: {
                        color: "#bbdefb",
                        borderRadius: "2px",
                        borderWidth: "1px",
                        borderColor: "#2196f3",
                        border: "1px solid",
                    },
                },
            },
        },
    });

export default function DatePickerValue({ onChangeDate, date}) {
    const [value, setValue] = React.useState(dayjs(date));

    return (
        // <ThemeProvider theme={newTheme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                    {/* <DatePicker label="Uncontrolled picker" defaultValue={dayjs('2022-04-17')} /> */}
                    <DatePicker
                        label="Chọn ngày"
                        format="DD/MM/YYYY"
                        value={value}
                        onChange={(newValue) => onChangeDate(newValue)}
                    />
                </DemoContainer>
            </LocalizationProvider>
        // </ThemeProvider>
    );
}

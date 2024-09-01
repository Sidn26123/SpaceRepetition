export function getCurrentDateFormatted() {
    const today = new Date(); // Lấy ngày tháng hiện tại

    const day = String(today.getDate()).padStart(2, "0"); // Lấy ngày và đảm bảo có 2 chữ số
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Lấy tháng (tháng bắt đầu từ 0 nên cần +1) và đảm bảo có 2 chữ số
    const year = today.getFullYear(); // Lấy năm

    return `${day}/${month}/${year}`; // Trả về chuỗi theo định dạng "dd/mm/yyyy"
}
export function getCurrentDateInputFormatted(today) {
    const day = String(today.getDate()).padStart(2, "0"); // Lấy ngày và đảm bảo có 2 chữ số
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Lấy tháng (tháng bắt đầu từ 0 nên cần +1) và đảm bảo có 2 chữ số
    const year = today.getFullYear(); // Lấy năm

    return `${day}/${month}/${year}`; // Trả về chuỗi theo định dạng "dd/mm/yyyy"
}

export function getCurrentDateWithFormat(format) {
    const today = new Date(); // Lấy ngày tháng hiện tại

    const day = String(today.getDate()).padStart(2, "0"); // Lấy ngày và đảm bảo có 2 chữ số
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Lấy tháng (tháng bắt đầu từ 0 nên cần +1) và đảm bảo có 2 chữ số
    const year = today.getFullYear(); // Lấy năm

    return format.replace("dd", day).replace("mm", month).replace("yyyy", year); // Trả về chuỗi theo định dạng format
}
export function formatDateString(date_str, des_format) {
    // Parse the date string into a Date object
    const date = new Date(date_str);

    // Extract date components
    const day = String(date.getDate()).padStart(2, "0"); // Day of the month (01-31)
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month (01-12)
    const year = date.getFullYear(); // Full year (e.g., 2024)

    // Replace placeholders in the desired format with actual values
    return des_format.replace("dd", day).replace("mm", month).replace("yyyy", year);
}

export function calDateBetweenTwoDate(date1, date2, format = "yyyy-mm-dd") {
    //date1 and date2 are in the format "yyyy-mm-dd"
    date1 = formatDateString(date1, "yyyy-mm-dd");
    date2 = formatDateString(date2, "yyyy-mm-dd");

    // Parse the date strings into Date objects
    const date1_obj = new Date(date1);
    const date2_obj = new Date(date2);

    // Calculate the difference in milliseconds
    const diff = date2_obj - date1_obj;

    // Convert the difference to days
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
}


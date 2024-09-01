export const learningTableStructure = {
    header_name: ["Nội dung", "Loại"],
    header_id: ["id", "content", "interval"], //cột id cuối sẽ là id để render trong react, không hiển thị trong table
}

export const reviewingTableStructure = {
    header_name: ["Nội dung", "Trạng thái", "Lần"],
    header_id: ["id", "study_content", "is_learned", "count"], //cột id cuối sẽ là id để render trong react, không hiển thị trong table
}

export const trashTableStructure = {
    header_name: ["Nội dung", "Ngày xoá", "Phục hồi"],
    header_id: ["id", "study_id", "created_at", "restore"], //cột id cuối sẽ là id để render trong react, không hiển thị trong table
}
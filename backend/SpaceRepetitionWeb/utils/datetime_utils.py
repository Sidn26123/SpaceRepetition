from django.conf import settings
import datetime
import pytz

def convert_str_to_utc_plus_7(input_string, timezone = settings.TIME_ZONE):
    # Định dạng của ngày/tháng/năm trong chuỗi
    date_format = '%d/%m/%Y'

    # Chuyển đổi chuỗi thành đối tượng datetime
    input_datetime = datetime.datetime.strptime(input_string, date_format)
    # input_datetime = datetime.strptime(input_string, date_format)
    current_datetime = datetime.datetime.now()

# Cập nhật giờ, phút và giây của input_datetime thành giờ, phút và giây của thời gian hiện tại
    input_datetime = input_datetime.replace(hour=current_datetime.hour, minute=current_datetime.minute, second=current_datetime.second)
    # Định nghĩa múi giờ UTC+7
    utc_plus_7 = pytz.timezone(timezone)
    # Áp dụng thông tin múi giờ cho đối tượng datetime
    input_datetime_with_tz = utc_plus_7.localize(input_datetime)

    return input_datetime_with_tz

from django.utils import timezone

def convert_datetime_to_timezone(datetime_field, target_timezone):
    # Kiểm tra xem datetime_field có tồn tại không
    if datetime_field:
        # Chuyển đổi datetime_field sang múi giờ UTC
        utc_time = timezone.localtime(datetime_field)
        
        # Chuyển đổi múi giờ từ UTC sang target_timezone
        target_tz = pytz.timezone(target_timezone)
        target_time = utc_time.astimezone(target_tz)
        
        return target_time
    else:
        return None

from dateutil import parser
from datetime import datetime

def convert_date_to_standard_format(date_input: str, format: str) -> str:
    try:
        # Tự động nhận diện và phân tích ngày tháng
        parsed_date = parser.parse(date_input)

        # Chuyển đổi thành định dạng dd/mm/YYYY
        standard_date_format = parsed_date.strftime(format)

        date_output = datetime.strptime(standard_date_format, format)
        return date_output
    except ValueError:
        return "Invalid date format"
def convert_date_to_standard_format(date_input: str, input_format: str, output_format: str) -> str:
    try:
        parsed_date = datetime.strptime(date_input, input_format)

        # Chuyển đổi thành định dạng dd/mm/YYYY
        standard_date_format = parsed_date.strftime(output_format)
        return standard_date_format
    except ValueError:
        return "Invalid date format"
    
def convert_date_to_sql_format(date_input: str) -> str:
    return convert_date_to_standard_format(date_input, '%Y-%m-%d')

def start_date(date_input: str) -> str:
    return date_input.split(' ')[0] + ' 00:00:00'

def end_date(date_input: str) -> str:
    return date_input.split(' ')[0] + ' 23:59:59'

def get_current_date_and_format(format:str):
    return datetime.now().strftime(format)

from datetime import datetime, timedelta

def generate_date_pairs(start_date_str, end_date_str, count, landmark='end'):
    # Chuyển đổi chuỗi ngày tháng thành đối tượng datetime
    start_date = datetime.strptime(start_date_str, '%d/%m/%Y')
    end_date = datetime.strptime(end_date_str, '%d/%m/%Y')

    # Tính toán số ngày giữa start_date và end_date
    total_days = (end_date - start_date).days
    if total_days < count - 1:
        raise ValueError("Khoảng thời gian giữa ngày bắt đầu và kết thúc không đủ để chia thành số cặp yêu cầu.")

    # Tính toán số ngày mỗi cặp
    days_per_pair = total_days // count
    remainder_days = total_days % count

    date_pairs = []
    current_start_date = start_date

    for i in range(count):
        # Tính toán ngày kết thúc cho cặp hiện tại
        current_end_date = current_start_date + timedelta(days=days_per_pair -1 )

        # Xử lý số ngày dư
        if remainder_days > 0:
            if landmark == 'end' and i == count - 1:
                current_end_date += timedelta(days=remainder_days)
            elif landmark == 'start' and i == 0:
                current_end_date += timedelta(days=remainder_days)
            remainder_days -= 1

        # Thêm cặp ngày vào danh sách
        date_pairs.append((current_start_date.strftime('%d/%m/%Y'), current_end_date.strftime('%d/%m/%Y')))

        # Cập nhật ngày bắt đầu cho cặp tiếp theo
        current_start_date = current_end_date + timedelta(days=1)
        
    if date_pairs[-1][1] != end_date_str:
        date_pairs[-1] = (date_pairs[-1][0], end_date_str)
    return date_pairs

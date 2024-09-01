import re

def is_valid_username(username):
    """
    Kiểm tra tính hợp lệ của username.

    Tiêu chuẩn:
    - Chỉ chứa các ký tự chữ cái (a-z, A-Z), số (0-9), dấu gạch dưới (_), hoặc dấu chấm (.).
    - Bắt đầu và kết thúc bằng một ký tự chữ hoặc số.
    - Độ dài từ 3 đến 30 ký tự.

    Args:
        username (str): Username cần kiểm tra.

    Returns:
        bool: True nếu username hợp lệ, ngược lại False.
    """
    # Định nghĩa biểu thức chính quy (regex) để kiểm tra username
    pattern = r'^[a-zA-Z0-9]([._]?[a-zA-Z0-9]+)*$'
    
    # Kiểm tra độ dài của username
    if len(username) < 3 or len(username) > 30:
        return False
    
    # Kiểm tra tính hợp lệ của username bằng regex
    if re.match(pattern, username):
        return True
    else:
        return False

def is_valid_password(value):
    # Định nghĩa các ký tự không được phép
    forbidden_characters = ['$', '@', '#', '%']
    # Kiểm tra xem mật khẩu có chứa bất kỳ ký tự không được phép nào không
    if any(char in value for char in forbidden_characters):
        return False
    return True


def is_valid_filename(filename):
    """
    Kiểm tra tính hợp lệ của tên file.

    Tiêu chuẩn:
    - Chỉ chứa các ký tự chữ cái (a-z, A-Z), số (0-9), dấu gạch dưới (_), dấu gạch ngang (-), hoặc dấu chấm (.).
    - Không bắt đầu hoặc kết thúc bằng dấu chấm (.), dấu gạch dưới (_), hoặc dấu gạch ngang (-).
    - Không chứa các ký tự không hợp lệ như: <>:"/\|?*
    - Độ dài từ 1 đến 255 ký tự.

    Args:
        filename (str): Tên file cần kiểm tra.

    Returns:
        bool: True nếu tên file hợp lệ, ngược lại False.
    """
    # Định nghĩa các ký tự không hợp lệ
    forbidden_characters = r'[<>:"/\\|?*]'
    
    # Kiểm tra các ký tự không hợp lệ
    if re.search(forbidden_characters, filename):
        return False

    # Định nghĩa biểu thức chính quy (regex) để kiểm tra tên file
    pattern = r'^[a-zA-Z0-9][a-zA-Z0-9._-]{0,253}[a-zA-Z0-9]$'
    
    # Kiểm tra độ dài của tên file
    if len(filename) < 1 or len(filename) > 255:
        return False
    
    # Kiểm tra tính hợp lệ của tên file bằng regex
    if re.match(pattern, filename):
        return True
    else:
        return False
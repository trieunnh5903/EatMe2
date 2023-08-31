function isValidPhoneNumber(value) {
    const phoneRegex = /^0\d{9}$/;
    return phoneRegex.test(String(value).toLowerCase());
}

function validatePhoneNumber(value, setPhoneNumberError) {
    if (value == "") {
        setPhoneNumberError("")
    }
    else if (isValidPhoneNumber(value)) {
        setPhoneNumberError("")
    }
    else {
        setPhoneNumberError("Số điện thoại không đúng")
    }
}

function validatePassword(value, setPasswordError) {
    if (value.length > 0 && value.length < 9) {
        setPasswordError("Mật khẩu nhiều hơn 9 ký tự")
    } else {
        setPasswordError("")
    }
}

function validateFullName(value, setFullNameError) {
    if (!value.length > 0) {
        setFullNameError("Tên không để trống")
    } else {
        setFullNameError("")
    }
}

const validate = {
    validatePhoneNumber,
    validatePassword,
    validateFullName
};

export default validate;
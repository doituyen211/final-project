package org.green.core.constant;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

public class Validator {

    // Kiểm tra xem chuỗi có phải là email hợp lệ không
    public static boolean isValidEmail(String email) {
        String emailRegex = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";
        return email != null && email.matches(emailRegex);
    }

    // Kiểm tra xem chuỗi có phải là số điện thoại hợp lệ không
    public static boolean isValidPhoneNumber(String phoneNumber) {
        String phoneRegex = "^\\d{10}$"; // Giả sử số điện thoại là 10 chữ số
        return phoneNumber != null && phoneNumber.matches(phoneRegex);
    }

    // Chuyển đổi LocalDate hoặc LocalDateTime thành định dạng DD/MM/YYYY
    public static String convertToDate(String dateTimeStr) {
        // Định dạng đầu ra mong muốn
        DateTimeFormatter outputFormatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");

        try {
            // Kiểm tra nếu chuỗi là LocalDateTime
            if (dateTimeStr.contains("T")) {
                DateTimeFormatter inputFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");
                LocalDateTime localDateTime = LocalDateTime.parse(dateTimeStr, inputFormatter);
                return localDateTime.format(outputFormatter);
            }
            // Trường hợp chuỗi là LocalDate
            else {
                DateTimeFormatter inputFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
                LocalDate localDate = LocalDate.parse(dateTimeStr, inputFormatter);
                return localDate.format(outputFormatter);
            }
        } catch (DateTimeParseException e) {
            // Trả về thông báo lỗi nếu định dạng không hợp lệ
            return "Error: Invalid date format";
        }
    }

    // Kiểm tra xem chuỗi có phải là số nguyên hợp lệ không
    public static boolean isValidInteger(String str) {
        try {
            Integer.parseInt(str);
            return true;
        } catch (NumberFormatException e) {
            return false;
        }
    }

    // Kiểm tra xem chuỗi có phải là số thực hợp lệ không
    public static boolean isValidDouble(String str) {
        try {
            Double.parseDouble(str);
            return true;
        } catch (NumberFormatException e) {
            return false;
        }
    }

    // Kiểm tra xem chuỗi không được null và không rỗng
    public static boolean isNotNullOrEmpty(String str) {
        return str != null && !str.trim().isEmpty();
    }

    // Kiểm tra độ dài của một chuỗi có nằm trong khoảng hợp lệ không
    public static boolean isValidLength(String str, int min, int max) {
        return str != null && str.length() >= min && str.length() <= max;
    }


    // Kiểm tra xem chuỗi có phải là tên người dùng hợp lệ không (chỉ chứa chữ cái, số và dấu gạch dưới)
    public static boolean isValidUsername(String username) {
        String usernameRegex = "^[a-zA-Z0-9_]{5,20}$"; // Ví dụ: từ 5 đến 20 ký tự
        return username != null && username.matches(usernameRegex);
    }

    // Kiểm tra xem chuỗi có phải là tên hợp lệ không (chứa chữ cái, ký tự có dấu và khoảng trắng)
    // sử dụng \p{L}
    public static boolean isValidName(String name) {
        String nameRegex = "^[\\p{L}\\s]+$";
        return name != null && name.matches(nameRegex);
    }

    // Kiểm tra xem chuỗi có phải là số chứng minh nhân dân (CMND) hợp lệ không
    public static boolean isValidIDCard(String idCard) {
        String idCardRegex = "^\\d{9}$|^\\d{12}$";
        return idCard != null && idCard.matches(idCardRegex);
    }

    // Kiểm tra xem chuỗi có phải là địa chỉ hợp lệ không (chứa ít nhất số và tên đường)
    public static boolean isValidAddress(String address) {
        String addressRegex = "^\\d+\\s+[a-zA-Z]+.*$"; // Ví dụ: "123 Main St"
        return address != null && address.matches(addressRegex);
    }




}

package org.green.education.form;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public class ExamScheduleForm {

    @NotNull(message = "class Field không thể rỗng")
    @Size(min = 1, message = "class Field không được để trống")
    private String classField;

    @NotNull(message = "subject không thể rỗng")
    @Size(min = 1, message = "subject không được để troongs")
    private String subject;

    @NotNull(message = "examDate không thể rỗng")
    @Future(message = "examDate phải là tương lai")
    private LocalDate examDate;

    @NotNull(message = "examLink không thể rỗng")
    @Pattern(regexp = "^(http|https)://.*$", message = "Examlink phải là URL hợp lệ")
    private String examLink;

    @NotNull(message = "status không thể rỗng")
    private Boolean status;

    public String getClassField() {
        return classField;
    }

    public void setClassField( String classField) {
        this.classField = classField;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject( String subject) {
        this.subject = subject;
    }

    public LocalDate getExamDate() {
        return examDate;
    }

    public void setExamDate( LocalDate examDate) {
        this.examDate = examDate;
    }

    public String getExamLink() {
        return examLink;
    }

    public void setExamLink( String examLink) {
        this.examLink = examLink;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "ExamScheduleForm{" +
                "classField='" + classField + '\'' +
                ", subject='" + subject + '\'' +
                ", examDate=" + examDate +
                ", examLink='" + examLink + '\'' +
                ", status='" + status + '\'' +
                '}';
    }
}

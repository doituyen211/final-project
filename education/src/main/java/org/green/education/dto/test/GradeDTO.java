package org.green.education.dto.test;

import java.time.LocalDate;

public class GradeDTO {
    private Integer gradeId;
    private String studentName;
    private String grade;
    private LocalDate examDate;
    private String subjectName;
    private String programName;
    private String courseName;
    private String status;

    public GradeDTO(Integer gradeId, String studentName, String grade, LocalDate examDate,
                    String subjectName, String programName, String courseName, String status) {
        this.gradeId = gradeId;
        this.studentName = studentName;
        this.grade = grade;
        this.examDate = examDate;
        this.subjectName = subjectName;
        this.programName = programName;
        this.courseName = courseName;
        this.status = status;
    }

    public Integer getGradeId() {
        return gradeId;
    }

    public void setGradeId(Integer gradeId) {
        this.gradeId = gradeId;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getGrade() {
        return grade;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }

    public LocalDate getExamDate() {
        return examDate;
    }

    public void setExamDate(LocalDate examDate) {
        this.examDate = examDate;
    }

    public String getSubjectName() {
        return subjectName;
    }

    public void setSubjectName(String subjectName) {
        this.subjectName = subjectName;
    }

    public String getProgramName() {
        return programName;
    }

    public void setProgramName(String programName) {
        this.programName = programName;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }


}

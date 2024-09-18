import {Modal, Button} from "react-bootstrap";
import FormInput from "../FormInputComponents";
import {useState, useEffect} from "react";
import DropDownComponent from "../DropDownComponent";
import {getAllClasses, getSubjectByClassId} from "../../controllers/ExamController";

const ModalExamComponent = ({
                                show,
                                handleClose,
                                title,
                                titleButton,
                                action,
                                examData = {},
                                mode = "create", // create, view, edit
                            }) => {
    const [formData, setFormData] = useState({
        subject: null,
        classField: null,
        examDate: "",
        examLink: "",
    });

    const [subjects, setSubjects] = useState([]);
    const [cls, setCls] = useState([]);
    const [selectedClassId, setSelectedClassId] = useState(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const loadClasses = async () => {
            try {
                const classes = await getAllClasses();
                console.log("Received classes data:", classes);

                if (Array.isArray(classes)) {
                    setCls(classes.map(cls => ({id: cls.id, label: cls.className})));
                } else {
                    console.error("Unexpected data format", classes);
                }
            } catch (error) {
                console.error("Error fetching subjects or classes", error);
            }
        };

        loadClasses();
    }, []);

    // Load subjects when class is selected
    useEffect(() => {
        const loadSubjects = async (classId) => {
            if (classId) {
                try {
                    const subjects = await getSubjectByClassId(classId);
                    console.log("Received subjects data:", subjects);

                    if (Array.isArray(subjects)) {
                        setSubjects(subjects.map(subject => ({id: subject.subject_id, label: subject.subject_name})));
                    } else {
                        console.error("Unexpected data format", subjects);
                    }
                } catch (error) {
                    console.error("Error fetching subjects", error);
                }
            }
        };

        // Call loadSubjects when selectedClassId changes
        if (selectedClassId) {
            loadSubjects(selectedClassId);
        }
    }, [selectedClassId]);

    useEffect(() => {
        if (mode === "edit" || mode === "view") {
            setFormData({
                subject: examData.subject ? {id: null, label: examData.subject} : null,
                classField: examData.classField ? {id: null, label: examData.classField} : null,
                examDate: examData.examDate || "",
                examLink: examData.examLink || "",
            });

            // Set selectedClassId if classField exists
            const selectedClass = cls.find(c => c.label === examData.classField);
            if (selectedClass) {
                setSelectedClassId(selectedClass.id);
            }
        } else {
            setFormData({
                subject: null,
                classField: null,
                examDate: "",
                examLink: "",
            });
            setSelectedClassId(null);
        }
    }, [examData, mode, cls]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleClassSelect = (item) => {
        setSelectedClassId(item.id);
        setFormData(prevData => ({...prevData, classField: item}));
    };

    const handleSubjectSelect = (item) => {
        setFormData(prevData => ({...prevData, subject: item}));
    };

    // Validate form data
    const validateFormData = () => {
        const newErrors = {};

        if (!formData.classField) {
            newErrors.classField = "Vui lòng chọn lớp học!";
        }

        if (!formData.subject) {
            newErrors.subject = "Vui lòng chọn môn học!";
        }

        if (!formData.examDate) {
            newErrors.examDate = "Vui lòng chọn thời gian!";
        }

        if (!formData.examLink) {
            newErrors.examLink = "Vui lòng nhập link bài thi!";
        } else if (!isValidURL(formData.examLink)) {
            newErrors.examLink = "Link không hợp lệ!";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Check if URL is valid
    const isValidURL = (url) => {
        const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
            '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return !!pattern.test(url);
    };

    const handleAction = () => {
        if (validateFormData()) {
            if (action) action({
                ...formData,
                subject: formData.subject ? formData.subject.label : null,
                classField: formData.classField ? formData.classField.label : null,
            });
            handleClose();
        }
    };

    console.log("Check class", cls);
    console.log("Check subjects", subjects);
    console.log("FormData", formData);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="d-flex justify-content-between">
                    <DropDownComponent
                        title={"Chọn Lớp Học"}
                        label={"Lớp Học"}
                        mode={mode}
                        data={cls}
                        defaultValue={formData.classField ? formData.classField.label : null}
                        onSelect={handleClassSelect}
                        error={errors.classField}
                    />
                    <DropDownComponent
                        title={"Chọn Môn Học"}
                        label={"Môn Học"}
                        mode={mode}
                        data={subjects}
                        defaultValue={formData.subject ? formData.subject.label : null}
                        onSelect={handleSubjectSelect}
                        error={errors.subject}
                    />
                </div>
                <FormInput
                    label="Thời gian"
                    name="examDate"
                    type="date"
                    value={formData.examDate}
                    onChange={handleChange}
                    disabled={mode === "view"}
                    error={errors.examDate}
                />
                <FormInput
                    label="Link bài thi"
                    name="examLink"
                    value={formData.examLink}
                    onChange={handleChange}
                    disabled={mode === "view"}
                    error={errors.examLink}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                {mode !== "view" && (
                    <Button variant="primary" onClick={handleAction}>
                        {titleButton}
                    </Button>
                )}
            </Modal.Footer>
        </Modal>
    );
};

export default ModalExamComponent;

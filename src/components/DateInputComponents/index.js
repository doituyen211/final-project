import Form from 'react-bootstrap/Form';

function DateInputComponent(props) {
    return (
        <>
            <Form>
                    <Form.Control
                        type="date"
                        id="date"
                        className="border-dark"
                    />
            </Form>
        </>
    );
}

export default DateInputComponent;
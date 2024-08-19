import Dropdown from 'react-bootstrap/Dropdown';

function DropDownComponent(props){
    const {title} = props;
    return (
        <Dropdown>
            <Dropdown.Toggle variant="outline-dark" id="dropdown-basic">
                {title}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default DropDownComponent;
# Nhóm 1 Education

## SubjectComponent

### Biến State

- **dataTable**: Lưu danh sách các môn học.
- **titleTable**: Tiêu đề cho bảng.
- **classTable**: Các lớp CSS để định dạng bảng.
- **totalPage**: Tổng số trang cho phân trang.
- **isEdit**:  boolean xác định xem biểu mẫu có ở chế độ chỉnh sửa hay không.
- **isCurrent**: Lưu ID của môn học hiện tại để chỉnh sửa.
- **currentPage**: Số trang hiện tại cho phân trang.
- **modalShow**:  boolean để hiển thị/ẩn modal.

### API Endpoint

- **apiUpdate**: Endpoint để cập nhật môn học.
- **apiCreate**: Endpoint để tạo môn học mới.

### Trường Biểu Mẫu

- **formFieldsProp**: Cấu hình cho các trường biểu mẫu bao gồm tên, thời gian, tên chương trình, và trạng thái.

### Cột

- **cols**: Mảng định nghĩa tiêu đề cột bảng.

### Hàm

- **getData**: Lấy dữ liệu từ API.
- **handlePageChange**: Cập nhật số trang hiện tại.
- **handleSave**: Xử lý logic lưu cho biểu mẫu modal.
- **handleSubmit**: Xử lý gửi biểu mẫu để tạo hoặc cập nhật môn học.
- **handleSearch**: Hàm placeholder cho chức năng tìm kiếm.

# 1.TableComponents

`TableComponents` là một thành phần React để hiển thị bảng với các cột, tiêu đề và dữ liệu có thể tùy chỉnh. Nó cũng bao
gồm các nút hành động để xem, chỉnh sửa và xóa các hàng.

## Props

### `cols`

- **Loại**: `Array<string>`
- **Mô tả**: Một mảng các tiêu đề cột để hiển thị trong bảng. Mỗi mục trong mảng đại diện cho tiêu đề của một cột.

### `titleTable`

- **Loại**: `string`
- **Mô tả**: Tiêu đề được hiển thị phía trên bảng.

### `dataTable`

- **Loại**: `Array<Object>`
- **Mô tả**: Một mảng các đối tượng, mỗi đối tượng đại diện cho một hàng trong bảng. Các khóa của đối tượng tương ứng
  với tiêu đề cột.

### `classTable`

- **Loại**: `string`
- **Mô tả**: Một chuỗi các lớp CSS để áp dụng cho bảng nhằm mục đích định dạng.

## Ví dụ Sử Dụng

```jsx
import React from 'react';
import TableComponents from './TableComponents';

const columns = ['Tên', 'Tuổi', 'Email'];
const data = [
    {name: 'John Doe', age: 28, email: 'john.doe@example.com'},
    {name: 'Jane Smith', age: 34, email: 'jane.smith@example.com'},
];

function App() {
    return (
        <TableComponents
            cols={columns}
            titleTable="Thông Tin Người Dùng"
            dataTable={data}
            classTable="table table-striped"
        />
    );
}

export default App;

```

# FormComponent

`FormComponent` là một thành phần React dùng để hiển thị một biểu mẫu động với nhiều loại trường khác nhau như văn bản,
chọn, ngày và số. Thành phần này cũng hỗ trợ chức năng chỉnh sửa và lưu dữ liệu từ API.

## Props

### `fields`

- **Loại**: `Array<Object>`
- **Mô tả**: Mảng các đối tượng định nghĩa các trường của biểu mẫu. Mỗi đối tượng có các thuộc tính sau:
    - `name`: Tên trường (string).
    - `type`: Loại trường, có thể là `'text'`, `'select'`, `'date'`, hoặc `'number'` (string).
    - `label`: Nhãn của trường (string).
    - `placeholder`: Văn bản gợi ý cho trường (string, tùy chọn).
    - `apiUrl`: URL API để lấy dữ liệu cho trường chọn (string, tùy chọn).
    - `defaultOption`: Tùy chọn mặc định cho trường chọn (object, tùy chọn), có các thuộc tính:
        - `value`: Giá trị của tùy chọn mặc định (string).
        - `label`: Nhãn của tùy chọn mặc định (string, tùy chọn).

### `onSubmit`

- **Loại**: `function`
- **Mô tả**: Hàm được gọi khi biểu mẫu được gửi. Nhận tham số là dữ liệu của biểu mẫu.

### `isEdit`

- **Loại**: `boolean`
- **Mô tả**: Xác định xem biểu mẫu có ở chế độ chỉnh sửa hay không.

### `idCurrent`

- **Loại**: `string | number`
- **Mô tả**: ID của mục hiện tại để chỉnh sửa. Tùy chọn nếu `isEdit` là `true`.

### `onSave`

- **Loại**: `function`
- **Mô tả**: Hàm được gọi để lưu dữ liệu của biểu mẫu. Nhận tham số là dữ liệu của biểu mẫu.

## Ví dụ Sử Dụng

```jsx
import React, {useState} from 'react';
import FormComponent from './FormComponent';

function App() {
    const [isEdit, setIsEdit] = useState(false);
    const [idCurrent, setIdCurrent] = useState(null);

    const fields = [
        {name: 'name', type: 'text', label: 'Name', placeholder: 'Enter your name'},
        {name: 'email', type: 'text', label: 'Email', placeholder: 'Enter your email'},
        {name: 'birthdate', type: 'date', label: 'Birthdate'},
        {name: 'age', type: 'number', label: 'Age', placeholder: 'Enter your age'},
        {
            name: 'country',
            type: 'select',
            label: 'Country',
            apiUrl: 'https://example.com/api/countries',
            defaultOption: {value: '', label: 'Select a country'}
        }
    ];

    const handleSubmit = (data) => {
        console.log('Submitted data:', data);
    };

    const handleSave = (data) => {
        console.log('Saved data:', data);
        // Xử lý lưu dữ liệu ở đây
    };

    return (
        <FormComponent
            fields={fields}
            onSubmit={handleSubmit}
            isEdit={isEdit}
            idCurrent={idCurrent}
            onSave={handleSave}
        />
    );
}

export default App;
```

# 2. PagingComponent

`PagingComponent` là một thành phần React để hiển thị phân trang với các nút điều hướng cho các trang. Nó sử
dụng `react-bootstrap` để tạo giao diện phân trang.

## Props

### `totalPage`

- **Loại**: `number`
- **Mô tả**: Tổng số trang cần phân trang.

### `currentPage`

- **Loại**: `number`
- **Mô tả**: Số trang hiện tại đang được hiển thị.

### `onPageChange`

- **Loại**: `function`
- **Mô tả**: Hàm được gọi khi người dùng thay đổi trang. Nhận tham số là số trang mới.

## Ví dụ Sử Dụng

```jsx
import React, {useState} from 'react';
import PagingComponent from './PagingComponent';

function App() {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 10;

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <PagingComponent
            totalPage={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
        />
    );
}

export default App;
```

# 3. ModalComponent

`ModalComponent` là một thành phần React để hiển thị modal (hộp thoại) với các chức năng lưu và đóng. Nó sử
dụng `react-bootstrap` để tạo giao diện modal.

## Props

### `children`

- **Loại**: `ReactNode`
- **Mô tả**: Nội dung của modal, thường là một biểu mẫu. `ref` của đối tượng `children` nên được chỉ định để truy cập
  phần tử biểu mẫu.

### `onHide`

- **Loại**: `function`
- **Mô tả**: Hàm được gọi khi modal bị đóng. Đây là sự kiện xử lý việc đóng modal.

### `show`

- **Loại**: `boolean`
- **Mô tả**: Xác định xem modal có hiển thị hay không.

### `onSave`

- **Loại**: `function`
- **Mô tả**: Hàm được gọi khi người dùng nhấn nút "Save Changes". Nhận tham số là dữ liệu biểu mẫu dưới dạng đối tượng.

## Ví dụ Sử Dụng

```jsx
import React, {useRef, useState} from 'react';
import ModalComponent from './ModalComponent';
import {Form} from 'react-bootstrap';

function App() {
    const [show, setShow] = useState(false);
    const formRef = useRef(null);

    const handleSave = (data) => {
        console.log('Saved data:', data);
        // Xử lý dữ liệu đã lưu ở đây
    };

    return (
        <>
            <Button variant="primary" onClick={() => setShow(true)}>Open Modal</Button>

            <ModalComponent
                show={show}
                onHide={() => setShow(false)}
                onSave={handleSave}
            >
                <Form ref={formRef}>
                    <Form.Group controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="name" placeholder="Enter your name"/>
                    </Form.Group>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" placeholder="Enter your email"/>
                    </Form.Group>
                </Form>
            </ModalComponent>
        </>
    );
}

export default App;
```

### Deployment

This section has moved
here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

import React, {useState} from 'react';

function ImportExcelForm(props) {
    const [progress, setProgress] = useState(0);
    const [fileSize, setFileSize] = useState(0);
    const [importSuccess, setImportSuccess] = useState(0);
    const [importErrors, setImportErrors] = useState(0);
    const [errorFileUrl, setErrorFileUrl] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        // Get file size in bytes
        setFileSize(file.size);

        const formData = new FormData();
        formData.append('file', file);

        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/upload', true); // Adjust the URL according to your backend endpoint

        // Update progress
        xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
                const percentComplete = (event.loaded / event.total) * 100;
                setProgress(percentComplete);
            }
        };

        xhr.onload = () => {
            if (xhr.status === 200) {
                // Assume the server responds with a JSON object containing success and error counts
                const response = JSON.parse(xhr.responseText);
                setImportSuccess(response.success); // Set successful import count
                setImportErrors(response.errors);   // Set error count
                setErrorFileUrl(response.errorFileUrl); // URL for the error file download
                setProgress(0); // Reset progress after successful upload
                setFileSize(0); // Reset file size after upload
            } else {
                // Handle error
                console.error('Upload failed:', xhr.statusText);
                setImportErrors(1); // Set error count if upload fails
                setErrorFileUrl(file); // URL for the error file download
                setImportSuccess(10); // Set successful import count
            }
        };

        xhr.send(formData);
    };

    return (
        <div className="container mt-4">

            <div className="d-flex justify-content-between mb-3">
                <label htmlFor="formFile" className="form-label">Tải lên file Excel</label>
                <a href="/path/to/sample-file.xlsx" className="link" download>
                    Tải file mẫu
                </a>
            </div>
            <input
                className="form-control"
                type="file"
                id="formFile"
                onChange={handleFileChange}
            />
            {fileSize > 0 && (
                <div className="mb-3">
                            <span
                                className="text-muted">File size: {Math.round(fileSize / 1024)} KB</span> {/* Convert bytes to KB */}
                </div>
            )}
            {progress > 0 && (
                <div className="progress mb-3">
                    <div
                        className="progress-bar bg-info"
                        role="progressbar"
                        style={{width: `${progress}%`}}
                        aria-valuenow={progress}
                        aria-valuemin="0"
                        aria-valuemax="100"
                    >
                        {Math.round(progress)}%
                    </div>
                </div>
            )}
            {importSuccess > 0 && (
                <div className="alert alert-success" role="alert">
                    <strong>Import successful!</strong> {importSuccess} rows imported.
                </div>
            )}
            {importErrors > 0 && (
                <div className="alert alert-danger" role="alert">
                    <strong>Import errors!</strong> {importErrors} rows failed to import.
                    {errorFileUrl && (
                        <div className="mt-2">
                            <a href={errorFileUrl} className="btn btn-warning" download>
                                Download Error File
                            </a>
                        </div>
                    )}
                </div>
            )}

        </div>
    );
}

export default ImportExcelForm;

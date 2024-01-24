import Alert from "react-bootstrap/Alert";

export default function SuccessMessage({successMessage}) {
    return (
        <div>
            {successMessage && (
                <Alert key="success" variant="success">
                    {successMessage}
                </Alert>
            )}
        </div>
    );
}

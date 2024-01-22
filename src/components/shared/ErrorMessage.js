import Alert from "react-bootstrap/Alert";

export default function ErrorMessage({errorMessage}) {
    return (
        <div>
            {errorMessage && (
                <Alert key="danger" variant="danger">
                    {errorMessage}
                </Alert>
            )}
        </div>
    );
}

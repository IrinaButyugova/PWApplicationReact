import Form from "react-bootstrap/Form";

export default function FormControl({labelText, type, min, max, value, isInvalid, onChange, errorMessage}) {
    return (
        <Form.Group className="mb-3">
            <Form.Label>{labelText}</Form.Label>
            <Form.Control type={type} min={min} max={max} value={value} isInvalid={isInvalid} onChange={onChange} />
            {errorMessage && <Form.Control.Feedback type="invalid">{errorMessage}</Form.Control.Feedback>}
        </Form.Group>
    );
}

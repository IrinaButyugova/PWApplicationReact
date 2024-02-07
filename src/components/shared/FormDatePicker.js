import Form from "react-bootstrap/Form";
import DatePicker from "react-datepicker";

export default function FormDatePicker({selected, onChange}) {
    return (
        <Form.Group className="mb-3">
            <Form.Label>Date from</Form.Label>
            <DatePicker className="form-control" selected={selected} dateFormat="dd.MM.yyyy" onChange={onChange} />
        </Form.Group>
    );
}

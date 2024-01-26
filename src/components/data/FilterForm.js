import {useState} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DatePicker from "react-datepicker";
import "./filterForm.css";

function FilterForm({handleFilter}) {
    const INIT_FILTER = {
        startDate: null,
        endDate: null,
        recipient: "",
        startAmount: "",
        endAmount: "",
    };
    const [filter, setFilter] = useState(INIT_FILTER);
    const dateFormat = "dd.MM.yyyy";

    const handleClean = () => {
        setFilter(INIT_FILTER);
        handleFilter(INIT_FILTER);
    };

    return (
        <Form>
            <Row>
                <Col sm="6">
                    <Form.Group className="mb-3">
                        <Form.Label>Date from</Form.Label>
                        <DatePicker
                            className="form-control"
                            selected={filter.startDate}
                            dateFormat={dateFormat}
                            onChange={(value) => setFilter({...filter, startDate: value})}
                        />
                    </Form.Group>
                </Col>
                <Col sm="6">
                    <Form.Group className="mb-3">
                        <Form.Label>Date To</Form.Label>
                        <DatePicker
                            className="form-control"
                            selected={filter.endDate}
                            dateFormat={dateFormat}
                            onChange={(value) => setFilter({...filter, endDate: value})}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col sm="6">
                    <Form.Group className="mb-3">
                        <Form.Label>Recipient</Form.Label>
                        <Form.Control
                            type="text"
                            value={filter.recipient}
                            onChange={(event) => setFilter({...filter, recipient: event.target.value})}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col sm="6">
                    <Form.Group className="mb-3">
                        <Form.Label>Amount from</Form.Label>
                        <Form.Control
                            type="number"
                            value={filter.startAmount}
                            onChange={(event) => setFilter({...filter, startAmount: event.target.value})}
                        />
                    </Form.Group>
                </Col>
                <Col sm="6">
                    <Form.Group>
                        <Form.Label>Amount To</Form.Label>
                        <Form.Control
                            type="number"
                            value={filter.endAmount}
                            onChange={(event) => setFilter({...filter, endAmount: event.target.value})}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col sm="6">
                    <Button variant="primary" onClick={() => handleFilter(filter)}>
                        Filter
                    </Button>
                    &nbsp;
                    <Button variant="primary" onClick={handleClean}>
                        Clean
                    </Button>
                </Col>
            </Row>
        </Form>
    );
}

export default FilterForm;

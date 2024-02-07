import {useState} from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FormControl from "../shared/FormControl";
import FormDatePicker from "../shared/FormDatePicker";
import PWButton from "../shared/PWButton";
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

    const handleClean = () => {
        setFilter(INIT_FILTER);
        handleFilter(INIT_FILTER);
    };

    return (
        <Form>
            <Row>
                <Col sm="6">
                    <FormDatePicker
                        selected={filter.startDate}
                        onChange={(value) => setFilter({...filter, startDate: value})}
                    />
                </Col>
                <Col sm="6">
                    <FormDatePicker
                        selected={filter.endDate}
                        onChange={(value) => setFilter({...filter, endDate: value})}
                    />
                </Col>
            </Row>
            <Row>
                <Col sm="6">
                    <FormControl
                        labelText={"Recipient"}
                        type="text"
                        value={filter.recipient}
                        onChange={(event) => setFilter({...filter, recipient: event.target.value})}
                    />
                </Col>
            </Row>
            <Row>
                <Col sm="6">
                    <FormControl
                        labelText={"Amount from"}
                        type="number"
                        value={filter.startAmount}
                        onChange={(event) => setFilter({...filter, startAmount: event.target.value})}
                    />
                </Col>
                <Col sm="6">
                    <FormControl
                        labelText={"Amount To"}
                        type="number"
                        value={filter.endAmount}
                        onChange={(event) => setFilter({...filter, endAmount: event.target.value})}
                    />
                </Col>
            </Row>
            <Row>
                <Col sm="6">
                    <PWButton type="button" onClick={() => handleFilter(filter)}>
                        Filter
                    </PWButton>
                    &nbsp;
                    <PWButton type="button" onClick={handleClean}>
                        Clean
                    </PWButton>
                </Col>
            </Row>
        </Form>
    );
}

export default FilterForm;

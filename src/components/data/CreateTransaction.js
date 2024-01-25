import {useEffect} from "react";
import {connect, useSelector, useDispatch} from "react-redux";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import {getUsersAction, createTransactionAction} from "../../actions/transactionCreation";
import ErrorMessage from "../shared/ErrorMessage";
import SuccessMessage from "../shared/SuccessMessage";

const schema = yup.object({
    recipient: yup.string().required("Recipient is required").default(""),
    amount: yup.string().required("Amount is required").default(""),
});

function CreateTransaction({showModal, transactionData, handleCloseModal}) {
    const {
        register,
        formState: {errors},
        handleSubmit,
    } = useForm({
        values: transactionData,
        resolver: yupResolver(schema),
    });

    const createTransactionData = useSelector((state) => state.createTransactionData);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsersAction());
    }, [dispatch]);

    const createTransaction = (data) => {
        dispatch(createTransactionAction(data.recipient, data.amount));
    };

    return (
        <Modal show={showModal} onHide={() => handleCloseModal()} backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>Create transaction</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {createTransactionData.isCreated === true && (
                    <SuccessMessage successMessage="Transaction created successfully"></SuccessMessage>
                )}

                <ErrorMessage errorMessage={createTransactionData.error}></ErrorMessage>
                <Form>
                    <Form.Group className="mb-3" controlId="formRecipient">
                        <Form.Label>Recipient</Form.Label>
                        <Form.Select {...register("recipient")} isInvalid={!!errors.recipient}>
                            <option value=""></option>
                            {createTransactionData.users?.map((user) => (
                                <option key={user.id} value={user.name}>
                                    {user.name}
                                </option>
                            ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">{errors.recipient?.message}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formAmount">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control type="number" min="0" {...register("amount")} isInvalid={!!errors.amount} />
                        <Form.Control.Feedback type="invalid">{errors.amount?.message}</Form.Control.Feedback>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => handleCloseModal()}>
                    Close
                </Button>
                <Button
                    variant="primary"
                    onClick={handleSubmit(createTransaction)}
                    disabled={createTransactionData.isLoading}
                >
                    Create
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

const mapStateToProps = (state) => {
    return {
        createTransactionData: state.createTransactionData,
    };
};

export default connect(mapStateToProps)(CreateTransaction);

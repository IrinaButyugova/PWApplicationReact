import {useEffect} from "react";
import {connect, useSelector, useDispatch} from "react-redux";
import {useForm, Controller} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import {Typeahead} from "react-bootstrap-typeahead";
import {getUsersAction, createTransactionAction} from "../../actions/transactionCreation";
import ErrorMessage from "../shared/ErrorMessage";
import SuccessMessage from "../shared/SuccessMessage";
import "react-bootstrap-typeahead/css/Typeahead.css";

const RECIPIENT_ERROR_MESSAGE = "Recipient is required";
const AMOUNT_ERROR_MESSAGE = "Amount is required";

const schema = yup
.object({
    recipient: yup.lazy((recipient) => {
        if (Array.isArray(recipient)) {
            return yup
            .array(RECIPIENT_ERROR_MESSAGE)
            .length(1, RECIPIENT_ERROR_MESSAGE)
            .of(
                yup.object({
                    id: yup.string().required(RECIPIENT_ERROR_MESSAGE),
                    name: yup.string().required(RECIPIENT_ERROR_MESSAGE),
                })
            );
        }

        return yup.mixed().required(RECIPIENT_ERROR_MESSAGE);
    }),
    amount: yup.string().required(AMOUNT_ERROR_MESSAGE).default(""),
})
.default(null);

function CreateTransaction({showModal, transactionData, handleCloseModal}) {
    const createTransactionData = useSelector((state) => state.createTransactionData);

    const {
        register,
        formState: {errors},
        handleSubmit,
        control,
    } = useForm({
        values: {
            recipient: transactionData.recipient,
            amount: transactionData.amount,
        },
        resolver: yupResolver(schema),
    });

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsersAction());
    }, [dispatch]);

    const createTransaction = (data) => {
        dispatch(createTransactionAction(data.recipient[0].name, data.amount));
    };

    const getRecipientErrorMessage = () => {
        if (errors.recipient) {
            if (errors.recipient.message) {
                return errors.recipient.message;
            }

            if (errors.recipient[0].id.message) {
                return errors.recipient[0].id.message;
            }

            if (errors.recipient[0].name.message) {
                return errors.recipient[0].name.message;
            }
        }
    };

    const getAmountErrorMessage = () => {
        return errors.amount?.message;
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
                        <Controller
                            control={control}
                            name="recipient"
                            render={({field, fieldState}) => (
                                <Typeahead
                                    {...field}
                                    id="basic-typeahead-single"
                                    labelKey="name"
                                    options={createTransactionData.users}
                                    isInvalid={fieldState.invalid}
                                    defaultSelected={
                                        transactionData?.recipient && transactionData?.recipient[0]
                                            ? transactionData?.recipient
                                            : []
                                    }
                                />
                            )}
                        />
                        <Form.Control.Feedback type="invalid">{getRecipientErrorMessage()}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formAmount">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control type="number" min="0" {...register("amount")} isInvalid={!!errors.amount} />
                        <Form.Control.Feedback type="invalid">{getAmountErrorMessage()}</Form.Control.Feedback>
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

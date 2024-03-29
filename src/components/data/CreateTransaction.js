import {useEffect} from "react";
import {connect, useSelector, useDispatch} from "react-redux";
import {useForm, Controller} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import {Typeahead} from "react-bootstrap-typeahead";
import {getUsersAction, createTransactionAction} from "../../actions/transactionCreation";
import ErrorMessage from "../shared/ErrorMessage";
import SuccessMessage from "../shared/SuccessMessage";
import Loading from "../shared/Loading";
import FormControl from "../shared/FormControl";
import PWButton from "../shared/PWButton";
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
    const data = useSelector((state) => state.data);
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
        if (data.currentUser) {
            dispatch(getUsersAction());
        }
    }, [data.currentUser?.id]);

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
                <Loading isLoading={createTransactionData.isLoading}></Loading>
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
                    <Controller
                        control={control}
                        name="amount"
                        render={({field}) => (
                            <FormControl
                                labelText={"Amount"}
                                type="number"
                                min="0"
                                defaultValue={transactionData.amount}
                                isInvalid={!!errors.amount}
                                onChange={field.onChange}
                                errorMessage={getAmountErrorMessage()}
                            />
                        )}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <PWButton variant="secondary" onClick={() => handleCloseModal()}>
                    Close
                </PWButton>
                <PWButton onClick={handleSubmit(createTransaction)} disabled={createTransactionData.isLoading}>
                    Create
                </PWButton>
            </Modal.Footer>
        </Modal>
    );
}

const mapStateToProps = (state) => {
    return {
        data: state.data,
        createTransactionData: state.createTransactionData,
    };
};

export default connect(mapStateToProps)(CreateTransaction);

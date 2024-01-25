import {useEffect, useState} from "react";
import {connect, useSelector, useDispatch} from "react-redux";
import Table from "react-bootstrap/Table";
import {getCurrentUserAction, getTransactionsAction} from "../../actions/data";
import ErrorMessage from "../shared/ErrorMessage";
import CreateTransaction from "./CreateTransaction";
import Button from "react-bootstrap/esm/Button";
import {cleanAction} from "../../actions/transactionCreation";

function Data() {
    const [showModal, setShowModal] = useState(false);
    const [transactionData, setTransactionData] = useState({recipient: "", amount: ""});

    const data = useSelector((state) => state.data);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCurrentUserAction());
        dispatch(getTransactionsAction());
    }, [dispatch]);

    const handleShowModal = (username, amount) => {
        setTransactionData({recipient: username, amount: amount});
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setTransactionData({recipient: "", amount: "0"});
        dispatch(cleanAction());
    };

    const handleRepeat = (username, amount) => {
        if (amount < 0) {
            amount = Math.abs(amount);
        }
        handleShowModal(username, amount);
    };

    return (
        <>
            <ErrorMessage errorMessage={data.error}></ErrorMessage>
            <h4 className="mb-3">
                {data.currentUser?.name} <br /> balance {data.currentUser?.balance.toFixed(2)}
            </h4>
            <Button className="mb-3" variant="primary" onClick={handleShowModal}>
                Create transaction
            </Button>
            <CreateTransaction
                showModal={showModal}
                transactionData={transactionData}
                handleCloseModal={handleCloseModal}
            ></CreateTransaction>
            <Table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Correspondent Name</th>
                        <th>Amount</th>
                        <th>Balance</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data.transactions?.map((transaction) => (
                        <tr key={transaction.id}>
                            <td>{transaction.date}</td>
                            <td>{transaction.username}</td>
                            <td>{transaction.amount.toFixed(2)}</td>
                            <td>{transaction.balance.toFixed(2)}</td>
                            <td>
                                <Button onClick={() => handleRepeat(transaction.username, transaction.amount)}>
                                    Repeat
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        data: state.data,
    };
};

export default connect(mapStateToProps)(Data);

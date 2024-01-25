import {useEffect, useState} from "react";
import {connect, useSelector, useDispatch} from "react-redux";
import Table from "react-bootstrap/Table";
import {FaArrowUp, FaArrowDown} from "react-icons/fa";
import {getCurrentUserAction, getTransactionsAction} from "../../actions/data";
import ErrorMessage from "../shared/ErrorMessage";
import CreateTransaction from "./CreateTransaction";
import Button from "react-bootstrap/esm/Button";
import {cleanAction} from "../../actions/transactionCreation";

function Data() {
    const [showModal, setShowModal] = useState(false);
    const [transactionData, setTransactionData] = useState({recipient: "", amount: ""});
    const [transactions, setTransactions] = useState(null);
    const [sortOrder, setSortOrder] = useState("desc");
    const [sortColumn, setSortColumn] = useState("date");
    const compare = (v1, v2) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);

    const data = useSelector((state) => state.data);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCurrentUserAction());
        dispatch(getTransactionsAction());
    }, [dispatch]);

    useEffect(() => {
        if (data.transactions) {
            sortTransactions();
        }
    }, [data.transactions, sortOrder, sortColumn]);

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

    const handleSort = (column) => {
        if (sortColumn === column) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortColumn(column);
            setSortOrder("asc");
        }
    };

    const sortTransactions = () => {
        setTransactions(
            [...data.transactions]?.sort((a, b) => {
                const res = compare(a[sortColumn], b[sortColumn]);
                return sortOrder === "asc" ? res : -res;
            })
        );
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
                        <th>
                            <Button variant="link" onClick={() => handleSort("date")}>
                                Date
                            </Button>
                            {sortColumn === "date" && (sortOrder === "asc" ? <FaArrowUp /> : <FaArrowDown />)}
                        </th>
                        <th>
                            <Button variant="link" onClick={() => handleSort("username")}>
                                Correspondent Name
                            </Button>
                            {sortColumn === "username" && (sortOrder === "asc" ? <FaArrowUp /> : <FaArrowDown />)}
                        </th>
                        <th>
                            <Button variant="link" onClick={() => handleSort("amount")}>
                                Amount
                            </Button>
                            {sortColumn === "amount" && (sortOrder === "asc" ? <FaArrowUp /> : <FaArrowDown />)}
                        </th>
                        <th>Balance</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {transactions?.map((transaction) => (
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

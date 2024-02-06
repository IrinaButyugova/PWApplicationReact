import {useEffect, useState} from "react";
import {connect, useSelector, useDispatch} from "react-redux";
import Table from "react-bootstrap/Table";
import {FaArrowUp, FaArrowDown} from "react-icons/fa";
import {getCurrentUserAction, getTransactionsAction} from "../../actions/data";
import ErrorMessage from "../shared/ErrorMessage";
import CreateTransaction from "./CreateTransaction";
import Button from "react-bootstrap/esm/Button";
import {cleanAction} from "../../actions/transactionCreation";
import FilterForm from "./FilterForm";
import * as transactionsService from "../../services/transactions.service";

function Data() {
    const [showModal, setShowModal] = useState(false);
    const [transactionData, setTransactionData] = useState({recipient: "", amount: ""});
    const [transactions, setTransactions] = useState(null);
    const [sortOrder, setSortOrder] = useState("desc");
    const [sortColumn, setSortColumn] = useState("date");
    const [filter, setFilter] = useState();

    const data = useSelector((state) => state.data);
    const createTransactionData = useSelector((state) => state.createTransactionData);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCurrentUserAction());
        dispatch(getTransactionsAction());
    }, [dispatch]);

    useEffect(() => {
        if (data.transactions) {
            buildTransactions();
        }
    }, [data.transactions, sortOrder, sortColumn, filter]);

    const handleShowModal = (username, amount) => {
        const transactionRecipient = Array(
            createTransactionData.users.filter((x) => {
                return x.name === username;
            })[0]
        );
        setTransactionData({recipient: transactionRecipient, amount: amount});
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setTransactionData({recipient: [], amount: ""});
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

    const buildTransactions = () => {
        var newTransactions = transactionsService.filterTransactions(data.transactions, filter);
        newTransactions = transactionsService.sortTransactions(newTransactions, sortColumn, sortOrder);
        setTransactions(newTransactions);
    };

    const handleFilter = (filter) => {
        setFilter(filter);
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
            <FilterForm handleFilter={(filter) => handleFilter(filter)} />
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
        createTransactionData: state.createTransactionData,
    };
};

export default connect(mapStateToProps)(Data);

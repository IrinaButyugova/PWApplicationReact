import {useEffect, useState} from "react";
import {connect, useSelector, useDispatch} from "react-redux";
import Table from "react-bootstrap/Table";
import {FaArrowUp, FaArrowDown} from "react-icons/fa";
import {getCurrentUserAction, getTransactionsAction} from "../../actions/data";
import ErrorMessage from "../shared/ErrorMessage";
import CreateTransaction from "./CreateTransaction";
import {cleanAction} from "../../actions/transactionCreation";
import FilterForm from "./FilterForm";
import * as transactionsService from "../../services/transactions.service";
import Loading from "../shared/Loading";
import PWButton from "../shared/PWButton";

function Data() {
    const [showModal, setShowModal] = useState(false);
    const [transactionData, setTransactionData] = useState({recipient: "", amount: ""});
    const [transactions, setTransactions] = useState(null);
    const [sortOrder, setSortOrder] = useState(transactionsService.sortOrders.DESC);
    const [sortColumn, setSortColumn] = useState(transactionsService.sortColumns.DATE);
    const [filter, setFilter] = useState();

    const data = useSelector((state) => state.data);
    const createTransactionData = useSelector((state) => state.createTransactionData);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCurrentUserAction());
    }, [dispatch]);

    useEffect(() => {
        if (data.currentUser) {
            dispatch(getTransactionsAction());
        }
    }, [data.currentUser?.id]);

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
            setSortOrder(
                sortOrder === transactionsService.sortOrders.ASC
                    ? transactionsService.sortOrders.DESC
                    : transactionsService.sortOrders.ASC
            );
        } else {
            setSortColumn(column);
            setSortOrder(transactionsService.sortOrders.ASC);
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
            <Loading isLoading={data.isLoading}></Loading>
            <ErrorMessage errorMessage={data.error}></ErrorMessage>
            <h4 className="mb-3">
                {data.currentUser?.name} <br /> balance {data.currentUser?.balance.toFixed(2)}
            </h4>
            <div className="mb-3">
                <PWButton onClick={handleShowModal}>Create transaction</PWButton>
            </div>
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
                            <PWButton variant="link" onClick={() => handleSort(transactionsService.sortColumns.DATE)}>
                                Date
                            </PWButton>
                            {sortColumn === transactionsService.sortColumns.DATE &&
                                (sortOrder === transactionsService.sortOrders.ASC ? <FaArrowUp /> : <FaArrowDown />)}
                        </th>
                        <th>
                            <PWButton
                                variant="link"
                                onClick={() => handleSort(transactionsService.sortColumns.USER_NAME)}
                            >
                                Correspondent Name
                            </PWButton>
                            {sortColumn === transactionsService.sortColumns.USER_NAME &&
                                (sortOrder === transactionsService.sortOrders.ASC ? <FaArrowUp /> : <FaArrowDown />)}
                        </th>
                        <th>
                            <PWButton variant="link" onClick={() => handleSort(transactionsService.sortColumns.AMOUNT)}>
                                Amount
                            </PWButton>
                            {sortColumn === transactionsService.sortColumns.AMOUNT &&
                                (sortOrder === transactionsService.sortOrders.ASC ? <FaArrowUp /> : <FaArrowDown />)}
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
                                <PWButton onClick={() => handleRepeat(transaction.username, transaction.amount)}>
                                    Repeat
                                </PWButton>
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

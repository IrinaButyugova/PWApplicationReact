import {useEffect} from "react";
import {connect, useSelector, useDispatch} from "react-redux";
import Table from "react-bootstrap/Table";
import {getCurrentUserAction, getTransactionsAction} from "../../actions/data";
import ErrorMessage from "../shared/ErrorMessage";
import CreateTransaction from "./CreateTransaction";

function Data() {
    const data = useSelector((state) => state.data);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCurrentUserAction());
        dispatch(getTransactionsAction());
    }, []);

    return (
        <>
            <ErrorMessage errorMessage={data.error}></ErrorMessage>
            <h4 className="mb-3">
                {data.currentUser?.name} <br /> balance {data.currentUser?.balance.toFixed(2)}
            </h4>
            <CreateTransaction></CreateTransaction>
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
                            <td></td>
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

import {useEffect} from "react";
import {connect, useSelector, useDispatch} from "react-redux";
import Auth from "./auth/Auth";
import Data from "./data/Data";
import {authCheckAction} from "../actions/auth";
import ErrorBoundary from "../components/shared/ErrorBoundary";

function Main() {
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(authCheckAction());
    }, []);

    return (
        <>
            <ErrorBoundary>
                <Auth></Auth>
                {auth.isLoggedIn && <Data></Data>}
            </ErrorBoundary>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    };
};

export default connect(mapStateToProps)(Main);

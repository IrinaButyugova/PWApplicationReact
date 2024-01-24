import {useEffect} from "react";
import {connect, useSelector, useDispatch} from "react-redux";
import Auth from "./auth/Auth";
import Data from "./data/Data";
import {authCheckAction} from "../actions/auth";

function Main() {
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(authCheckAction());
    }, []);

    return (
        <div>
            <Auth></Auth>
            {auth.isLoggedIn && <Data></Data>}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    };
};

export default connect(mapStateToProps)(Main);

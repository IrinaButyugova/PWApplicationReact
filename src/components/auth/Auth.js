import {useState} from "react";
import {connect, useSelector, useDispatch} from "react-redux";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import {logoutAction} from "../../actions/auth";
import ErrorMessage from "../shared/ErrorMessage";
import Loading from "../shared/Loading";
import PWButton from "../shared/PWButton";

function Auth() {
    const [signIn, setSignIn] = useState(true);
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const handleSignIn = () => {
        setSignIn(true);
    };

    const handleSignUp = () => {
        setSignIn(false);
    };

    const handleLogout = () => {
        dispatch(logoutAction());
    };

    return (
        <div className="mb-3">
            <Loading isLoading={auth.isSubmitting}></Loading>
            <ErrorMessage errorMessage={auth.error}></ErrorMessage>

            {auth.isLoggedIn ? (
                <PWButton onClick={handleLogout} disabled={auth.isSubmitting}>
                    Logout
                </PWButton>
            ) : signIn ? (
                <div>
                    <PWButton onClick={handleSignUp}>Sign up</PWButton>
                    <SignIn></SignIn>
                </div>
            ) : (
                <div>
                    <PWButton onClick={handleSignIn}>Sign in</PWButton>
                    <SignUp></SignUp>
                </div>
            )}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    };
};

export default connect(mapStateToProps, {logoutAction})(Auth);

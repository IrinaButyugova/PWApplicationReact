import {useState} from "react";
import {connect, useSelector, useDispatch} from "react-redux";
import Button from "react-bootstrap/Button";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import {logoutAction} from "../../actions/auth";
import ErrorMessage from "../shared/ErrorMessage";

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
        <div>
            <ErrorMessage errorMessage={auth.error}></ErrorMessage>

            {auth.isLoggedIn ? (
                <Button variant="primary" onClick={handleLogout} disabled={auth.isSubmitting}>
                    Logout
                </Button>
            ) : signIn ? (
                <div>
                    <Button variant="primary" onClick={handleSignUp}>
                        Sign up
                    </Button>
                    <SignIn></SignIn>
                </div>
            ) : (
                <div>
                    <Button variant="primary" onClick={handleSignIn}>
                        Sign in
                    </Button>
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

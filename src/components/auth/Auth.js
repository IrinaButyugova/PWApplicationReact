import {useState} from "react";
import {connect, useSelector, useDispatch} from "react-redux";
import Button from "react-bootstrap/Button";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import {logoutAction} from "../../actions/auth";

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

    if (auth.isLoggedIn) {
        return (
            <Button variant="primary" onClick={handleLogout}>
                Logout
            </Button>
        );
    } else if (signIn) {
        return (
            <div>
                <Button variant="primary" onClick={handleSignUp}>
                    Sign up
                </Button>
                <SignIn></SignIn>
            </div>
        );
    } else {
        return (
            <div>
                <Button variant="primary" onClick={handleSignIn}>
                    Sign in
                </Button>
                <SignUp></SignUp>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    };
};

export default connect(mapStateToProps, {logoutAction})(Auth);

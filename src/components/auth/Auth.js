import {useState} from "react";
import Button from "react-bootstrap/Button";
import SingUp from "./SingUp";
import SignIn from "./SignIn";

export default function Auth() {
    const [signIn, setSignIn] = useState(true);

    const handleSignIn = () => {
        setSignIn(true);
    };

    const handleSignUp = () => {
        setSignIn(false);
    };

    if (signIn) {
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
                <SingUp></SingUp>
            </div>
        );
    }
}

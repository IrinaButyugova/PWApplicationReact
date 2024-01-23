import {connect, useSelector, useDispatch} from "react-redux";
import {useForm} from "react-hook-form";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {registerAction} from "../../actions/auth";
import ErrorMessage from "../shared/ErrorMessage";

const schema = yup.object({
    username: yup.string().required("Name is required"),
    email: yup.string().required("Email is required").email("Email is invalid"),
    password: yup.string().required("Password is required"),
    confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password"), null], "Confirm Password does not match"),
});

function SignUp() {
    const {
        register,
        formState: {errors},
        handleSubmit,
    } = useForm({
        resolver: yupResolver(schema),
    });
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const onSubmit = (data) => {
        dispatch(registerAction({username: data.username, email: data.email, password: data.password}));
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <h2>Sign Up</h2>
            <ErrorMessage errorMessage={auth.error}></ErrorMessage>
            <Form.Group className="mb-3" controlId="formUsername">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" {...register("username")} isInvalid={!!errors.username} />
                <Form.Control.Feedback type="invalid">{errors.username?.message}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" {...register("email")} isInvalid={!!errors.email} />
                <Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" {...register("password")} isInvalid={!!errors.password} />
                <Form.Control.Feedback type="invalid">{errors.password?.message}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formConfirmPassword">
                <Form.Label>Confirm password</Form.Label>
                <Form.Control type="password" {...register("confirmPassword")} isInvalid={!!errors.confirmPassword} />
                <Form.Control.Feedback type="invalid">{errors.confirmPassword?.message}</Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit" disabled={auth.isSubmitting}>
                Submit
            </Button>
        </Form>
    );
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    };
};

export default connect(mapStateToProps, {registerAction})(SignUp);

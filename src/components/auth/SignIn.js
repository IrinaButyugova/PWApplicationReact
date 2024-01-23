import {connect, useSelector, useDispatch} from "react-redux";
import {useForm} from "react-hook-form";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {loginAction} from "../../actions/auth";

const schema = yup.object({
    email: yup.string().required("Email is required").email("Email is invalid"),
    password: yup.string().required("Password is required"),
});

function SignIn() {
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
        dispatch(loginAction({email: data.email, password: data.password}));
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <h2>Sign In</h2>
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

export default connect(mapStateToProps, {loginAction})(SignIn);

import {connect, useSelector, useDispatch} from "react-redux";
import {useForm, Controller} from "react-hook-form";
import Form from "react-bootstrap/Form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {loginAction} from "../../actions/auth";
import FormControl from "../shared/FormControl";
import PWButton from "../shared/PWButton";

const schema = yup.object({
    email: yup.string().required("Email is required").email("Email is invalid"),
    password: yup.string().required("Password is required"),
});

function SignIn() {
    const {
        formState: {errors},
        handleSubmit,
        control,
    } = useForm({
        resolver: yupResolver(schema),
    });
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const onSubmit = (data) => {
        dispatch(loginAction(data.email, data.password));
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <h2>Sign In</h2>
            <Controller
                control={control}
                name="email"
                render={({field}) => (
                    <FormControl
                        labelText={"Email"}
                        type="text"
                        isInvalid={!!errors.email}
                        onChange={field.onChange}
                        errorMessage={errors.email?.message}
                    />
                )}
            />
            <Controller
                control={control}
                name="password"
                render={({field}) => (
                    <FormControl
                        labelText={"Password"}
                        type="password"
                        isInvalid={!!errors.password}
                        onChange={field.onChange}
                        errorMessage={errors.password?.message}
                    />
                )}
            />
            <PWButton type="submit" disabled={auth.isSubmitting}>
                Submit
            </PWButton>
        </Form>
    );
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    };
};

export default connect(mapStateToProps, {loginAction})(SignIn);

import Spinner from "react-bootstrap/Spinner";

export default function Loading({isLoading}) {
    return <div>{isLoading === true && <Spinner animation="border" size="sm" />}</div>;
}

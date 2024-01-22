import "./App.css";
import Container from "react-bootstrap/Container";
import Auth from "./components/auth/Auth";

function App() {
    return (
        <Container fluid="sm">
            <h2>PWApplication</h2>
            <Auth></Auth>
        </Container>
    );
}

export default App;

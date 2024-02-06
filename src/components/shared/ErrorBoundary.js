import React, {Component} from "react";

class ErrorBoundary extends Component {
    state = {
        error: null,
    };

    static getDerivedStateFromError(error) {
        return {error};
    }

    componentDidCatch(error, info) {
        console.log(error);
    }

    render() {
        const {error} = this.state;

        if (error) {
            return <p>Something went wrong!!!</p>;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;

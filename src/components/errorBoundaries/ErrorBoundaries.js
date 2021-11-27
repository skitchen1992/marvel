import React , {Component} from 'react';
import ErrorMessage from "../error/ErrorMessage";

class ErrorBoundaries extends Component {

    state = {
        error: false
    }

    componentDidCatch(error , errorInfo) {
        this.setState({error: true})
    }

    render() {
        return (
            <>
                {this.state.error
                    ? <ErrorMessage/>
                    : this.props.children
                }
            </>


        );
    }
}

export default ErrorBoundaries;
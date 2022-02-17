import Alert from './Alert.js';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { error: '' };
    }

    static getDerivedStateFromError(error) {
        if (error.message) {
            return { error: error.message };
        }
    }

    render() {
        if (this.state.error) {
            return <Alert type="error" message={this.state.error} />;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
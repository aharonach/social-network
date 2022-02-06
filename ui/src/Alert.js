class Alert extends React.Component {
    icon() {
        switch (this.props.type) {
            case 'warning':
                return 'exclamation-triangle';
        
            case 'error':
                return 'times-circle';

            case 'success':
            default:
                return 'check-circle';
        }
    }

    render() {
        if ( ! this.props.show ) {
            return null;
        }

        return (
            <div className={'alert ' + this.props.type}>
                <i className={'fa fa-' + this.icon()} aria-hidden="true"></i> {this.props.message}
            </div>
        );
    }
}

export default Alert;
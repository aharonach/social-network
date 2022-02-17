import * as requests from '../helpers/requests.js';
import Alert from '../Alert.js';

class Users extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            error: '',
            message: '',
        }
    }

    async componentDidMount() {
        await this.get_users();
    }

    async get_users(filters) {
        const users = await requests.do_get('/api/admin/users', filters);

        if ( ! users.error ) {
            this.setState({ users: users });
        }
    }

    async handle_edit(user_id, fields) {
        const result = await requests.do_post('/api/admin/users/' + user_id, fields);
        if ( result.success ) {
            this.setState({ message: result.fields_updated.join(', ') + " updated successfuly!" });
        } else {
            this.setState({ error: result.error })
        }
    }

    alert_type() {
        return this.state.error ? 'error' : this.state.success ? 'success' : 'error';
    }

    alert_message() {
        return this.state[this.alert_type()];
    }

    render() {
        return (
            <>
                <Alert type={this.alert_type()} message={this.alert_message()} />
            </>
        );
    }
}

export default Users;
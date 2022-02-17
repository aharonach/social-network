import * as requests from './helpers/requests.js';

// cache users
const g_users = [];

class User extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null,
        }
    }

    async componentDidMount() {
        this.setState({ user: await this.get_user() });
    }

    async get_user() {
        let user = g_users[this.props.id];

        if ( user ) {
            return user;
        }

        user = await requests.do_get('/api/user/' + this.props.id);
        g_users[user.id] = user;
        return user;
    }

    render() {
        return <h4>{this.state.user?.full_name}</h4>;
    }
}

export default User;
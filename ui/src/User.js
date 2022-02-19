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
        const user = await this.get_user();
        if ( user.id ) {
            this.setState({ user: user });
        }
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
        return (
            <div className="user">
                <span className="avatar"><i className="fa fa-user" aria-hidden="true"></i></span>
                <h4>{this.state.user ? this.state.user.full_name : "Deleted User"}</h4>
            </div>
        );
    }
}

export default User;
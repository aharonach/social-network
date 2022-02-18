import * as requests from '../helpers/requests.js';
import User from './User.js';
import Alert from '../Alert.js';

class Users extends React.Component {
    state = {
        users: [],
        status: '',
        date_from: '',
        date_to: '',
    }

    constructor(props) {
        super(props);

        this.handle_change = this.handle_change.bind(this);
        this.handle_submit = this.handle_submit.bind(this);
        this.get_users = this.get_users.bind(this);
    }

    async componentDidMount() {
        await this.get_users();
    }

    async get_users() {
        const filters = this.filters();
        const users = await requests.do_get('/api/admin/users', filters);

        if (!users.error) {
            this.setState({ users: users, ...filters });
        }
    }

    handle_change(event) {
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value });
    }

    async handle_submit(event) {
        event.preventDefault();
        await this.get_users();
    }

    filters() {
        const filters = {
            status: this.state.status,
            date_from: this.state.date_from,
            date_to: this.state.date_to
        };

        Object.keys(filters).forEach(key => {
            if (filters[key] === '') {
                delete filters[key];
            }
        });

        return filters;
    }

    render() {
        return (
            <>
                <h2>Manage Users</h2>
                <form onSubmit={this.handle_submit}>
                    <div className="form-control">
                        <label htmlFor="status">Status:</label>
                        <select name="status" onChange={this.handle_change} value={this.state.status}>
                            <option value="">All</option>
                            <option value="created">Created</option>
                            <option value="active">Active</option>
                            <option value="suspended">Suspended</option>
                        </select>
                    </div>
                    <div className="form-control">
                        <label htmlFor="date_from">Date from:</label>
                        <input type="date" name="date_from" onChange={this.handle_change} value={this.state.date_from} />
                    </div>
                    <div className="form-control">
                        <label htmlFor="date_to">Date to:</label>
                        <input type="date" name="date_to" onChange={this.handle_change} value={this.state.date_to} />
                    </div>
                    <button type="submit">Filter</button>
                </form>
                <div className="cards">
                    {this.state.users.length > 0 ? this.state.users.map(user => <User key={user.id} user={user} update={this.get_users} />) : <Alert type="warning" message="No users!" />}
                </div>
            </>
        );
    }
}

export default Users;
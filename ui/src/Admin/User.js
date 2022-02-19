import Alert from '../Alert.js';
import * as helpers from '../helpers/functions.js';
import * as requests from '../helpers/requests.js';

class User extends React.Component {
    user = this.props.user;
    
    state = {
        full_name: this.user.full_name,
        email: this.user.email,
        password: '',
        status: this.user.status,
        role: this.user.role,
        error: '',
        success: '',
    }

    constructor(props) {
        super(props);

        this.handle_change = this.handle_change.bind(this);
        this.handle_submit = this.handle_submit.bind(this);
        this.handle_delete = this.handle_delete.bind(this);
        this.alert_hide = this.alert_hide.bind(this);
    }

    handle_change(event) {
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value })
    }

    async handle_submit(event) {
        event.preventDefault();

        // Remove unchanged fields from state
        const fields = Object.assign({}, this.state);
        Object.keys(fields).forEach(key => {
            if (this.user[key] && fields[key] === this.user[key] || fields[key] == '') {
                delete fields[key];
            }
        });

        const result = await this.handle_edit(this.user.id, fields);

        if ( result?.error ) {
            setTimeout(this.alert_hide, 5000);
            this.setState({ error: result.error });
        } else {
            const updated = result.fields_updated.map( field => field.replace('_', ' ') );
            this.setState({ success: updated.join(', ') + " updated successfuly!" });
        }
    }

    async handle_delete(event) {
        event.preventDefault();
        const result = await requests.do_delete('/api/admin/users/' + this.user.id);
        
        if (result?.error) {
            setTimeout(this.alert_hide, 5000);
            this.setState({ error: result.error });
        } else {
            await this.props.update();
        }
    }

    async handle_edit(user_id, fields) {
        return await requests.do_post('/api/admin/users/' + user_id, fields);
    }

    alert_type() {
        return this.state.error ? 'error' : this.state.success ? 'success' : 'error';
    }

    alert_message() {
        return this.state[this.alert_type()];
    }

    alert_hide() {
        this.setState({ error: '', success: '' });
    }

    render() {
        return (
            <div className="card">
                <h3>User #{this.user.id}</h3>
                <Alert type={this.alert_type()} message={this.alert_message()} />
                <p>Created at: {helpers.date(this.user.datetime)}</p>
                <form onSubmit={this.handle_submit}>
                    <div className="form-control">
                        <label htmlFor="email">Email</label>
                        <input onChange={this.handle_change} name="email" type="email" id="email" value={this.state.email} />
                    </div>
                    <div className="form-control">
                        <label htmlFor="password">Password</label>
                        <input onChange={this.handle_change} name="password" type="password" id="password" value={this.state.password} />
                    </div>
                    <div className="form-control">
                        <label htmlFor="full_name">Full Name</label>
                        <input onChange={this.handle_change} name="full_name" type="text" id="full_name" value={this.state.full_name} />
                    </div>
                    <div className="form-control">
                        <label htmlFor="status">Status</label>
                        <select name="status" onChange={this.handle_change} value={this.state.status}>
                            <option value="created">Created</option>
                            <option value="active">Active</option>
                            <option value="suspended">Suspended</option>
                        </select>
                    </div>
                    <div className="form-control">
                        <label htmlFor="role">Role</label>
                        <select name="role" onChange={this.handle_change} value={this.state.role}>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <div className="form-control form-submit">
                        <button type="submit" name="submit"><i className="fa fa-pencil" aria-hidden="true"></i> Update User</button>
                        <button type="button" onClick={this.handle_delete} name="delete"><i className="fa fa-trash" aria-hidden="true"></i> Delete User</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default User;
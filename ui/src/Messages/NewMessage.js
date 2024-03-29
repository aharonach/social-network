import * as requests from '../helpers/requests.js';
import Alert from '../Alert.js';

class NewMessage extends React.Component {
    constructor(props) {
        super(props);
        this.default_state = {
            text: '',
            user: 0,
            error: '',
            success: '',
        };
        this.state = { ...this.default_state, users: [] };

        this.handle_change = this.handle_change.bind(this);
        this.handle_post = this.handle_post.bind(this);
    }

    async componentDidMount() {
        this.setState({ users: await requests.do_get('/api/users') });
    }

    handle_change(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    async handle_post(e) {
        e.preventDefault();

        const json = await requests.do_post(`/api/user/${this.state.user}/message`, {
            text: this.state.text
        });

        this.setState(json?.error ? { error: json.error } : { ...this.default_state, success: 'Message sent!' });
        this.props.update();
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
                <form onSubmit={this.handle_post} className="form">
                    <div className="form-control">
                        <textarea onChange={this.handle_change} placeholder="Write your message" name="text" id="text" value={this.state.text}></textarea>
                    </div>
                    <div className="form-control">
                        <select name="user" onChange={this.handle_change} value={this.state.user}>
                            <option value="0">Choose a user...</option>
                            {this.state.users.map(user => <option key={user.id} value={user.id}>{user.full_name}</option>)}
                        </select>
                    </div>
                    <div className="form-control form-submit">
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </>
        )
    }
}

export default NewMessage;
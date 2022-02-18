import * as requests from '../helpers/requests.js';
import Alert from '../Alert.js';

class NewMessage extends React.Component {
    state = {
        text: '',
        error: '',
        success: '',
    }

    constructor(props) {
        super(props);

        this.handle_change = this.handle_change.bind(this);
        this.handle_post = this.handle_post.bind(this);
    }

    handle_change(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    async handle_post(e) {
        e.preventDefault();

        const json = await requests.do_post(`/api/admin/users/message`, {
            text: this.state.text
        });

        this.setState(json?.error ? { error: json.error } : { success: 'Message sent!' });
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
                <h2>Message all users</h2>
                <form onSubmit={this.handle_post} className="form">
                    <div className="form-control">
                        <label htmlFor="text">Text</label>
                        <textarea onChange={this.handle_change} name="text" id="text" value={this.state.text}></textarea>
                    </div>
                    <div className="form-control">
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </>
        )
    }
}

export default NewMessage;
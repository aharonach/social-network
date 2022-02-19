import * as requests from '../helpers/requests.js';
import Alert from '../Alert.js';

class NewPost extends React.Component {
    constructor(props) {
        super(props);
        this.default_state = { 
            text: '',
            error: '',
            success: '',
        };
        this.state = Object.assign({}, this.default_state);

        this.handle_change = this.handle_change.bind(this);
        this.handle_post = this.handle_post.bind(this);
    }

    handle_change(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    async handle_post(e) {
        e.preventDefault();

        const json = await requests.do_post('/api/posts', {
            text: this.state.text
        });
        
        this.setState(json?.error ? { error: json.error } : { ...this.default_state, success: 'Post submitted!' });
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
                        <label htmlFor="text" className="invisible">Text</label>
                        <textarea onChange={this.handle_change} name="text" id="text" placeholder="Submit a new post" value={this.state.text}></textarea>
                    </div>
                    <div className="form-control form-submit">
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </>
        )
    }
}

export default NewPost;
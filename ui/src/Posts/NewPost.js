import Alert from '../Alert.js';

class NewPost extends React.Component {
    constructor(props) {
        super(props);
        this.default_state = { text: '', error: '' };
        this.state = this.default_state;

        this.handle_change = this.handle_change.bind(this);
        this.handle_post = this.handle_post.bind(this);
    }

    handle_change(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    async handle_post(e) {
        e.preventDefault();
        const response = await fetch('/api/posts', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': JSON.stringify({ token: this.props.token }),
            },
            body: JSON.stringify({
                text: this.state.text,
            })
        });
        const json = await response.json();
        this.setState(json?.error ? { error: json.error } : this.default_state);
        this.props.update();
    }

    render() {
        return (
            <>
                <Alert show={!!this.state.error} type="error" message={this.state.error} />
                <form onSubmit={this.handle_post} className="form">
                    <div className="form-control">
                        <label htmlFor="text">Text</label>
                        <textarea onChange={this.handle_change} name="text" id="text" placeholder="Submit a new post" value={this.state.text}></textarea>
                    </div>
                    <div className="form-control">
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </>
        )
    }
}

export default NewPost;
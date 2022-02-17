import * as requests from './helpers/requests.js';
import * as cookies from './helpers/cookies.js';
import Alert from './Alert.js';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            login_or_register: 'login',
            email: '', 
            password: '',
            full_name: '',
            error: '',
            message: '',
        };

        this.handle_change = this.handle_change.bind(this);
        this.handle_click = this.handle_click.bind(this);
        this.handle_login = this.handle_login.bind(this);
        this.handle_register = this.handle_register.bind(this);
    }

    componentDidMount() {
        const token = cookies.get('token');
        if ( token ) {
            this.props.handle_login(token);
        }
    }

    handle_change(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    async handle_login(event) {
        event.preventDefault();

        const json = await requests.do_post('/api/login', {
            email: this.state.email,
            password: this.state.password,
        });

        if ( json?.error ) {
            this.setState({ error: json.error, message: '' });
        } else {
            this.props.handle_login(json.token);
        }
    }

    async handle_register(event) {
        event.preventDefault();

        const json = await requests.do_post('/api/register', {
            email: this.state.email,
            password: this.state.password,
            full_name: this.state.full_name
        });

        if ( json?.error ) {
            this.setState({ error: json.error, message: '' });
        } else {
            this.setState({
                message: 'User created!',
                error: '',
            });
        }
    }

    handle_click(event) {
        event.preventDefault();

        this.setState(prev_state => ({
            login_or_register: prev_state.login_or_register === 'login' ? 'register' : 'login'
        }));
    }

    is_login() {
        return this.state.login_or_register === 'login';
    }

    render_login() {
        return (
            <>
                <h2>Login</h2>
                <form onSubmit={this.handle_login} className="form">
                    <div className="form-control">
                        <label htmlFor="email">Email</label>
                        <input onChange={this.handle_change} name="email" type="email" id="email" placeholder="user@domain.com" />
                    </div>
                    <div className="form-control">
                        <label htmlFor="password">Password</label>
                        <input onChange={this.handle_change} name="password" type="password" id="password" />
                    </div>
                    <div className="form-control">
                        <button type="submit">Login!</button>
                    </div>
                </form>
            </>
        );
    }

    render_register() {
        return (
            <>
                <h2>Register</h2>
                <form onSubmit={this.handle_register} className="form">
                    <div className="form-control">
                        <label htmlFor="email">Email</label>
                        <input onChange={this.handle_change} name="email" type="email" id="email" placeholder="user@domain.com" />
                    </div>
                    <div className="form-control">
                        <label htmlFor="password">Password</label>
                        <input onChange={this.handle_change} name="password" type="password" id="password" />
                    </div>
                    <div className="form-control">
                        <label htmlFor="full_name">Full Name</label>
                        <input onChange={this.handle_change} name="full_name" type="text" id="full_name" />
                    </div>
                    <div className="form-control">
                        <button type="submit">Submit!</button>
                    </div>
                </form>
            </>
        );
    }

    render_link() {
        return <a href="#" onClick={this.handle_click}>{this.state.login_or_register === 'login' ? 'Register' : 'Login'}</a>;
    }

    render() {
        const message_type = this.state.error ? 'error' : 'success';
        const message = message_type === 'error' ? this.state.error : this.state.message;

        return (
            <>
                <Alert type={message_type} message={message} />
                {this.is_login() ? this.render_login() : this.render_register()}
                {this.render_link()}
            </>
        );
    }
}

export default Login;
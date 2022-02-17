import * as requests from './helpers/requests.js';
import * as cookies from './helpers/cookies.js';
import Login from './Login.js';
import NavBar from './NavBar.js';
import Posts from './Posts/Posts.js';
import Messages from './Messages/Messages.js';
import ErrorBoundary from './ErrorBoundary.js';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.components = {
            'Home': {
                component: Posts,
                list: 'posts',
            },
            'Messages': {
                component: Messages,
                list: 'messages',
            },
            // 'Users': Users
        };

        this.state = {
            posts: [],
            messages: [],
            user: null,
            current: 'Home',
        };

        this.handle_login = this.handle_login.bind(this);
        this.handle_logout = this.handle_logout.bind(this);
        this.update_page = this.update_page.bind(this);
        this.update_list = this.update_list.bind(this);
    }

    update_list(name, list) {
        this.setState({ [name]: list });
    }

    update_page(page) {
        this.setState({ current: page });
    }

    async handle_login(token) {
        cookies.set('token', token);
        
        try {
            const user = await requests.do_get('/api/user');
            if (user.id) {
                this.setState({ user: user });
            }
        } catch( e ) {
            console.log(e.message);
        }        
    }

    async handle_logout() {
        const result = await requests.do_post('/api/logout');

        if (result.success) {
            cookies.set('token', '');
            this.setState({ user: null, posts: [], messages: [] });
        }
    }

    render() {
        if (this.state.user) {
            const Component = this.components[this.state.current].component;
            const list = this.components[this.state.current].list;

            return (
                <main>
                    <NavBar user={this.state.user} update_page={this.update_page} items={Object.keys(this.components)} handle_logout={this.handle_logout} />
                    <ErrorBoundary>
                        {Component ? <Component user={this.state.user} update_list={this.update_list} list={this.state[list]} /> : null}
                    </ErrorBoundary>
                </main>
            );
        } else {
            return <Login handle_login={this.handle_login} />;
        }
    }
}

export default App;
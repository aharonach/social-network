import Login from './Login.js';
import NavBar from './NavBar.js';
import Posts from './Posts/Posts.js';
import Messages from './Messages/Messages.js';

class App extends React.Component {
    constructor( props ) {
        super( props );

        this.components = {
            'Home':  {
                component: Posts,
                list: 'posts',
            },
            'Messages':  {
                component: Messages,
                list: 'messages',
            },
            // 'Users': Users
        };

        this.state = {
            token: this.get_cookie('token'),
            users: [],
            posts: [],
            messages: [],
            current: 'Home',
        };

        this.update_token = this.update_token.bind(this);
        this.update_page = this.update_page.bind(this);
        this.update_list = this.update_list.bind(this);
    }

    update_list(name, list) {
        this.setState({ [name]: list });
    }

    get_cookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return '';
    }

    update_token(token) {
        this.setState({ token: token });
    }

    update_page(page) {
        this.setState({ current: page });
    }

    render() {
        if ( this.state.token ) {
            const Component = this.components[this.state.current].component;
            const list = this.components[this.state.current].list;

            return (
                <main>
                    <NavBar update_page={this.update_page} items={Object.keys(this.components)} update_token={this.update_token} />
                    {Component ? <Component update_list={this.update_list} token={this.state.token} list={this.state[list]} /> : null}
                </main>
            );
        } else {
            return <Login set_token={this.update_token} />;
        }
    }
}

export default App;
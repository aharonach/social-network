import * as requests from './helpers/requests.js';
import * as cookies from './helpers/cookies.js';
import Logo from './Logo.js';
import Login from './Login.js';
import About from './About.js';
import NavBar from './NavBar.js';
import Posts from './Posts/Posts.js';
import Messages from './Messages/Messages.js';
import Admin from './Admin/Admin.js';

class App extends React.Component {
    components = [
        { label: 'Home', component: Posts, list: 'posts', indicator: 'new_posts' },
        { label: 'Messages', component: Messages, list: 'messages', indicator: 'new_messages' },
        { label: 'About', component: About },
        { label: 'Admin Dashboard', component: Admin, admin: true }
    ]

    constructor(props) {
        super(props);

        this.default_state = {
            posts: [],
            messages: [],
            intervals: [],
            new_posts: false,
            new_messages: false,
            user: null,
            current: 0,
            error: '',
        };

        this.state = Object.assign({}, this.default_state);

        this.handle_login = this.handle_login.bind(this);
        this.handle_logout = this.handle_logout.bind(this);
        this.update_page = this.update_page.bind(this);
        this.update_list = this.update_list.bind(this);
        this.interval_callback = this.interval_callback.bind(this);
        this.get_indicator = this.get_indicator.bind(this);
    }

    update_list(name, list) {
        this.setState({ [name]: list });
    }

    update_page(page) {
        const { indicator } = this.components[page];

        if ( indicator != undefined ) {
            this.setState({ [indicator]: false, current: page });
        }

        this.setState({ current: page });
    }

    get_indicator(indicator) {
        return this.state[indicator];
    }

    async handle_login(token) {
        cookies.set('token', token);

        try {
            const user = await requests.do_get('/api/user');

            if (user.id) {
                this.setState({
                    user: user,
                    intervals: this.set_intervals(),
                    posts: await requests.fetch_posts(),
                    messages: await requests.fetch_messages(),
                    error: ''
                });
            }
        } catch (e) {
            cookies.set('token', '');
            this.clear_intervals();
            this.setState({ ...this.default_state, error: e.message });
        }
    }

    async handle_logout() {
        const result = await requests.do_post('/api/logout');

        if (result.success) {
            cookies.set('token', '');
            this.clear_intervals();
            this.setState(this.default_state);
        }
    }

    set_intervals() {
        const intervals = [
            setInterval(this.interval_callback, 5000, 'posts', 0),
            setInterval(this.interval_callback, 5000, 'messages', 1),
        ];

        return intervals;
    }

    async interval_callback(page, page_index) {
        const result = await requests["fetch_" + page]();

        if (result.error == undefined) {
            // if we got more results than what we have, or
            // the first item id is different from the first id that we have
            // indicates that we got new items to show
            if (result[0]?.id != this.state[page][0]?.id) {
                if ( this.state.current == page_index ) {
                    this.setState({ ["new_" + page]: false, [page]: result });
                } else {
                    this.setState({ ["new_" + page]: true });
                }
            }
        }
    }

    clear_intervals() {
        this.state.intervals.forEach(interval => clearInterval(interval));
    }

    render() {
        try {
            if (this.state.user) {
                const Component = this.components[this.state.current].component;
                const list = this.components[this.state.current].list;
    
                return (
                    <>
                        <header>
                            <Logo />
                            <NavBar
                                className="main"
                                user={this.state.user}
                                indicator={this.get_indicator}
                                update_page={this.update_page}
                                handle_logout={this.handle_logout}
                                current={this.state.current}
                            >
                                {this.components}
                            </NavBar>
                        </header>
                        <main>
                            <Component user={this.state.user} update_list={this.update_list} list={this.state[list]} />
                        </main>
                    </>
                );
            }
    
            return <Login handle_login={this.handle_login} error={this.state.error} />;
        } catch( e) {
            return null;
        }
    }
}

export default App;
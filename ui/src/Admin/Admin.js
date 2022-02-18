import NavBar from "../NavBar.js";
import Users from './Users.js';
import MessageUsers from './MessageUsers.js';

class Admin extends React.Component {
    components = [
        { label: 'Manage Users', component: Users },
        { label: 'Message All Users', component: MessageUsers }
    ]

    state = {
        current: 0
    }

    constructor(props) {
        super(props);

        this.update_page = this.update_page.bind(this);
    }

    update_page(page) {
        this.setState({ current: page });
    }

    render() {
        const Component = this.components[this.state.current].component;

        return (
            <>
                <NavBar user={this.props.user} update_page={this.update_page} current={this.state.current}>{this.components}</NavBar>
                <Component user={this.props.user} />
            </>
        )
    }
}

export default Admin;
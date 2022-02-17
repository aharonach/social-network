class NavBar extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = { 
            user_role: '' 
        };

        this.update_page = this.update_page.bind(this);
        this.logout = this.logout.bind(this);
    }

    update_page( event ) {
        this.props.update_page(event.target.dataset.component);
    }

    logout() {
        this.props.handle_logout();
    }

    render() {
        return (
            <nav>
                <ul>
                    {this.props.items.map((item, index) => <li key={index}><a href="#" onClick={this.update_page} data-component={item}>{item}</a></li>)}
                    <li><a href="#" className="logout" onClick={this.logout}>Logout</a></li>
                </ul>
            </nav>
        );
    }
}

export default NavBar;
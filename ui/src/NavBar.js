class NavBar extends React.Component {
    constructor(props) {
        super(props);

        this.update_page = this.update_page.bind(this);
        this.logout = this.logout.bind(this);
    }

    update_page(event) {
        event.preventDefault();
        this.props.update_page(event.target.dataset.component);
    }

    logout(event) {
        event.preventDefault();
        this.props.handle_logout && this.props.handle_logout();
    }

    render() {
        return (
            <nav className={this.props.className}>
                <ul>
                    {this.props.children.map((item, index) => {
                        if ( item.admin && this.props.user.role !== 'admin' ) {
                            return null;
                        }

                        return (
                            <li key={index} className={this.props.current == index ? "current" : ""}>
                                <a href="#" onClick={this.update_page} data-component={index}>
                                    {item.label}
                                    {this.props.indicator && this.props.indicator(item.indicator) && <span className="badge"><i className="fa fa-bell-o" aria-hidden="true"> New</i></span>}
                                </a>
                            </li>
                        )
                    })}
                    {this.props.handle_logout && <li><a href="#" className="logout" onClick={this.logout}>Logout</a></li>}
                </ul>
            </nav>
        );
    }
}

export default NavBar;
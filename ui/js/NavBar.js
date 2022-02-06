class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      user_role: ''
    };
    this.update_page = this.update_page.bind(this);
    this.logout = this.logout.bind(this);
  }

  update_page(event) {
    this.props.update_page(event.target.dataset.component);
  }

  logout() {
    this.props.update_token('');
  }

  render() {
    return /*#__PURE__*/React.createElement("nav", null, /*#__PURE__*/React.createElement("ul", null, this.props.items.map((item, index) => /*#__PURE__*/React.createElement("li", {
      key: index
    }, /*#__PURE__*/React.createElement("a", {
      href: "#",
      onClick: this.update_page,
      "data-component": item
    }, item))), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
      href: "#",
      className: "logout",
      onClick: this.logout
    }, "Logout"))));
  }

}

export default NavBar;
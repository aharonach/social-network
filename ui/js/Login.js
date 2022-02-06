import Alert from './Alert.js';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: ''
    };
    this.handle_change = this.handle_change.bind(this);
    this.handle_login = this.handle_login.bind(this);
  }

  set_cookie(name, value) {
    document.cookie = name + "=" + value + ";path=/";
  }

  handle_change(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  async handle_login(event) {
    event.preventDefault();
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    });
    const json = await response.json();

    if (json?.error) {
      this.setState({
        error: json.error
      });
    } else {
      this.set_cookie('token', json.token);
      this.props.set_token(json.token);
    }
  }

  render() {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Alert, {
      show: !!this.state.error,
      type: "error",
      message: this.state.error
    }), /*#__PURE__*/React.createElement("form", {
      onSubmit: this.handle_login,
      className: "form"
    }, /*#__PURE__*/React.createElement("div", {
      className: "form-control"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "email"
    }, "Email"), /*#__PURE__*/React.createElement("input", {
      onChange: this.handle_change,
      name: "email",
      type: "email",
      id: "email",
      placeholder: "user@domain.com"
    })), /*#__PURE__*/React.createElement("div", {
      className: "form-control"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "password"
    }, "Password"), /*#__PURE__*/React.createElement("input", {
      onChange: this.handle_change,
      name: "password",
      type: "password",
      id: "password"
    })), /*#__PURE__*/React.createElement("div", {
      className: "form-control"
    }, /*#__PURE__*/React.createElement("button", {
      type: "submit"
    }, "Login"))));
  }

}

export default Login;
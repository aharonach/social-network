import Alert from '../Alert.js';

class NewPost extends React.Component {
  constructor(props) {
    super(props);
    this.default_state = {
      text: '',
      error: ''
    };
    this.state = this.default_state;
    this.handle_change = this.handle_change.bind(this);
    this.handle_post = this.handle_post.bind(this);
  }

  handle_change(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  async handle_post(e) {
    e.preventDefault();
    const response = await fetch('/api/posts', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': JSON.stringify({
          token: this.props.token
        })
      },
      body: JSON.stringify({
        text: this.state.text
      })
    });
    const json = await response.json();
    this.setState(json?.error ? {
      error: json.error
    } : this.default_state);
    this.props.update();
  }

  render() {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Alert, {
      show: !!this.state.error,
      type: "error",
      message: this.state.error
    }), /*#__PURE__*/React.createElement("form", {
      onSubmit: this.handle_post,
      className: "form"
    }, /*#__PURE__*/React.createElement("div", {
      className: "form-control"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "text"
    }, "Text"), /*#__PURE__*/React.createElement("textarea", {
      onChange: this.handle_change,
      name: "text",
      id: "text",
      value: this.state.text
    })), /*#__PURE__*/React.createElement("div", {
      className: "form-control"
    }, /*#__PURE__*/React.createElement("button", {
      type: "submit"
    }, "Submit"))));
  }

}

export default NewPost;
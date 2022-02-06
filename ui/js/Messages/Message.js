class Message extends React.Component {
  render() {
    const {
      message
    } = this.props;
    return /*#__PURE__*/React.createElement("div", {
      className: "card"
    }, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("span", null, message.date)), /*#__PURE__*/React.createElement("p", null, message.text));
  }

}

export default Message;
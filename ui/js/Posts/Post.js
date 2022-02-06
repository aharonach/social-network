class Post extends React.Component {
  render() {
    const {
      post
    } = this.props;
    return /*#__PURE__*/React.createElement("div", {
      className: "card"
    }, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("span", null, post.date)), /*#__PURE__*/React.createElement("p", null, post.text));
  }

}

export default Post;
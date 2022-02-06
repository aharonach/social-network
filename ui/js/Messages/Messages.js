import Message from './Message.js';

class Messages extends React.Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    this.fetch_and_update();
  }

  async fetch_and_update() {
    const data = await this.fetch_posts();
    this.props.update_list('messages', data);
  }

  async fetch_posts() {
    const response = await fetch('/api/user/messages', {
      headers: {
        'Authorization': JSON.stringify({
          token: this.props.token
        })
      }
    });
    const data = await response.json();
    return data?.error ? [] : data;
  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "cards"
    }, this.props.list.map(item => /*#__PURE__*/React.createElement(Message, {
      message: item,
      key: item.id
    })));
  }

}

export default Messages;
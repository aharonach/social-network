
class Message extends React.Component {
    render() {
        const { message } = this.props;

        return (
            <div className="card">
                <p><span>{message.date}</span></p>
                <p>{message.text}</p>
            </div>
        );
    }
}

export default Message;
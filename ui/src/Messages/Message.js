import * as helpers from '../helpers/functions.js';
import User from '../User.js';

class Message extends React.Component {
    render() {
        const { message } = this.props;

        return (
            <div className="card">
                <User id={message.from_id} />
                <p><span>{helpers.date(message.datetime)}</span></p>
                <p>{message.text}</p>
            </div>
        );
    }
}

export default Message;
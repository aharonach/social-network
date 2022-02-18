import * as requests from '../helpers/requests.js';
import Message from './Message.js';
import NewMessage from './NewMessage.js';
import Alert from '../Alert.js';

class Messages extends React.Component {
    constructor(props) {
        super(props);

        this.fetch_and_update = this.fetch_and_update.bind(this);
    }

    async componentDidMount() {
        this.fetch_and_update();
    }

    async fetch_and_update() {
        const data = await requests.fetch_messages();
        this.props.update_list('messages', data);
    }

    render() {
        return (
            <>
                <NewMessage update={this.fetch_and_update} />
                <div className="cards">
                    {this.props.list.length > 0 ?
                     this.props.list.map(item => <Message message={item} key={item.id} /> ) 
                     : <Alert type="warning" message="No messages!" />}
                </div>
            </>
        );
    }
}

export default Messages;
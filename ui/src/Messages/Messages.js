import * as requests from '../helpers/requests.js';
import Message from './Message.js';
import NewMessage from './NewMessage.js';

class Messages extends React.Component {
    constructor(props) {
        super(props);

        this.fetch_and_update = this.fetch_and_update.bind(this);
    }

    async componentDidMount() {
        this.fetch_and_update();
    }

    async fetch_and_update() {
        const data = await this.fetch_messages();
        this.props.update_list('messages', data);
    }

    async fetch_messages() {
        const data = await requests.do_get('/api/user/messages?orderby=datetime&order=desc');
        return data?.error ? [] : data;
	}

    render() {
        return (
            <>
                <NewMessage token={this.props.token} update={this.fetch_and_update} />
                <div className="cards">
                    {this.props.list.map(item => <Message message={item} key={item.id} /> )}
                </div>
            </>
        );
    }
}

export default Messages;
import * as requests from '../helpers/requests.js';
import Post from './Post.js';
import NewPost from './NewPost.js';
import Alert from '../Alert.js';

class Posts extends React.Component {
    constructor(props) {
        super(props);

        this.fetch_and_update = this.fetch_and_update.bind(this);
    }

    async componentDidMount() {
        this.fetch_and_update();
    }

    async fetch_and_update() {
        const data = await requests.fetch_posts();
        this.props.update_list('posts', data);
    }

    render() {
        return (
            <>
                <NewPost update={this.fetch_and_update} />
                <div className="cards">
                    {this.props.list.length > 0 ?
                     this.props.list.map(item => <Post key={item.id} post={item} user={this.props.user} update={this.fetch_and_update} /> ) 
                     : <Alert type="warning" message="No posts!" />}
                </div>
            </>
        );
    }
}

export default Posts;
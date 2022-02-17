import * as requests from '../helpers/requests.js';
import Post from './Post.js';
import NewPost from './NewPost.js';

class Posts extends React.Component {
    constructor(props) {
        super(props);

        this.fetch_and_update = this.fetch_and_update.bind(this);
    }

    async componentDidMount() {
        this.fetch_and_update();
    }

    async fetch_and_update() {
        const data = await this.fetch_posts();
        this.props.update_list('posts', data);
    }

    async fetch_posts() {
        const data = await requests.do_get('/api/posts?orderby=datetime&order=desc');
        return data?.error ? [] : data;
	}

    render() {
        return (
            <>
                <NewPost update={this.fetch_and_update} />
                <div className="cards">
                    {this.props.list.map(item => <Post key={item.id} post={item} user={this.props.user} update={this.fetch_and_update} /> )}
                </div>
            </>
        );
    }
}

export default Posts;
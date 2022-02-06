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
		const response = await fetch('/api/posts?orderby=datetime&order=desc', {
            headers: {
                'Authorization': JSON.stringify({ token: this.props.token }) 
            },
        });
        const data = await response.json();
        return data?.error ? [] : data;
	}

    render() {
        return (
            <>
                <NewPost token={this.props.token} update={this.fetch_and_update} />
                <div className="cards">
                    {this.props.list.map(item => <Post post={item} key={item.id} /> )}
                </div>
            </>
        );
    }
}

export default Posts;
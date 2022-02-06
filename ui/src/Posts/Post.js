
class Post extends React.Component {
    render() {
        const { post } = this.props;

        return (
            <div className="card">
                <p><span>{post.date}</span></p>
                <p>{post.text}</p>
            </div>
        );
    }
}

export default Post;
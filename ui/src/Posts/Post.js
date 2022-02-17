import * as requests from '../helpers/requests.js';
import * as helpers from '../helpers/functions.js';
import User from '../User.js';

class Post extends React.Component {
    constructor(props) {
        super(props);

        this.handle_delete = this.handle_delete.bind(this);
    }

    async handle_delete() {
        const url = this.props.user.role == 'admin' ? '/api/admin/posts/' : '/api/posts/';
        const result = await requests.do_delete(url + this.props.post.id);
        
        if ( result.success ) {
            this.props.update();
        }
    }

    check_permissions(user_id) {
        return this.props.user.id == user_id || this.props.user.role == 'admin';
    }

    render_actions(user_id) {
        return (
            <>
            {this.check_permissions(user_id) && 
                <div className="actions">
                    <a href="#" className="delete" onClick={this.handle_delete}><i className="fa fa-trash" aria-hidden="true"></i> Delete</a>
                </div>
            }
            </>
        );
    }

    render() {
        const { post } = this.props;

        return (
            <div className="card">
                <User key={post.user_id} id={post.user_id} />
                <p><span>{helpers.date(post.datetime)}</span></p>
                <p>{post.text}</p>
                {this.render_actions(post)}
            </div>
        );
    }
}

export default Post;
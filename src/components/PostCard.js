import React from 'react';
import SectionHeader from '../components/SectionHeader';

class PostCard extends React.Component {

    render() {

        let post = this.props.post

        return (
            <div>
                <div className="row">
                    <div className="col-md-2">
                        <img className="float-left img-fluid" src={post.coverPhotoUrl} />
                    </div>
                    <div className="col-md-10">
                        <h3>{post.title}</h3>
                        <h5>{post.subtitle}</h5>
                        <p>{post.bodyText}</p>
                        <button className="btn btn-outline-success my-2 my-sm-0">
                            More
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default PostCard;
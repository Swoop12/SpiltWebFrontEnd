import React from 'react';
import '../styles/publicStyles.css';

class FeaturedContent extends React.Component {

    static defaultProps = {
        post: {
            title: "Welcome to Spilt.Coffee",
            subtitle: "A Coffee App for Coffee People",
            bodyText: "We like coffee.  We hope you do too.",
            isFeatured: true,
            coverPhotoUrl: "https://cdn.cnn.com/cnnnext/dam/assets/150929101049-black-coffee-stock-super-tease.jpg",
            roasterInfo: {
                name: "Patrick Adcock",
                id: "3519Z"
            }
        }
    }

    render() {
        let post = this.props.post
        return (
            <div className="card">
                <div className="card-body">
                    <div style={{ backgroundImage: `url(${post.coverPhotoUrl})` }} className="header-image row">
                        <div className="col-md-12">
                            <div className="img-fluid">
                                <div className="float-left">
                                    <h3>{post.title}</h3>
                                </div>
                                <div className="float-right">
                                    <h4>{post.roasterInfo.name}</h4>
                                    <p>{post.date}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row container">
                        <div className="col-md-12">
                            <p>
                                {post.bodyText}
                            </p>
                            <button className=" btn btn-outline-success"> More </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default FeaturedContent;
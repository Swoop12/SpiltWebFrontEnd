import React from 'react';
import "../styles/publicStyles.css";

class RoasterFeature extends React.Component {
    
    render () {
        return (
            <div className="row">
                <img className="col-lg-6 col-md-12" src="https://us.camposcoffee.com/wp-content/uploads/2016/09/coffee-drying-cherry-campos.jpg"></img>
                <div className="col-lg-6 col-md-12">
                    <h3>Campos Coffee</h3>
                    <p>Salt Lake City, UT</p>
                    <p>
                        Many conventional colleges and universities are now offering online DVD repair courses, which are the exact same as those taught on a traditional college campus, to distance learners. Online education is generally taught through the use of several different methods, including online satellite feeds, correspondence or online lessons. This technique permits the student to obtain a DVD repair degree without ever having to step inside of a classroom. An online education, providing that it is granted by a regionally accredited college or university, is broadly accepted as worthy training for any job in the direct field of study.
                    </p>
                </div>
            </div>
        );
    }
}

export default RoasterFeature;
import React from 'react';
import FeaturedContent from './FeaturedContent';
import ProductCard from './ProductCard';
import '../styles/publicStyles.css'
import SectionHeader from './SectionHeader';
import RoasterFeature from './RoasterFeature';

class Home extends React.Component {

    render() {
        return (
            <div>
                <SectionHeader />
                <div class="row">
                    <div className="col-sm-12 content-card">
                        <FeaturedContent />
                    </div>
                </div>
                <div class="row">
                    <div className="col-lg-6 content-card">
                        <FeaturedContent />
                    </div>
                    <div className="col-lg-6 content-card">
                        <FeaturedContent />
                    </div>
                </div>

                <SectionHeader />

                <div class="row">
                    <div className="col-lg-1"></div>
                    <div className="col-lg-5 content-card">
                        <ProductCard />
                    </div>
                    <div className="col-lg-5 content-card">
                        <ProductCard />
                    </div>
                    <div className="col-lg-1"></div>
                </div>

                <div class="row">
                    <div className="col-lg-1"></div>
                    <div className="col-lg-5 content-card">
                        <ProductCard />
                    </div>
                    <div className="col-lg-5 content-card">
                        <ProductCard />
                    </div>
                    <div className="col-lg-1"></div>
                </div>

                <SectionHeader />

                <RoasterFeature />

            </div>
        );
    }
}

export default Home;
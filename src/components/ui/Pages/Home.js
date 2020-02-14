import React from 'react';
import FeaturedContent from '../components/FeaturedContent';
import ProductCard from '../components/ProductCard';
import '../../../styles/publicStyles.css'
import SectionHeader from '../Elements/SectionHeader'
import PostCard from '../components/PostCard';

class Home extends React.Component {

    render() {
        return (
            <div>
                <SectionHeader>Featured</SectionHeader>
                <FeaturedContent/>

                <SectionHeader>Posts</SectionHeader>
                <PostCard />
                <PostCard />
                <PostCard />

                <SectionHeader>Products</SectionHeader>
                <ProductCard />
                <ProductCard />
                <ProductCard />
            </div>
        );
    }
}

export default Home;
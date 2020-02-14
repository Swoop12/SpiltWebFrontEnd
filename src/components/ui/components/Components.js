import React, { Component } from 'react'
import SectionHeader from '../Elements/SectionHeader'
import FeaturedContent from './FeaturedContent'
import { LargeTitle } from '../Elements/Typography'
import StackedFilter from '../Elements/StackedFilter'
import PostCard from './PostCard'
import ProductCard from './ProductCard'
import Banner from './Banner'
import RoasterCard from './RoasterCard'

class Components extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <div style={{ background: this.props.theme.background, marginTop: '24px' }}>
                <LargeTitle>Components</LargeTitle>

                <SectionHeader>Featured Content</SectionHeader>
                <FeaturedContent></FeaturedContent>

                <SectionHeader>Post Card</SectionHeader>
                <PostCard />

                <SectionHeader>Banner</SectionHeader>
                <Banner/>

                <SectionHeader>Product Card</SectionHeader>
                <div className="flexer justify-center">
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                </div>

                <SectionHeader>Roaster Card</SectionHeader>
                <div className="flexer justify-center">
                    <RoasterCard />
                    <RoasterCard />
                    <RoasterCard />
                </div>
            </div>
        )
    }
}

export default Components

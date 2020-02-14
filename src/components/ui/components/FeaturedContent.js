import React from 'react';
import Card from '../Elements/Card'
import ImageView from '../Elements/ImageView';
import { OutlineButton } from '../Elements/Buttons';
import { Link } from "react-router-dom";
import { Title1, Body, Caption1 } from '../Elements/Typography'
import GradientBackground from '../Elements/Gradients';
import { themes } from '../Elements/Theme';
import AppContext from '../../../contexts/AppContext'

class FeaturedContent extends React.Component {

    static contextType = AppContext

    static defaultProps = {
        post: {
            id: "123456",
            title: "Welcome to Spilt.Coffee",
            subtitle: "A Coffee App for Coffee People",
            bodyText: "We like coffee.  We hope you do too.",
            date: 'January 4th, 2020',
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
        let theme = this.context.theme
        let topGradientColor = "#000000"
        let bottomGradientColor = "#EEEEEE17"
        return (
            <Card style={{ padding: '0' }}>
                <ImageView src={post.coverPhotoUrl}
                    style={{
                        height: '300px',
                        position: 'relative'
                    }}>
                    <GradientBackground
                        start={bottomGradientColor}
                        end={topGradientColor}
                        direction="top" >
                        <div className="flexer space-between"
                            style={{
                                color: themes.dark.text,
                                padding: '24px'
                            }}>
                            <Title1
                                style={{color: "white"}}
                            >
                            {post.title}
                            </Title1>
                            <div className="vertical-container align-all-end">
                                <Body style={{padding: '0', margin: '0'}}>
                                    {post.roasterInfo.name
                                }</Body>
                                <Caption1 style={{padding: '0', margin: '0'}}>
                                    {post.date}
                                </Caption1>
                            </div>
                        </div>
                    </GradientBackground>
                </ImageView>
                <div className="vertical-container flex-center"
                    style={{padding: '16px'}}>
                    <Body style={{color: theme.text}}>{post.bodyText}</Body>
                    <Link to={`/posts/${post.id}`}>
                        <OutlineButton>More</OutlineButton>
                    </Link>
                </div>
            </Card>
        )
    }
}

export default FeaturedContent;
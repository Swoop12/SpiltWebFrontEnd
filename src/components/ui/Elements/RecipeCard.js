import React from 'react';
import Card from './Card';
import ImageView from './ImageView';
import { Title3, Caption2, InternalLink } from './Typography';
import { recipes } from '../../../services/Mock/MockDatabase'

function RecipeCard(props) {
    return (
        <Card style={{
            padding: 0,
            ...props.style
                }}>
            <InternalLink to={props.route}>
            <ImageView
                src={props.coverPhotoUrl}
                style={{
                    width: "100%",
                    height: "150px"
                }}/>
            <div className="vertical-container"
                style={{padding: "8px"}}>
                <Title3>{props.title}</Title3>
                <Caption2>{props.brewTime}</Caption2>
            </div>
            </InternalLink>
        </Card>
    )
}

RecipeCard.defaultProps = recipes[0]

export default RecipeCard;

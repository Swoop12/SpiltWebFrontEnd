import React, { useEffect } from 'react';
import { Title1, Subhead } from '../Elements/Typography';
import { serviceFactory } from '../../../services/ServiceFactory';
import QuillEditor from '../../QuillEditor';
import Spinner from 'react-spinkit'

class BrewDetail extends React.Component {
    constructor(props) {
        super(props)
        this.quillRef = React.createRef()
        this.state = {}
    }

    componentDidMount() {
        const recipeId = this.props.match.params.recipeId
        serviceFactory.recipeService().fetchRecipeDetailsWitId(recipeId)
            .then(recipe => {
                this.setState({ recipe })
                debugger
                this.quillRef.current.setContent(recipe.instructions.body)
            })
    }

    render() {
        const recipe = this.state.recipe
        const views = () => {
            if (!recipe) {
                return <Spinner name='chasing-dots' />
            } else {
                return (
                    <div className="container standard-spacing-container">
                        <Title1>{recipe.title}</Title1>
                        <hr />
                        {recipe.author && (
                            <Subhead>{recipe.author.name}</Subhead>
                        )}
                        <Subhead>Brew Time: {recipe.brewTime}</Subhead>

                        <div
                            style={{
                                paddingTop: "50%",
                                position: "relative",
                                width: "100%"
                            }}>
                            <iframe
                                title="Recipe Upload"
                                style={{
                                    position: "absolute",
                                    width: "100%",
                                    height: "100%",
                                    top: "0px"
                                }}
                                src={recipe.videoLink}
                                frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowfullscreen={true}>
                            </iframe>
                        </div>
                        <QuillEditor readonly={true} ref={this.quillRef} />
                    </div>
                )
            }
        }

        return (
            views()
        )
    }
}

export default BrewDetail;

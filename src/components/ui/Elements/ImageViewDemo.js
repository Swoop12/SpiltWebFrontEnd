import React, { useState } from 'react'
import TextField from './TextField'
import Card from './Card'
import ImageView from './ImageView'
import { Caption1 } from './Typography'
import { OutlineButton } from './Buttons'

function ImageViewDemo(props) {

    const [value, setValue] = useState(123456);
    const [photoId, setPhotoId] = useState(123456);

    return (
        <div className='space-even wrap'>
            <Card style={{ flexGrow: '1' }}>
                <ImageView className='sample-image' />
                <Caption1>Standard Placeholder</Caption1>
            </Card>
            <Card style={{ flexGrow: '1' }}>
                <ImageView
                    className='sample-image'
                    src="http://localhost:4001/SpiltBackend/images/objectiveclogo.png"
                />
                <Caption1>Standard Placeholder</Caption1>
            </Card>
            <Card style={{ flexGrow: '1' }}>
                <ImageView className='sample-image' photoId={photoId} />
                <Caption1>Photo Id</Caption1>
                <div className='flexer'>
                    <TextField
                        value={value}
                        onChange={setValue}
                        label="Search a Photo"
                    ></TextField>
                    <OutlineButton
                        onClick={e => {
                            setPhotoId(value)
                        }}>
                        Go
                    </OutlineButton>
                </div>
            </Card>
        </div>
    )
}

export default ImageViewDemo


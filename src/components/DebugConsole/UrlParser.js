import React from 'react';
import { cleanUrl, parserForUrl } from '../../services/Utils'

function UrlParser() {
    const [inputText, setInputText] = React.useState('')

    return (
        <div>
            <input type='text'
                placeholder='user input'
                value={inputText}
                onChange={e => setInputText(e.target.value)} />
            <button
                onClick={() => {
                    console.dir(parserForUrl(cleanUrl(inputText)))
                }}>
                Parse
            </button>
        </div>
    )
}

export default UrlParser;

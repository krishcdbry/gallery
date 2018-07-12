import React from 'react';
import shallowCompare from 'react-addons-shallow-compare'; // ES6

import {
    propTypes, 
    defaultProps,

    fadeInObj,
    fadeOutObj,

    IMAGE_STATE_SUCCESS
} from './constants';

/**
 * @name : GalleryItem
 * @description : This class handles placeholders/error as per image loading status
 * @argument {*} props
 * @argument {*} propTypes
 * @argument {*} defaultProps
 * @author krishcdbry
 */
class GalleryItem extends React.PureComponent {

    /**
     * @constructor
     * @param {*} context 
     * @param {*} props 
     */
    constructor (context, props) {
        super(context, props);

        let {src} = this.props;

        let style = {
            'background' : 'url('+src+')',
            'backgroundSize' : 'cover',
            'backgroundPosition': 'center',
            'transition': "opacity 1.0s",
        }

       style = Object.assign({}, style, fadeOutObj); // For fadeIn/out animation when image source loads
        
       this.state = {
            style,
            imageState: null,
            src      
        }
    }

    /**
     * @name imageLoaded
     * @description If image loaded successfully, It updates the imageState prop of the state @ component
     * @method GalleryItem
     */
    _imageLoaded () {
        if (this.state.imageState == IMAGE_STATE_SUCCESS) {
            return;
        }
        this.setState({
            imageState : IMAGE_STATE_SUCCESS
        });
    }

    /**
     * @name createAsyncImage
     * @description Creates an Async dynamic image to loaded original source in the background
     * @method GalleryItem
     */
    _simulateAsyncImage () {
        let realImage = new Image();
        realImage.onload = () => {
            this._imageLoaded();
        }
        realImage.src = this.state.src;
    }

    /**
     * @name componentDidMound
     * @description Once component successfully mounted then it triggers the createAsyncImage method
     * @method GalleryItem
     */
    componentDidMount() {
        if (this.state.src) {
            this._simulateAsyncImage();
        }
    }

    _updateStyle(style) {
        if (style.opacity == this.state.style.opacity) {
            return;
        }
        let imageStyle = Object.assign({}, this.state.style, style);
        this.setState({
            style : imageStyle
        })
    }

     /**
     * @description Creates an Image with props, style and source attribute
     * @param {*} props 
     * @method GalleryItem
     * @returns HTML
     */
    _createImageElement () {
        return <div style={this.state.style}></div>;
    }

    /**
     * @name render
     * @description renders the component according to the image state and returns the appropriate HTML
     * @method GalleryItem
     * @returns HTML
     */
    render () {
        let renderElem = null;
        switch (this.state.imageState) {
            case IMAGE_STATE_SUCCESS : 
                renderElem = this._createImageElement();
                setTimeout(() => {
                   this._updateStyle(fadeInObj)
                }, 100);
                break;          
        }
    
        return renderElem;
    }
}

GalleryItem.propTypes = propTypes;

export default GalleryItem;
import PropTypes from 'prop-types';

const IMAGE_STATE_SUCCESS = 'success';        // Once successfully loaded

const propTypes = {
    src : PropTypes.string.isRequired,         // Source path of the image to be loaded + displayed
}

const fadeInObj = {                            // FadeIn animation when image loads
    opacity: "1",
    transition: "opacity 2.0s"
}

const fadeOutObj = {
    opacity: "0",
    transition: "opacity 0.0s"
}


export {
    propTypes,
    
    fadeInObj,
    fadeOutObj,

    IMAGE_STATE_SUCCESS
}
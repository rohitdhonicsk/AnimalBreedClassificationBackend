import React, { Component } from 'react'

export default class ImagePreview extends Component {
    render() {
        const src = this.props.imgPath;
        console.log("Image preview", src);
        return (
            <div>

                <img src={src} height="400px" width="80%" ></img>
            </div>
        )
    }
}

import React, { Component } from 'react'

export default class ImagePreview extends Component {
    render() {
        const src = this.props.imgPath;
        return (
            <div>

                <img src={src} height="400px" width="80%" ></img>
            </div>
        )
    }
}

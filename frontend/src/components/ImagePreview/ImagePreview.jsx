import React, { Component } from 'react'

export default class ImagePreview extends Component {
    render() {
        const src = this.props.imgPath;
        return (
            <div>ImagePreview

                <img src={src}></img>
            </div>
        )
    }
}

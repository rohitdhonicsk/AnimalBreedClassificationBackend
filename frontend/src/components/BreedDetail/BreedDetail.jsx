import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import SideBar from '../SideBar/SideBar'
import ImagePreview from '../ImagePreview/ImagePreview'
import Card from '../Card/Card'
import "./BreedDetail.css"

class BreedDetail extends Component {
    state = {
        image: "",

    }


    render() {
        const { breedData, selectedBreed, breedList, handleSelectBreed } = this.props;
        let imgPath = "";

        try {
            imgPath = breedData["Detail"]["Image"]
        }
        catch (err) {

        }
        console.log("Inside breedDetail", breedData, breedList, selectedBreed)
        return (

            <div className='breedContainer'>
                <div className="sideBar"> <SideBar data={breedList}
                    handleChange={handleSelectBreed}
                    selected={selectedBreed}>

                </SideBar></div>
                <div className="imagePreview">
                    <ImagePreview imgPath={imgPath}></ImagePreview>
                </div>
                {/* <Card></Card> */}
            </div>

        )
    }
}

export default withRouter(BreedDetail);
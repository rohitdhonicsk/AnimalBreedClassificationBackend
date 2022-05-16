import React, { Component } from "react";
import {
    Button,
    ButtonGroup,
    Stack,
    Input,
    Typography,
    Container,
} from "@mui/material";
import Card from "../Card/Card";
import { styled } from "@mui/material/styles";
import "./upload.css";
import ImagePreview from "../ImagePreview/ImagePreview";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            src: "",
            name: "",
            breedData: "",
            predicted: "",
        };
        this.myInput = React.createRef();
    }
    fileSelectedHandler = (event) => {
        // event.preventDefault();
        this.setState({
            selectedFile: event.target.files[0],
            src: URL.createObjectURL(event.target.files[0]),
            name: event.target.files[0].name,
            breedData: ""
        });
        console.log(" src ", this.state.src, "dd ", URL.createObjectURL(event.target.files[0]), "ad")
    };
    triggerClick = () => {
        // this.myInput.current.click();
    };

    fileUploadHandler = () => {
        console.log("file upload triggered");
    };

    handleSubmit = async () => {
        if (this.state.selectedFile) {
            //&& this.state.desc
            const formdata = new FormData();
            formdata.append("file", this.state.selectedFile);
            axios({
                method: "post",
                url: "http://127.0.0.1:5000/predict",
                data: formdata,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
                .then((response) => response.data)
                .then(
                    (data) => {
                        this.setState(prevState => {
                            return { ...prevState, predicted: data };
                        });
                        // this.setState({ .., predicted: data });
                        this.fetchBreedData(data);
                    }

                );
        } else {
            alert("Image Not Uploaded!");
        }
    };
    fetchBreedData = async (breed) => {
        if (breed == "Acadian Flycatcher Bird") {
            console.log("under aa gya")
            await axios.get("http://127.0.0.1:5000/animal/" + "bird" + "?breed=Acadian Flycatcher").then
                ((data) => data.data).then((data) => {
                    this.setState({ breedData: data });
                });
        }
    }
    handleReset = (e) => {
        this.setState({ selectedFile: null, src: "", name: "", predicted: "", breedData: "" });
    };
    render() {
        return (
            <div className="uploadContainer">
                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={2}
                    sx={{ mx: "auto" }}
                >
                    <label htmlFor="contained-button-file">
                        <Input
                            sx={{ display: "none" }}
                            accept="image/*"
                            id="contained-button-file"
                            multiple
                            type="file"
                            onChange={this.fileSelectedHandler}
                            // onClick={this.fileSelectedHandler}
                            // onClick={}
                            ref={this.myInput}
                        />
                        <Button
                            variant="contained"
                            component="span"
                            // onClick={this.triggerClick}
                            onChange={this.fileUploadHandler}
                        >
                            Upload
                        </Button>
                    </label>
                    <Typography>
                        {this.state.selectedFile ? this.state.selectedFile.name : ""}
                    </Typography>
                </Stack>
                <div id="bottomrow">
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <ButtonGroup
                            sx={{ mx: "auto", textAlign: "center" }}
                            variant="text"
                            aria-label="text button group"
                            size="large"
                        >
                            <Button onClick={this.handleSubmit}>Predict</Button>
                            <Button onClick={this.handleReset}>Reset</Button>
                        </ButtonGroup>
                    </Stack>
                </div>
                <div style={{ marginTop: "10px" }}>
                    {this.state.src != "" ? (
                        <ImagePreview
                            imgPath={this.state.src}
                            style={{ border: "2px solid black" }}
                            alt=""
                        />) : ""}
                    {this.state.predicted != "" ? (
                        <>
                            <h5>Predicted Breed and Animal:</h5>
                            <h5>{this.state.predicted}</h5></>) : ""}
                    {
                        this.state.breedData != "" ? (
                            <Card data={this.state.breedData}></Card>) :
                            (console.log("breed data not found"))
                    }


                    {
                        console.log(" src ", this.state.src)
                    }
                </div>
            </div>
        );
    }
}
export default withRouter(Upload);

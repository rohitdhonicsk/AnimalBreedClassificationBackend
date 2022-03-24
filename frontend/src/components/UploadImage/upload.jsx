import React, { Component } from "react";
import {
  Button,
  ButtonGroup,
  Stack,
  Input,
  Typography,
  Container,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import "./upload.css";
// import { Link} from 'react-router-dom'
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      src: "",
      name: "",
      // desc: "",
      predicted: "",
    };
    this.myInput = React.createRef();
  }
  fileSelectedHandler = (event) => {
    console.log(event.target);
    console.log(event.target.files[0]);
    this.setState({
      selectedFile: event.target.files[0],
      src: URL.createObjectURL(event.target.files[0]),
      name: event.target.files[0].name,
    });
  };
  triggerClick = () => {
    this.myInput.current.click();
  };

  fileUploadHandler = () => {
    /* file upload triggered */
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
        // crossOrigin:'*',
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((response) => response.data)
        .then(
          (data) =>
            // this.props.history.push({
            //     pathname :'/detail/' + data,
            //     state:{ file:this.state.src}
            //     }
            // )
            this.setState({ predicted: data })
          // return null;
        );

      // return  <Link to={{ pathname: `/detail/${this.state.name}`, state: { file:this.state.src} }}></Link>

      console.log("hii");
      await new Promise((r) => setTimeout(r, 1000));

      console.log("masi");
      // this.props.history.push('/detail/' + this.state.selectedFile.name)
      console.log(this.state.name);
    } else {
      alert("Image Not Uploaded!");
    }
  };
  // handleChange = (e) => {

  //     this.setState({ desc: e.target.value });
  //     console.log(this.state.desc)
  // }
  handleReset = (e) => {
    this.setState({ selectedFile: null, src: "", name: "", predicted: "" }); //, desc: ""
  };
  render() {
    return (
      <div className="uploadContainer">
        {/* <div> */}
        {/* <h5 style={{ display: "inline", marginRight: "40px" }}>
            Upload File
          </h5> */}
        {/* <input
            style={{ display: "none" }}
            type={"file"}
            onChange={this.fileSelectedHandler}
            ref={this.myInput}
            accept="Image/*"
          /> */}
        {/* <Button
            style={{ backgroundColor: "white", border: "none" }}
            onClick={this.triggerClick}
            onChange={this.fileUploadHandler}
          >
            <FaFileImage style={{ fontSize: "40px", color: "black" }} />
          </Button> */}

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
            {/*style={{ display: "inline" }}*/}
            {this.state.selectedFile ? this.state.selectedFile.name : ""}
          </Typography>
        </Stack>
        {/* </div> */}
        {/* <div style={{ marginTop: "25px" }}>
          <h5 style={{ display: "inline", marginRight: "20px" }}>
            File Description
          </h5>
          <input
            type="text"
            onChange={this.handleChange}
            placeholder="Enter Description"
            size="90"
            value={this.state.desc}
          ></input>
        </div> */}
        {/* <div className="buttonArea"> */}
        {/* <div> */}
        {/* <Link to="/videos"> */}
        {/* <Button onClick={this.handleSubmit}>Upload</Button> */}
        {/* </Link> */}
        {/* </div> */}
        {/* <div> */}
        {/* <Button variant="success" onClick={this.handleReset}> */}
        {/* Reset */}
        {/* </Button> */}
        {/* </div> */}
        {/* </div> */}
        <div id="bottomrow">
          <Stack direction="row" alignItems="center" spacing={2}>
            <ButtonGroup
              sx={{ mx: "auto", textAlign: "center" }}
              // style={{ alignItems: "center" }}
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
          {
            // console.log("mai hoo");
            this.state.predicted != "" ? (
              <div>
                <img
                  src={this.state.src}
                  style={{ border: "2px solid black" }}
                  width="400px"
                  height="400px"
                  alt=""
                />

                <h5>Predicted Animal:</h5>
                <h5>{this.state.predicted}</h5>
              </div>
            ) : (
              ""
            )
          }
        </div>
      </div>
    );
  }
}
export default withRouter(Upload);

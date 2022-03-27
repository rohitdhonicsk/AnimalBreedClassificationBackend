import Detail from "../ShowDetail/Detail";
import Upload from "../UploadImage/upload";
// import { NavLink } from "react-router-dom";
import { React, Component } from "react";
import { Route } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
export default class Header extends Component {
  render() {
    return (
      <div>
        <div className="headerb">
          <AppBar position="sticky">
            <Toolbar variant="dense">
              <Button
                href="/detail/show"
                className="child"
                color="inherit"
                variant="text"
                size="large"
                sx={{ "&:hover": { color: "white" } }}
              >
                Database
              </Button>
              <Button
                href="/upload"
                className="child"
                color="inherit"
                variant="text"
                size="large"
                sx={{ "&:hover": { color: "white" } }}
              >
                Analyze
              </Button>
            </Toolbar>
          </AppBar>
          {/* <NavLink to='/detail' activeClassName="active" >
                        <button className="child">
                            Show Detail
                        </button>

                    </NavLink> */}

          {/* <NavLink to='/upload' activeClassName="active" default>
                        <button className="child">
                            Upload Image
                        </button>

                    </NavLink> */}
        </div>
        {/* <Redirect exact from="/" to="/videolist" /> */}
        <Route exact path={["/", "/upload"]}>
          <Upload />
        </Route>
        {/* <Route exact path="/videos/upload"  >
                        <Upload></Upload>
                </Route> */}
        {/* <Route exact path="/detail"  ><Detail /></Route> */}
        <Route exact path="/detail/:name" component={Detail} />

        {/*
                <Route exact path="/videolist" >

                </Route>
                <Route exact path="/editvideo"  >

                </Route>
                <Route exact path="/playvideo" >

                </Route> */}
      </div>
    );
  }
}

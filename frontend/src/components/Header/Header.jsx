import Detail from "../ShowDetail/Detail";
import Upload from "../UploadImage/upload";
import { NavLink } from "react-router-dom";
import {React,Component} from "react";
import { Route } from "react-router-dom";
export default class Header extends Component {
    render() {
        return (
            <div>
                <div className="headerb">
                    <NavLink to='/detail' activeClassName="active" >
                        <button className="child">
                            Show Detail
                        </button>

                    </NavLink>
                    

                    <NavLink to='/upload' activeClassName="active" default>
                        <button className="child">
                            Upload Image
                        </button>

                    </NavLink>
                </div>
                {/* <Redirect exact from="/" to="/videolist" /> */}
                 <Route exact path={['/','/upload']}  >
                    <Upload />
                </Route>
                {/* <Route exact path="/videos/upload"  >
                        <Upload></Upload>
                </Route> */}
                {/* <Route exact path="/detail"  ><Detail /></Route> */}
                <Route exact path="/detail/:name"  component={Detail}/>
                
                
                {/*
                <Route exact path="/videolist" >

                </Route>
                <Route exact path="/editvideo"  >

                </Route>
                <Route exact path="/playvideo" >

                </Route> */}

            </div>
        )
    }
}




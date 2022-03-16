import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class Detail extends Component {
  render() {
    console.log(this.props);
    console.log("hello");
    return (
    
      <div  style={{ margin: "220px" }}>
        <h1>hello</h1>
        {/* <img src={this.props.state.file} alt=""></img> */}
      </div>

    )
  }
}

export default withRouter(Detail);
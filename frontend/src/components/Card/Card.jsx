import React, { Component } from 'react'
import { Table } from 'react-bootstrap'


export default class Card extends Component {
  render() {
    const BreedData = this.props.data;
    console.log("Car", BreedData)
    return (

      <div>
        <Table responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Personal Detail</th>
              {/* <th></th> */}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td><b>Food</b></td>
              {
                BreedData["Detail"]["Food"].map((item, index) => {
                  return <td>{item}</td>
                })

              }
            </tr>
            <tr>
              <td></td>
              <td><b>Climate Zone</b></td>
              {
                BreedData["other"]["Climate Zones"].map((item, index) => {
                  return <td>{item}</td>
                })

              }
            </tr>
            <tr>
              <td></td>
              <td><b>Length</b></td>

              <td>{BreedData["Detail"]["Length"]}</td>
            </tr>
            <tr>
              <td></td>
              <td><b>Weight</b></td>

              <td>{BreedData["Detail"]["Weight"]}</td>
            </tr>
            <tr>
              <td></td>
              <td><b>WingSpan</b></td>

              <td>{BreedData["Detail"]["WingSpan"]}</td>
            </tr>
            <tr>
              <td></td>
              <td><b>Seasonal Behaviour</b></td>

              <td>{BreedData["Detail"]["Seasonal Behaviour"]}</td>
            </tr>
            <tr>
              <td></td>
              <td><b>More Info</b></td>

              <td><a href={BreedData["Detail"]["MoreInfo"]}> OpenWiki</a></td>
            </tr>

          </tbody>
        </Table>

        <Table responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Scientific Info</th>
              {/* <th></th> */}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              {Object.entries(BreedData["Scientific"]).map(([index, item]) => {
                return <>
                  <td><b>{index}</b></td>
                  <td>{item}</td></>
              })

              }
            </tr>
          </tbody>
        </Table>
        <Table responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Geographical Info</th>
              <th></th>
              {/* <th></th> */}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td><b>Continents</b></td>
              {BreedData["Geography"]["Continents"].map((item, index) => {
                return <td>{item}</td>
              })

              }
            </tr>
            <tr>
              <td></td>
              <td><b>Country</b></td>
              {/* {} */}
              {/* BreedData["Geography"]["Country"] */}
              {BreedData["Geography"]["Country"].slice(0, 3).map((item, index) => {
                return <td>{item}</td>
              })

              }
            </tr>
          </tbody>
        </Table>
      </div >
    )
  }
}

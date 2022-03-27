import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import BreedDetail from '../BreedDetail/BreedDetail';
import AnimalNav from '../AnimalNav/AnimalNav';
import axios from 'axios';
class Detail extends Component {

  state = {
    animalData: "",
    selectedAnimal: "",
    selectedBreed: "",
    breedList: "",
    breedData: "",
  }
  componentDidMount = async () => {

    // console.log("animal list Data will fetch")
    // await new Promise(r => setTimeout(r, 5000));
    await axios.get("http://127.0.0.1:5000/getAnimal").then((data) => data.data).then((data) => {
      this.setState({
        animalData: data,
        selectedAnimal: data[0]
      });
      // console.log("animal list aagya")
      return data[0]
    }).then((data) => {

      this.fetchBreed(data);
    })
    // console.log("animal list data fetch done")
  }
  fetchBreed = async (animal) => {
    // console.log("fetching breed List")
    // await new Promise(r => setTimeout(r, 5000));
    await axios.get("http://127.0.0.1:5000/getBreed/" + animal).then((data) => data.data).then((data) => {
      this.setState({ breedList: data });
      // console.log("breedlist  aagya");
      return data[0];
    }).then((data) => {
      this.fetchBreedData(data);
      this.setState({ selectedBreed: data });
    });
    // console.log("fetching breed list done")
  }

  fetchBreedData = async (breed) => {
    await axios.get("http://127.0.0.1:5000/animal/" + this.state.selectedAnimal + "?breed=" + breed).then
      ((data) => data.data).then((data) => {
        // console.log("breed data aagya")
        this.setState({ breedData: data });
      });

    // console.log("fetched breed data")
  }
  handleSelectAnimal = async (animal) => {
    this.setState({
      selectedAnimal: animal,
      selectedBreed: "",
      breedData: ""
    })
    await this.fetchBreed(animal);

  }
  handleSelectBreed = async (breed) => {
    this.setState({
      selectedBreed: breed,
      breedData: ""
    });
    await this.fetchBreedData(breed);
  }

  render() {

    const { animalData, breedData, selectedAnimal, selectedBreed, breedList } = this.state
    if (selectedAnimal == "" || animalData == "") {                                        // added this line
      return <h3>Wait We Fetching Animal Data</h3>;  // added this line
    }
    // console.log(this.state.selectedAnimal, this.state.selectedBreed, this.state.breedData);
    return (

      < div className='container' >
        {(selectedAnimal != "") ? (

          <AnimalNav data={this.state.animalData}
            handleSelectAnimal={this.handleSelectAnimal}
            selected={selectedAnimal}></AnimalNav>) : ""
        }

        {(selectedBreed != "" && breedData != "") ? <BreedDetail breedData={breedData} selectedBreed={selectedBreed} breedList={breedList}
          handleSelectBreed={this.handleSelectBreed}
        ></BreedDetail> : <h3>Wait We Fetching Breed Data</h3>}
        {/* <BreedDetail BreedDetail=""></BreedDetail> */}
      </div >

    )
  }
}

export default withRouter(Detail);
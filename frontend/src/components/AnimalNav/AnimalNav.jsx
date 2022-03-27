import React, { Component } from 'react'

import { Navbar, Container, Card, Row, Col } from 'react-bootstrap'
import { Nav } from 'react-bootstrap'
import './AnimalNav.css'
export default class AnimalNav extends Component {

    render() {
        const animal = this.props.data;
        const selected = this.props.selected;
        console.log("Inside Animal Selected is " + selected);
        return (
            <>
                <Navbar className="navbar" sticky="top" >

                    <Container>
                        <Nav defaultActiveKey={"#" + selected} className="navitem">
                            {
                                animal.map((animal, index) =>
                                    <Nav.Link id='item' href={"#" + animal} onClick={() => this.props.handleSelectAnimal(animal)}>{animal}</Nav.Link>

                                )}
                        </Nav>
                    </Container>
                </Navbar>

            </>
        )
    }
}


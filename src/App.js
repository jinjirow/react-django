import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import { Col,
         Collapse,
         InputGroup,
         InputGroupAddon,
         InputGroupText,
         Input,
         ListGroup,
         ListGroupItem,
         Navbar,
         NavbarToggler,
         NavbarBrand,
         Nav,
         NavItem,
         NavLink,
         Card,
         UncontrolledDropdown,
         DropdownToggle,
         DropdownMenu,
         DropdownItem,
         Row } from "reactstrap";

var placeholder = [
    "Tv stend",
    "Big BOX",
    "COUCHes",
    "Free Couch",
    "HI am creg" ];

class App extends Component{
  constructor(props){
    super(props);
    this.state = {initialItems: placeholder, items: []  };
    this.state.items = this.state.initialItems;
    this.filterList = this.filterList.bind(this);
  }

  queryServer(){
    // Make request to recieve response object from django side
    axios.get(`/postings`)
        .then(res => {
          const postings = res.data;
          alert(postings)
    })
  }

  componentDidMount(){
    this.queryServer()
  }
  filterList(e){
    var updatedList = this.state.initialItems;
    updatedList = updatedList.filter(function(item){
      return item.toLowerCase().search(
        e.target.value.toLowerCase()) !== -1;
    });
    this.setState({items: updatedList});
  }
  render(){
      const listItems = <ListGroup className="list-group">{this.state.items.map(function(item){
        return <ListGroupItem className="list-group-item" data-category={item} key={item}>{item}</ListGroupItem>
      })}</ListGroup>
      return (
        <div>
          <Navbar color="light" light expand="md" >
            <Col sm={10}>
              <NavbarBrand href="/">Creg</NavbarBrand>
            </Col>
            <InputGroup align="right" style={{"width" : "150px"}}>
              <Input type="text" style={{"float" : "right"}} placeholder="Search" onChange={this.filterList}/>
            </InputGroup>
          </Navbar>
          <Row>
          <Col>
            <div>
              <h1>post stuff</h1>
            </div>
          </Col>
          <Card style={{"width" : "400px"}}>

            {listItems}
          </Card>
          </Row>
        </div>
      );
    }

};

export default App;

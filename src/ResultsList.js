import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'

class ResultsList extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          peopleData: [],
          groupsData: [] 
        };
    }

    componentDidMount() {
        // fetch("http://localhost:8000/api/people")
        //   .then(response => response.json())
        //   .then(data => this.setState({ peopleData: data.data }));

        // fetch("http://localhost:8000/api/groups")
        //   .then(response => response.json())
        //   .then(data => this.setState({ groupsData: data.data }));
        this.getPeople();
        this.getGroups();
    }


    getGroups(){
        fetch("http://localhost:8000/api/people")
          .then(response => response.json())
          .then(data => this.setState({ peopleData: data.data }));
    }

    getPeople(){
      fetch("http://localhost:8000/api/groups")
          .then(response => response.json())
          .then(data => this.setState({ groupsData: data.data }));
    }
    
    deleteGroup(id) {
      fetch(`http://localhost:8000/api/groups/${id}`, 
      {
        method: 'delete'
      }).then(response =>
        console.log(response),
        this.getGroups())
    }


    render() {
        var data = this.state.data || [];

        return (
            <Table celled padded>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell singleLine>First Name</Table.HeaderCell>
                  <Table.HeaderCell>Last Name</Table.HeaderCell>
                  <Table.HeaderCell>Email</Table.HeaderCell>
                  <Table.HeaderCell>Status</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>

              {
                  data.map((person, index) => {
                      return (
                          <Table.Row key={index}>
                              <Table.Cell singleLine>{ person.first_name }</Table.Cell>
                              <Table.Cell singleLine>{ person.last_name }</Table.Cell>
                              <Table.Cell singleLine>{ person.email_address }</Table.Cell>
                              <Table.Cell singleLine>{ person.status }</Table.Cell>
                          </Table.Row>
                      );
                    })
              }

              </Table.Body>
            </Table>
    );
}

}

export default ResultsList

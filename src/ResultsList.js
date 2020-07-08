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
        this.getData("people");
        this.getData("groups");
    }

    getData(route){
      fetch(`http://localhost:8000/api/${route}`)
          .then(response => response.json())
        .then(data => route === "people" ? this.setState({ peopleData: data.data }) : this.setState({ groupsData: data.data }));
    }
    
    changeData(route, data, id){
      fetch(`http://localhost:8000/api/${route}/${id}`,
      {
        method: "put",
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         },
        body: JSON.stringify(data)
      }).then(response => {
        // return response.json();
        console.log(response);
      });
    }

    deleteData(route, id) {
      fetch(`http://localhost:8000/api/${route}/${id}`, 
      {
        method: 'delete'
      }).then(response =>
        console.log(response),
        this.getGroups())
    }


    render() {
        var peopleData = this.state.peopleData || [];
        var groupsData = this.state.groupsData || [];

        return (
          <div>
            <Table celled padded>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell singleLine>First Name</Table.HeaderCell>
                  <Table.HeaderCell>Last Name</Table.HeaderCell>
                  <Table.HeaderCell>Email</Table.HeaderCell>
                  <Table.HeaderCell>Status</Table.HeaderCell>
                  <Table.HeaderCell>Actions</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row >
                  <Table.Cell singleLine><input type="text" id="firstName" placeholder="First Name"/></Table.Cell>
                  <Table.Cell singleLine><input type="text" id="lastName" placeholder="Last Name"/></Table.Cell>
                  <Table.Cell singleLine><input type="text" id="email" placeholder="Email"/></Table.Cell>
                  <Table.Cell singleLine><input type="text" id="status" placeholder="Status"/></Table.Cell>
                  <Table.Cell singleLine>
                    <input type="submit" onClick={() => {
                      console.log(`I've been submited!`);
                      this.props.peopleFunction({
                          first_name: document.getElementById("firstName").value,
                          last_name: document.getElementById("lastName").value,
                          email_address: document.getElementById("email").value,
                          status: document.getElementById("status").value
                      });
                  }}></input>
                  </Table.Cell>
                </Table.Row>

              {
                  peopleData.map((person, index) => {
                      return (
                          <Table.Row key={index}>
                              <Table.Cell singleLine>{ person.first_name }</Table.Cell>
                              <Table.Cell singleLine>{ person.last_name }</Table.Cell>
                              <Table.Cell singleLine>{ person.email_address }</Table.Cell>
                              <Table.Cell singleLine>{ person.status }</Table.Cell>
                              <Table.Cell singleLine>
                              <button onClick={() => {console.log(`I've been edited!`)}}>Edit</button>
                              <button onClick={() => {this.deleteData("people", person.id)}}>Delete</button>
                            </Table.Cell>
                          </Table.Row>
                      );
                    })
              }

              </Table.Body>
            </Table>
            
            <Table celled padded>

            <Table.Header>
              <Table.Row>
                <Table.HeaderCell singleLine>Group Name</Table.HeaderCell>
                <Table.HeaderCell singleLine>Actions</Table.HeaderCell>

              </Table.Row>
            </Table.Header>

            <Table.Body>

            {
                groupsData.map((group, index) => {
                    return (
                        <Table.Row key={index}>
                            <Table.Cell singleLine>{ group.group_name }</Table.Cell>
                            <Table.Cell singleLine>
                              <button onClick={() => {console.log(`I've been edited!`)}}>Edit</button>
                              <button onClick={() => {this.deleteData("groups", group.id)}}>Delete</button>

                            </Table.Cell>

                        </Table.Row>
                    );
                  })
            }

            </Table.Body>
          </Table>
          </div>
    );
}

}

export default ResultsList

import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'
import CSVReader from 'react-csv-reader'


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

    deleteData(route, id) {
      fetch(`http://localhost:8000/api/${route}/${id}`, 
      {
        method: 'delete'
      }).then(() => route === "people" ? this.setState({ peopleData: this.getData("people") }) : this.setState({ groupsData: this.getData("groups") }))
    }

    postData(route, data){
      fetch(`http://localhost:8000/api/${route}/`, {
        method: 'post',
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         },
        body: JSON.stringify(data)
      }).then(() => route === "people" ? this.setState({ peopleData: this.getData("people") }) : this.setState({ groupsData: this.getData("groups") }));
    }

    dataParser(route, data){
      data.shift();
      if (route === "people"){
        data.forEach(person => {
          let dataObj = {
            first_name: person[0],
            last_name: person[1],
            email_address: person[2],
            status: person[3],
            group_id: person[4]
          };
    
          this.postData("people", dataObj);
      });
      } else if (route === "groups"){
        data.forEach(person => {
          let dataObj = {
            group_name: person[0]
          };
            this.postData("groups", dataObj);
        })
      }
    }
    }

    render() {
        var peopleData = this.state.peopleData || [];
        var groupsData = this.state.groupsData || [];

        return (
          <div>
            <Table celled padded>
              <Table.Header>
                <Table.Row>
                <Table.HeaderCell singleLine>ID</Table.HeaderCell>
                  <Table.HeaderCell>First Name</Table.HeaderCell>
                  <Table.HeaderCell>Last Name</Table.HeaderCell>
                  <Table.HeaderCell>Email</Table.HeaderCell>
                  <Table.HeaderCell>Status</Table.HeaderCell>
                  <Table.HeaderCell>Group ID</Table.HeaderCell>
                  <Table.HeaderCell>Actions</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row >
                  <Table.Cell singleLine></Table.Cell>
                  <Table.Cell singleLine><input type="text" id="firstName" placeholder="First Name"/></Table.Cell>
                  <Table.Cell singleLine><input type="text" id="lastName" placeholder="Last Name"/></Table.Cell>
                  <Table.Cell singleLine><input type="text" id="email" placeholder="Email"/></Table.Cell>
                  <Table.Cell singleLine><input type="text" id="status" placeholder="Status"/></Table.Cell>
                  <Table.Cell singleLine><input type="text" id="groupID" placeholder="Group ID"/></Table.Cell>
                  <Table.Cell singleLine>
                    <input type="submit" onClick={() => {
                      console.log(`I've been submited!`);
                      let newPerson = {
                        first_name: document.getElementById("firstName").value,
                        last_name: document.getElementById("lastName").value,
                        email_address: document.getElementById("email").value,
                        status: document.getElementById("status").value,
                        group_id: document.getElementById("groupID").value
                      };
                      this.props.peopleFunction('people', newPerson);
                  }}></input>
                  </Table.Cell>
                </Table.Row>

              {
                  peopleData.map((person, index) => {
                      return (
                          <Table.Row key={index}>
                              <Table.Cell singleLine>{ person.id }</Table.Cell>
                              <Table.Cell singleLine>{ person.first_name }</Table.Cell>
                              <Table.Cell singleLine>{ person.last_name }</Table.Cell>
                              <Table.Cell singleLine>{ person.email_address }</Table.Cell>
                              <Table.Cell singleLine>{ person.status }</Table.Cell>
                              <Table.Cell singleLine>{ person.group_id }</Table.Cell>
                              <Table.Cell singleLine>
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
                <Table.HeaderCell singleLine>ID</Table.HeaderCell>
                <Table.HeaderCell singleLine>Group Name</Table.HeaderCell>
                <Table.HeaderCell singleLine>Members</Table.HeaderCell>
                <Table.HeaderCell singleLine>Actions</Table.HeaderCell>

              </Table.Row>
            </Table.Header>

            <Table.Body>
            <Table.Row >
                  <Table.Cell singleLine></Table.Cell>
                  <Table.Cell singleLine><input type="text" id="groupName" placeholder="Group Name"/></Table.Cell>
                  <Table.Cell singleLine></Table.Cell>
                  <Table.Cell singleLine>
                    <input type="submit" onClick={() => {
                      this.props.peopleFunction("groups", {
                          group_name: document.getElementById("groupName").value,
                      });
                  }}></input>
                  </Table.Cell>
                </Table.Row>

            {
                groupsData.map((group, index) => {
                    return (
                        <Table.Row key={index}>
                            <Table.Cell singleLine>{ group.id }</Table.Cell>
                            <Table.Cell singleLine>{ group.group_name }</Table.Cell>
                            <Table.Cell singleLine>{ peopleData.map((person, index) => {
                              if (group.id === person.group_id && person.status === "active"){
                                  let groupMember = `, ${person.first_name} ${person.last_name}`;
                                return groupMember;
                              }
                            }) }</Table.Cell>
                            <Table.Cell singleLine>
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

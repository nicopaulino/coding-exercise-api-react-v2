import React from "react";
import ReactDOM from "react-dom";
import { Container, Header } from "semantic-ui-react";

import ResultsList from "./ResultsList";
import CSVReader from 'react-csv-reader'

const App = ({ children }) => (
  <Container style={{ margin: 20 }}>
    <Header as="h3"><span role="img" aria-label="logo">⛵️</span> Breeze Church Management </Header>

    {children}
  </Container>
);

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

function  getPeople(data){
  fetch('http://localhost:8000/api/people/', {
    method: 'post',
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

ReactDOM.render(
  <App>
    <CSVReader onFileLoaded={(data, fileInfo) => {
      data.shift();

      data.forEach(person => {
        let dataObj = {
          first_name: person[0],
          last_name: person[1],
          email_address: person[2],
          status: person[3]
        };

        console.dir(dataObj);
        getPeople(dataObj)
      });

      }} />
    <ResultsList />
  </App>,
  document.getElementById("root")
);

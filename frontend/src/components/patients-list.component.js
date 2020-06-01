import React, { Component } from "react";
import axios from "axios";
import { Image, Card, Button, Icon } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { Container, Row, Col, Card as Cards, Jumbotron } from "reactstrap";
import avatarList from "./avatarList";

const Patient = (props) => (
  <Card onClick={() => props.onClick(props.patient._id)}>
    <Image
      src={require(`./avatars/${
        avatarList[parseInt(props.patient.avatar_url)].src
      }`)}
      wrapped
      ui={false}
    />
    <Card.Content>
      <Card.Header>{props.patient.name}</Card.Header>
      <Card.Description>
        {props.patient.future_appointments[0]
          ? "Next appointment: " + props.patient.future_appointments[0].date
          : "No future appointments"}
      </Card.Description>
    </Card.Content>
  </Card>
);

export default class PatientsList extends Component {
  constructor(props) {
    super(props);

    this.addPatient = this.addPatient.bind(this);
    this.editPatient = this.editPatient.bind(this);
    this.state = { patients: [] };
  }

  componentDidMount() {

    const auth = {
      headers: { "x-auth-token": localStorage.getItem("token") },
    };
    axios
      .get("http://localhost:5000/api/patients/", auth)
      .then((response) => {
        console.log(response);
        this.setState({ patients: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  addPatient() {
    this.props.history.push("/patients/add");
  }

  editPatient = (id) => {
    this.props.history.push("/patients/edit/" + id);
  };

  patientsList() {
    return this.state.patients.map((currentPatient) => {
      return <Patient patient={currentPatient} onClick={this.editPatient} />;
    });
  }

  render() {
    return (
      <Container fluid>
        <Jumbotron className="height-100">
          <h1>Your patients</h1>
          <Row>
            <Col>
              <Cards>
                <div className="padding-5">
                  <Card.Group itemsPerRow={8}>{this.patientsList()}</Card.Group>
                  <br />
                  <br />
                  <Button
                    icon
                    labelPosition="left"
                    color="blue"
                    onClick={this.addPatient}
                  >
                    <Icon name="plus" />
                    Add patient
                  </Button>
                </div>
              </Cards>
            </Col>
          </Row>
        </Jumbotron>
      </Container>
    );
  }
}

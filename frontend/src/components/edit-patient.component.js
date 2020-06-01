import React, { Component } from "react";
import axios from "axios";
import {
  Header,
  Form,
  Divider,
  Button,
  Dropdown,
  TextArea,
  Grid,
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import AvatarPicker from "./AvatarPicker";
import avatarList from "./avatarList";
import { Container, Row, Col, Card, Jumbotron } from "reactstrap";

const medication = [
  { key: "xanax", text: "Xanax", value: "Xanax" },
  { key: "zoloft", text: "Zoloft", value: "Zoloft" },
  { key: "celexa", text: "Celexa", value: "Celexa" },
  { key: "prozac", text: "Prozac", value: "Prozac" },
  { key: "ativan", text: "Ativan", value: "Ativan" },
  { key: "desyrel", text: "Desyrel", value: "Desyrel" },
  { key: "lexapro", text: "Lexapro", value: "Lexapro" },
];

export default class EditPatient extends Component {
  constructor(props) {
    super(props);

    this.onDelete = this.onDelete.bind(this);

    this.state = {
      name: "",
      dob: "",
      avatar_url: "0",
      medication: [],
      notes: [],
      past_appointments: [],
      future_appointments: [],
    };
  }

  componentDidMount() {
    
    axios.get('http://localhost:5000/api/patients/' + this.props.match.params.id)
      .then(response => {
        const patient = response.data
        this.setState({
          "id": patient._id,
          "avatar_url": patient.avatar_url,
          "name": patient.name,
          "dob": patient.dob.split("T")[0],
          "notes": patient.notes, 
          "medication": patient.medication,
          "past_appointments": patient.past_appointments,
          "future_appointments": patient.future_appointments
        })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  pastAppointmentsList() {
    return this.state.past_appointments.map(appointment => {
      if (appointment == null) {
        return
      }
      return (
        <a
          style={{ marginRight: "10px" }}
          href={"/appointments/edit/" + appointment.id}
        >
          {" "}
          {appointment.date.split("T")[0]}{" "}
        </a>
      );
    })
  }

  futureAppointmentsList() {
    return this.state.future_appointments.map(appointment => {
      if (appointment == null) {
        return
      }
      return (
        <a
          style={{ marginRight: "10px" }}
          href={"/appointments/edit/" + appointment.id}
        >
          {" "}
          {appointment.date.split("T")[0]}{" "}
        </a>
      );
    })
  }

  handleChange = (e, { name, value }) =>  {
    if (name == "notes") {
      this.setState({ [name]: [value] })
    } else {
      this.setState({ [name]: value })
    }

  }

  handleSubmit = () => {
      let self = this
      axios.put('http://localhost:5000/api/patients/update-patient/' + this.props.match.params.id, {
          "name": this.state.name,
          "avatar_url": this.state.avatar_url,
          "dob": this.state.dob,
          "notes": this.state.notes, 
          "medication":this.state.medication,
          "past_appointments": this.state.past_appointments,
          "future_appointments": this.state.future_appointments
      })
      .then(function (response) {
        console.log(response);
        self.props.history.push('/patients/')
      })
      .catch(function (error) {
        console.log(error);
      });
  
  }

  onDelete() {
      axios.delete('http://localhost:5000/api/patients/delete-patient/' + this.props.match.params.id)
      .then(function (response) {
        console.log(response);
        this.props.history.push('/patients/')
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    console.log(this.state)
    return (
      <Container fluid>
        <Jumbotron className="height-100">
          <h1>Add patient</h1>
          <Row>
            <Col>
              <Card>
                <div className="padding-5">
                  <Header textAlign="center" as="h1">
                    Edit patient
                  </Header>
                  <Divider />
                  <br />
                  <Form onSubmit={this.handleSubmit}>
                    <Grid columns={2}>
                      <Grid.Column>
                        <Form.Field>
                          <label>Name</label>
                          <Form.Input
                            placeholder="Patient's name"
                            name="name"
                            value={this.state.name}
                            onChange={this.handleChange}
                          />
                        </Form.Field>
                        <Form.Field>
                          <label>Date of birth</label>
                          <Form.Input
                            placeholder="Patient's date of birth"
                            name="dob"
                            value={this.state.dob}
                            onChange={this.handleChange}
                          />
                        </Form.Field>
                        <Form.Field>
                          <label>Medication</label>
                          <Dropdown
                            placeholder="Medication"
                            fluid
                            multiple
                            selection
                            options={medication}
                            name="medication"
                            value={this.state.medication}
                            onChange={this.handleChange}
                          />
                        </Form.Field>
                        <Form.Field>
                          <label>Past appointments </label>
                          {this.state.past_appointments.length > 1 ? this.pastAppointmentsList() : "No past appointments"}
                        </Form.Field>
                        <Form.Field>
                          <label>Future appointments </label>
                          {this.state.future_appointments.length > 1 ? this.futureAppointmentsList() : "No future appointments"}
                        </Form.Field>
                        <Form.Field
                          control={TextArea}
                          label="Notes"
                          placeholder="Notes about the patient..."
                          name="notes"
                          value={this.state.notes[0]}
                          onChange={this.handleChange}
                        />
                      </Grid.Column>
                      <Grid.Column>
                        <Form.Field>
                          <Header textAlign="center" as="h4">
                            Change the profile picture:
                          </Header>
                          <br />
                          <br />
                          <br />
                          <AvatarPicker
                            avatarList={avatarList}
                            name="avatar_url"
                            value={this.state.avatar_url}
                            onChange={this.handleChange}
                          />
                        </Form.Field>
                      </Grid.Column>
                    </Grid>
                    <br />
                    <br />
                    <div align="center">
                      <Button
                        style={{ marginRight: "10px" }}
                        content="Submit"
                        color="blue"
                      >
                        Edit patient
                      </Button>
                      <Button
                        style={{ marginLeft: "10px" }}
                        color="red"
                        onClick={this.onDelete}
                      >
                        Delete patient
                      </Button>
                    </div>
                    <br />
                  </Form>
                </div>
              </Card>
            </Col>
          </Row>
        </Jumbotron>
      </Container>
    );
  }
}

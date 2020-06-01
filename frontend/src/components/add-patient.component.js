import React, { Component } from "react";
import axios from "axios";
import {
  Header,
  Form,
  Button,
  Dropdown,
  TextArea,
  Grid,
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { Container, Row, Col, Card, Jumbotron } from "reactstrap";
import AvatarPicker from "./AvatarPicker";
import avatarList from "./avatarList";

const medication = [
  { key: "xanax", text: "Xanax", value: "Xanax" },
  { key: "zoloft", text: "Zoloft", value: "Zoloft" },
  { key: "celexa", text: "Celexa", value: "Celexa" },
  { key: "prozac", text: "Prozac", value: "Prozac" },
  { key: "ativan", text: "Ativan", value: "Ativan" },
  { key: "desyrel", text: "Desyrel", value: "Desyrel" },
  { key: "lexapro", text: "Lexapro", value: "Lexapro" },
];

export default class AddPatient extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      dob: "",
      avatar_url: "0",
      medication: [],
      notes: "",
    };
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    let component = this;
    axios
      .post("http://localhost:5000/api/patients/add", {
        name: this.state.name,
        avatar_url: this.state.avatar_url,
        dob: this.state.dob,
        notes: [this.state.notes],
        medication: this.state.medication,
      })
      .then(function (response) {
        console.log(response);
        component.props.history.push("/patients/");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  render() {
    return (
      <Container fluid>
        <Jumbotron className="height-100">
          <h1>Add patient</h1>
          <Row>
            <Col>
              <Card>
                <div className="padding-5">
                  <Form onSubmit={this.handleSubmit}>
                    <Grid columns={2}>
                      <Grid.Column>
                        <Form.Field>
                          <label>Name</label>
                          <Form.Input
                            placeholder="Patient's name"
                            name="name"
                            onChange={this.handleChange}
                          />
                        </Form.Field>
                        <br />
                        <Form.Field>
                          <label>Date of birth</label>
                          <Form.Input
                            placeholder="Patient's date of birth"
                            name="dob"
                            onChange={this.handleChange}
                          />
                        </Form.Field>
                        <br />
                        <Form.Field>
                          <label>Medication</label>
                          <Dropdown
                            placeholder="Medication"
                            fluid
                            multiple
                            selection
                            options={medication}
                            name="medication"
                            onChange={this.handleChange}
                          />
                        </Form.Field>
                        <br />
                        <Form.Field
                          control={TextArea}
                          label="Notes"
                          placeholder="Notes about the patient..."
                          name="notes"
                          onChange={this.handleChange}
                        />
                      </Grid.Column>
                      <Grid.Column>
                        <Form.Field>
                          <Header textAlign="center" as="h4">
                            Choose a profile picture:
                          </Header>
                          <br />
                          <br />
                          <br />
                          <AvatarPicker
                            avatarList={avatarList}
                            value={this.state.avatar_url}
                            name="avatar_url"
                            onChange={this.handleChange}
                          />
                        </Form.Field>
                      </Grid.Column>
                    </Grid>
                    <br />
                    <br />
                    <div align="center">
                      <Button content="Submit" color="blue">
                        Add patient
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

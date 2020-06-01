import React, { Component } from "react";
import axios from "axios";
import Moment from "react-moment";
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  Button,
  Container,
  Row,
  Col,
  Jumbotron,
  Table,
} from "reactstrap";
import ModalExample from "./layout/modal-example";

export default class MainPage extends Component {
  //Add user details
  //Edit user details option maybe
  //Fetch patient records and display in a table
  //Fetch appointments and display in a table
  constructor(props) {
    super(props);

    // this.addPatient = this.addPatient.bind(this);
    // this.showUser = this.showUser.bind(this);
    // this.editPatient = this.editPatient.bind(this);
    this.state = {
      patients: [],
      appointments: [],
      temp: [],
      user: { name: "User", image: null },
    };
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
    axios
      .get("http://localhost:5000/api/appointments/", auth)
      .then((response) => {
        console.log(response);
        this.setState({ appointments: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("http://localhost:5000/api/user/", auth)
      .then((response) => {
        console.log(response);
        this.setState({
          user: {
            name: response.data.name,
            image: "https:" + response.data.avatar,
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  viewPatients = () => {
    this.props.history.push("/patients/");
  };

  addPatients = () => {
    this.props.history.push("/patients/add");
  };

  viewAppointments = () => {
    this.props.history.push("/appointments/");
  };

  addAppointments = () => {
    this.props.history.push("/appointments/add");
  };

  patientDetails = (id) => {
    console.log(id);
  };

  patientsList = () => {
    return this.state.patients.map((currentPatient) => {
      return (
        <tr>
          <td>{currentPatient.name}</td>
          <td>
            <Moment format="MM/DD/YYYY">{currentPatient.createdAt}</Moment>
          </td>
          <td>
            <ModalExample
              buttonLabel="View Profile"
              patient={currentPatient}
              type="Patient"
            ></ModalExample>
          </td>
        </tr>
      );
    });
  };

  appointmentsList = () => {
    return this.state.appointments.map((current) => {
      return (
        <tr>
          <td>
            <Moment format="MM/DD/YYYY">{current.date}</Moment>
          </td>
          <td>{current.patientId}</td>
          <td>
            <ModalExample
              buttonLabel="View Details"
              patient={current}
              type="Appointment"
            ></ModalExample>
          </td>
        </tr>
      );
    });
  };

  render() {
    return (
      <Container fluid>
        <Jumbotron className="full-height">
          <h1>
            Hello,{" "}
            <strong className="user-color">{this.state.user.name}</strong>
          </h1>
          <h4>
            Therapy Manager <strong className="user-color">|</strong> Powerful,
            yet simple.
          </h4>
          <p>All the information at your dashboard, organized.</p>
          <Row>
            <Col>
              <Card>
                <CardBody>
                  <CardTitle>
                    <h3>My Patients:</h3>
                  </CardTitle>
                  <Table className="dashboardTable">
                    <thead>
                      <tr>
                        <th>Patient Name</th>
                        <th>Registeration date</th>
                        <th>Details</th>
                      </tr>
                    </thead>
                  </Table>
                  {this.state.patients.length !== 0 ? (
                    <Table className="dashboardTable">
                      <tbody className="dashboardBody block">
                        {this.patientsList()}
                      </tbody>
                    </Table>
                  ) : (
                    <div className="dashboardBody no-data">
                      No Data Available. Use the <i>quick links</i> below to add
                      an appointment.
                    </div>
                  )}
                  <hr />
                  <CardText>
                    <strong>Quick Links:</strong>
                  </CardText>
                  <Button outline color="info" onClick={this.viewPatients}>
                    View Patients
                  </Button>
                  <Button outline color="warning" onClick={this.addPatients}>
                    Add Patients
                  </Button>
                </CardBody>
              </Card>
            </Col>
            <Col>
              <Card>
                <CardBody>
                  <CardTitle>
                    <h3>My Appointments:</h3>
                  </CardTitle>
                  <Table className="dashboardTable">
                    <thead>
                      <tr>
                        <th>Appointment date</th>
                        <th>Patient ID</th>
                        <th>Details</th>
                      </tr>
                    </thead>
                  </Table>
                  {this.state.appointments.length !== 0 ? (
                    <Table className="dashboardTable">
                      <tbody className="dashboardBody block">
                        {this.appointmentsList()}
                      </tbody>
                    </Table>
                  ) : (
                    <div className="dashboardBody no-data">
                      No Data Available. Use the <i>quick links</i> below to add
                      an appointment.
                    </div>
                  )}

                  <hr />
                  <CardText>
                    <strong>Quick Links:</strong>
                  </CardText>
                  <Button outline color="info" onClick={this.viewAppointments}>
                    View Appointments
                  </Button>
                  <Button
                    outline
                    color="warning"
                    onClick={this.addAppointments}
                  >
                    Add Appointment
                  </Button>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Jumbotron>
      </Container>
    );
  }
}

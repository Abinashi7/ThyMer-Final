import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Icon } from "semantic-ui-react";
import axios from "axios";
import { Container, Row, Col, Card as Cards, Jumbotron } from "reactstrap";
import Moment from "react-moment";

const Appointment = (props) => (
  <tr>
    <td>
      <Link to={"/patients/edit/" + props.appointment.patientId}>
        See patient
      </Link>
    </td>
    <td>{props.appointment.notes}</td>
    <td>
      <Moment format="MM/DD/YYYY">{props.appointment.date}</Moment>
    </td>
    <td>
      <Link to={"/appointments/edit/" + props.appointment._id}>edit</Link> |{" "}
      <a
        href="#"
        onClick={() => {
          props.deleteAppointment(props.appointment._id);
        }}
      >
        delete
      </a>
    </td>
  </tr>
);

export default class AppointmentList extends Component {
  constructor(props) {
    super(props);

    this.addAppointment = this.addAppointment.bind(this);
    this.deleteAppointment = this.deleteAppointment.bind(this);

    this.state = { appointments: [] };
  }

  componentDidMount() {
    const auth = {
      headers: { "x-auth-token": localStorage.getItem("token") },
    };
    axios
      .get("http://localhost:5000/api/appointments/", auth)
      .then((response) => {
        console.log(response);
        this.setState({ appointments: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteAppointment(id) {
    axios
      .delete("http://localhost:5000/api/appointments/delete-appointment/" + id)
      .then((response) => {
        console.log(response.data);
      });

    this.setState({
      appointments: this.state.appointments.filter((el) => el._id !== id),
    });
  }

  addAppointment() {
    this.props.history.push("/appointments/add");
  }

  appointmentList() {
    return this.state.appointments.map((currentappointment) => {
      return (
        <Appointment
          appointment={currentappointment}
          deleteAppointment={this.deleteAppointment}
          key={currentappointment._id}
        />
      );
    });
  }

  render() {
    return (
      <Container fluid>
        <Jumbotron className="height-100">
          <h1>Scheduled appointments</h1>
          <Row>
            <Col>
              <Cards>
                <div>
                  <table className="table">
                    <thead className="thead-light">
                      <tr>
                        <th>Patient</th>
                        <th>Notes</th>
                        <th>Appointment date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>{this.appointmentList()}</tbody>
                  </table>
                  <Button
                    icon
                    labelPosition="left"
                    color="blue"
                    onClick={this.addAppointment}
                  >
                    <Icon name="plus" />
                    Add Appointment
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

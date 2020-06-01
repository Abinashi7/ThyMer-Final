import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { Container, Row, Col, Card, Jumbotron } from "reactstrap";

export default class AddAppointment extends Component {
  constructor(props) {
    super(props);

    this.onChangePatient = this.onChangePatient.bind(this);
    this.onChangeNotes = this.onChangeNotes.bind(this);
    this.onChangeAppointmentDate = this.onChangeAppointmentDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      patientId: "",
      patientName: "",
      notes: "",
      appointment_date: new Date(),
      patients: [{ "name": "", "id": "" }]
    };
  }

  componentDidMount() {
    const auth = {
      headers: {'x-auth-token': localStorage.getItem('token')} 
    }
    axios.get('http://localhost:5000/api/patients/', auth)
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            patients: response.data.map((patient) => {
              let t = { name: patient.name, id: patient._id };
              return t;
            }),
            patientId: response.data[0]._id,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChangePatient(e) {
    this.setState({
      patientName: e.target.value,
      patientId: e.target.value,
    });
  }

  onChangeNotes(e) {
    this.setState({
      notes: e.target.value,
    });
  }

  onChangeAppointmentDate(date) {
    console.log("date", date);
    this.setState({
      appointment_date: date,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const appointment = {
      patientId: this.state.patientId,
      notes: this.state.notes,
      date: this.state.appointment_date,
    };


    let id
    axios.post('http://localhost:5000/api/appointments/add', appointment)
      .then(res => {id = res.data.id})
      .catch((error) => {
        console.log(error);
      })

    let state = this.state
    axios.get('http://localhost:5000/api/patients/' + state.patientId)
        .then(response => {
          let patient = response.data
          patient.future_appointments.push({"date": state.appointment_date, "id": id})
          console.log(patient)
          axios.put('http://localhost:5000/api/patients/update-patient/' + state.patientId, patient)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
        })
        .catch((error) => {
          console.log(error);
        })


    window.location = "/appointments";
  }

  render() {
    return (
      <Container fluid>
        <Jumbotron className="height-100">
          <h1>Schedule an appoinment for a patient</h1>
          <Row>
            <Col>
              <Card>
                <div className="padding-5">
                  <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                      <label>Patient's name: </label>
                      <select
                        ref="userInput"
                        required
                        className="form-control"
                        value={this.state.patientName}
                        onChange={this.onChangePatient}
                      >
                        {this.state.patients.map(function (patient) {
                          return (
                            <option key={patient.id} value={patient.id}>
                              {patient.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Notes: </label>
                      <input
                        type="text"
                        required
                        className="form-control"
                        value={this.state.notes}
                        onChange={this.onChangeNotes}
                      />
                    </div>
                    <div className="form-group">
                      <label>Date: </label>
                      <div>
                        <DatePicker
                          selected={this.state.appointment_date}
                          onChange={this.onChangeAppointmentDate}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <input
                        type="submit"
                        value="Add appointment"
                        className="btn btn-primary"
                      />
                    </div>
                  </form>
                </div>
              </Card>
            </Col>
          </Row>
        </Jumbotron>
      </Container>
    );
  }
}

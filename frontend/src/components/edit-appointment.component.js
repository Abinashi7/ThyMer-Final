import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Container, Row, Col, Card as Cards, Jumbotron } from "reactstrap";

export default class EditAppointment extends Component {
  constructor(props) {
    super(props);
    this.onChangeNotes = this.onChangeNotes.bind(this);
    this.onChangeAppointmentDate = this.onChangeAppointmentDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      notes: "",
      appointment_date: new Date(),
    };
  }

  componentDidMount() {
    axios
      .get(
        "http://localhost:5000/api/appointments/" + this.props.match.params.id
      )
      .then((response) => {
        console.log(response);
        this.setState({
          notes: response.data.notes,
          appointment_date: new Date(response.data.date),
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onChangeNotes(e) {
    this.setState({
      notes: e.target.value,
    });
  }

  onChangeAppointmentDate(date) {
    this.setState({
      appointment_date: date,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const appointment = {
      notes: this.state.notes,
      date: this.state.appointment_date,
    };

    console.log(appointment);

    axios
      .put(
        "http://localhost:5000/api/appointments/update-appointment/" +
          this.props.match.params.id,
        appointment
      )
      .then((res) => console.log(res.data))
      .catch((error) => {
        console.log(error);
      });

    window.location = "/appointments";
  }

  render() {
    return (
      <Container fluid>
        <Jumbotron className="height-100">
          <h1>Edit a scheduled appointment</h1>
          <Row>
            <Col>
              <Cards>
                <div className="padding-5">
                  <form onSubmit={this.onSubmit}>
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
                        value="Edit appointment"
                        className="btn btn-primary"
                      />
                    </div>
                  </form>
                </div>
              </Cards>
            </Col>
          </Row>
        </Jumbotron>
      </Container>
    );
  }
}

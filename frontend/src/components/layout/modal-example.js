import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Card,
  CardImg,
  CardBody,
  CardTitle,
} from "reactstrap";
import avatarList from "../avatarList";
import Moment from "react-moment";

const ModalExample = (props) => {
  const { buttonLabel, className, patient, type } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="success" onClick={toggle}>
        {buttonLabel}
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>
          <strong>
            {type === "Patient" ? "Patient Profile" : "Appointment Details"}
          </strong>
        </ModalHeader>
        <ModalBody>
          <Card>
            {type === "Patient" ? (
              <CardImg
                top
                width="100%"
                src={require(`../avatars/${
                  avatarList[parseInt(patient.avatar_url)].src
                }`)}
                alt="Card image cap"
              />
            ) : (
              ""
            )}
            <CardBody>
              {type === "Patient" ? (
                <CardTitle>
                  <strong>Patient name: </strong>
                  {patient.name}
                </CardTitle>
              ) : (
                <CardTitle>
                  <strong>Patient ID: </strong>
                  {patient.patientId}
                </CardTitle>
              )}
              {type === "Patient" ? (
                <CardTitle>
                  <strong>DOB: </strong>
                  <Moment format="MM/DD/YYYY">{patient.dob}</Moment>
                </CardTitle>
              ) : (
                <CardTitle>
                  <strong>Date: </strong>
                  <Moment format="MM/DD/YYYY">{patient.date}</Moment>
                </CardTitle>
              )}
              <CardTitle>
                <strong>Notes: </strong>
                {patient.notes[0]}
              </CardTitle>
              <CardTitle>
                <strong>Last updated: </strong>
                <Moment format="MM/DD/YYYY">{patient.updatedAt}</Moment>
              </CardTitle>
              <CardTitle>
                <strong>Record created: </strong>
                <Moment format="MM/DD/YYYY">{patient.createdAt}</Moment>
              </CardTitle>
            </CardBody>
          </Card>
        </ModalBody>
        <ModalFooter>
          <Button color="warning" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalExample;

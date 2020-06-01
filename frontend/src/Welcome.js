import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navibar from "./components/layout/Navibar";
import Landing from "./components/layout/Landing";
import Alert from "./components/layout/Alert";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import "./Welcome.css";

import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

import MainPage from "./components/main-page.component";
import PatientsList from "./components/patients-list.component";
import AddPatient from "./components/add-patient.component";
import EditPatient from "./components/edit-patient.component";
import AddAppointment from "./components/add-appointment.component.js";
import EditAppointment from "./components/edit-appointment.component.js";
import AppointmentList from "./components/appointments-list.component";

const Welcome = () => {
  // React lifecycle such as ComponentDidMount
  // empty bracket makes this only run once
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navibar />
          {/* Route of index path loading Landing component */}
          <Route exact path="/" component={Landing} />
          <Route path="/dashboard" exact component={MainPage} />
          <Route path="/patients" exact component={PatientsList} />
          <Route path="/patients/add" exact component={AddPatient} />
          <Route path="/patients/edit/:id" exact component={EditPatient} />
          <Route path="/appointments" exact component={AppointmentList} />
          <Route path="/appointments/add" exact component={AddAppointment} />
          <Route
            path="/appointments/edit/:id"
            exact
            component={EditAppointment}
          />
          <section className="container">
            <div>
              <Alert />
              <Switch>
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
              </Switch>
            </div>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default Welcome;

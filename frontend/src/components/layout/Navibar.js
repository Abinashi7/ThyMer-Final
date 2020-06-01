import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const Navibar = ({ auth: { isAuthenticated, loading }, logout }) => {
  // if user is already logged in
  const authLinks = (
    <Fragment>
      <ul className="navbar-nav">
        <li className="nav-item active">
          <a className="nav-link" href="/dashboard">
            Home <span className="sr-only">(current)</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/patients">
            Patients
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/appointments">
            Appointments
          </a>
        </li>
      </ul>
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <a className="nav-link" onClick={logout} href="/">
            Logout
          </a>
        </li>
      </ul>
    </Fragment>
  );

  // if user is not logged in or is not the authorized user
  const guestLinks = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-items">
        <a className="nav-link" href="/register">
          Register
        </a>
      </li>
      <li className="nav-items">
        <a className="nav-link" href="/login">
          Login
        </a>
      </li>
    </ul>
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark" id="mainNav">
      <a className="navbar-brand" href="/dashboard">
        Therapy Manager
      </a>

      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Navibar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navibar);

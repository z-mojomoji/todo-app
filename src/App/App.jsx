import React from "react";
import { Router, Route, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { history } from "@/_helpers";
import { authenticationService } from "@/_services";
import { PrivateRoute } from "@/_components";
import { PrivilegePage } from "@/PrivilegePage";
import { LoginPage } from "@/LoginPage";

import logoLight from "../_assets/images/logo_light.svg";
import pointImg from "../_assets/images/Points-2x.png";

import "./App.scss";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
    };
  }

  componentDidMount() {
    authenticationService.currentUser.subscribe((x) =>
      this.setState({ currentUser: x })
    );
  }

  logout() {
    authenticationService.logout();
    history.push("/login");
  }

  render() {
    const { currentUser } = this.state;
    return (
      <Router history={history}>
        <ToastContainer position="top-center" />
        <>
          {currentUser && (
            <nav className="NavigationBar">
              <Link to="/" className="NavigationBar__logo">
                <img src={logoLight} alt="Feyverly" />
              </Link>
              <div className="NavigationBar__point">
                <img src={pointImg} alt="point" />
                <span className="NavigationBar__text">{currentUser.point}</span>
              </div>
            </nav>
          )}
          <div className="BodyContainer">
            <div className="BodyContainer__content">
              <PrivateRoute exact path="/" component={PrivilegePage} />
              <Route path="/login" component={LoginPage} />
            </div>
          </div>
        </>
      </Router>
    );
  }
}

export { App };

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { userActions } from "../_actions";

import "./LoginPage.scss";

function LoginPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  useEffect(() => {
    dispatch(userActions.logout());
  }, []);

  return (
    <div className="LoginPage">
      <h2 className="LoginPage__title">Login</h2>
      <div className="Container">
        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          validationSchema={Yup.object().shape({
            username: Yup.string().required("Username is required"),
            password: Yup.string().required("Password is required"),
          })}
          onSubmit={({ username, password }, { setStatus, setSubmitting }) => {
            setStatus();
            dispatch(userActions.login(username, password, from)).then(
              (error) => {
                setSubmitting(false);
                setStatus(error);
              }
            );
          }}
          render={({ errors, status, touched, isSubmitting }) => (
            <Form>
              <div className="FormControl__group">
                <label htmlFor="username" className="visually-hidden">
                  Username
                </label>
                <Field
                  name="username"
                  type="text"
                  placeholder="Username"
                  className={
                    "FormControl__control" +
                    (errors.username && touched.username
                      ? " FormControl--invalid"
                      : "")
                  }
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="FormControl--invalidFeedback"
                />
              </div>
              <div className="FormControl__group">
                <label htmlFor="password" className="visually-hidden">
                  Password
                </label>
                <Field
                  name="password"
                  type="password"
                  placeholder="Password"
                  className={
                    "FormControl__control" +
                    (errors.password && touched.password
                      ? " FormControl--invalid"
                      : "")
                  }
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="FormControl--invalidFeedback"
                />
              </div>
              <div className="FormControl__group">
                <button
                  type="submit"
                  className="Button Button--secondary Button--full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                  ) : (
                    "Sign in"
                  )}
                </button>
              </div>
              {status && <div className={"alert alert-danger"}>{status}</div>}
            </Form>
          )}
        />
      </div>
    </div>
  );
}

export { LoginPage };

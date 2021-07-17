import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { userActions } from '../_actions';

function LoginPage() {
    // const [inputs, setInputs] = useState({
    //     username: '',
    //     password: ''
    // });
    // const [submitted, setSubmitted] = useState(false);
    // const { username, password } = inputs;
    // const loggingIn = useSelector(state => state.authentication.loggingIn);
    const dispatch = useDispatch();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    // reset login status
    useEffect(() => { 
        dispatch(userActions.logout()); 
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    return (
        <div className="col-lg-8 offset-lg-2">
            <h2>Login</h2>
           <Formik
            initialValues={{
              username: "",
              password: "",
            }}
            validationSchema={Yup.object().shape({
              username: Yup.string().required("Username is required"),
              password: Yup.string().required("Password is required"),
            })}
            onSubmit={(
              { username, password },
              { setStatus, setSubmitting }
            ) => {
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
                <div className="LoginForm__group">
                  <label htmlFor="username" className="visually-hidden">
                    บัญชีผู้ใช้
                  </label>
                  <Field
                    name="username"
                    type="text"
                    placeholder="บัญชีผู้ใช้"
                    className={
                      "LoginForm__control" +
                      (errors.username && touched.username
                        ? " LoginForm--invalid"
                        : "")
                    }
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="LoginForm--invalidFeedback"
                  />
                </div>
                <div className="LoginForm__group">
                  <label htmlFor="password" className="visually-hidden">
                    รหัสผ่าน
                  </label>
                  <Field
                    name="password"
                    type="password"
                    placeholder="รหัสผ่าน"
                    className={
                      "LoginForm__control" +
                      (errors.password && touched.password
                        ? " LoginForm--invalid"
                        : "")
                    }
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="LoginForm--invalidFeedback"
                  />
                </div>
                <div className="LoginForm__group">
                  <button
                    type="submit"
                    className="LoginForm__button"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                    ) : (
                      "เข้าสู่ระบบ"
                    )}
                  </button>
                </div>
                {status && <div className={"alert alert-danger"}>{status}</div>}
              </Form>
            )}
          />
        </div>
    );
}

export { LoginPage };
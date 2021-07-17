import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Field, Form, ErrorMessage } from "formik";

import { todoActions } from '../_actions';
import "./EditTodoModal.scss";

function EditTodoModal(props) {
  const { id, title, description } = props;
  // const todo = useSelector(state => state.todo);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //     dispatch(todoActions.getTodoById(data));
  // }, []);


  return id ? (
    <div className="EditTodoModal">
      <div className="EditTodoModal__container">
        <h4 className="EditTodoModal__title">{id}</h4>
        <h4 className="EditTodoModal__title">{title}</h4>
        <p className="EditTodoModal__detail">{description}</p>
        <Formik
            initialValues={{
              id: id,
              title: title,
              description: description,
            }}
            onSubmit={(
              { id, title, description },
              { setStatus, setSubmitting }
            ) => {
              setStatus();
              // dispatch(todoActions.editTodo(id, title, description)).then(
              //   (error) => {
              //     setSubmitting(false);
              //     setStatus(error);
              //   }
              // );
            }}
            render={({ errors, status, touched, isSubmitting }) => (
              <Form>
                <div className="LoginForm__group">
                  <label htmlFor="title" className="visually-hidden">
                    Title
                  </label>
                  <Field
                    name="title"
                    type="text"
                    placeholder="บัญชีผู้ใช้"
                    className="LoginForm__control"
                  />
                </div>
                <div className="LoginForm__group">
                  <label htmlFor="description" className="visually-hidden">
                    Description
                  </label>
                  <Field
                    name="description"
                    type="description"
                    placeholder="รหัสผ่าน"
                    className="LoginForm__control"
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
                      "Edit Todo"
                    )}
                  </button>
                </div>
              </Form>
            )}
          />
      </div>
    </div>
  ): <>Helo</>;
}

export { EditTodoModal };

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";

import { todoActions } from "../_actions";
import "./EditTodoModal.scss";

function EditTodoModal(props) {
  const { id, title, description } = props;
  const dispatch = useDispatch();

  return id ? (
    <div className="EditTodoModal">
      <div className="EditTodoModal__container">
        <h3 className="EditTodoModal__title">Edit To-do</h3>
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
            dispatch(todoActions.editTodo(id, title, description)).then(
              (e) => e.preventDefault(),
              (error) => {
                setSubmitting(false);
                setStatus(error);
              }
            );
          }}
          render={({ isSubmitting }) => (
            <Form>
              <Field type="hidden" className="FormControl__control" name="id" />
              <div className="FormControl__group">
                <label htmlFor="title" className="FormControl__label">
                  Title
                </label>
                <Field
                  name="title"
                  type="text"
                  placeholder="Title"
                  className="FormControl__control"
                />
              </div>
              <div className="FormControl__group">
                <label htmlFor="description" className="FormControl__label">
                  Description
                </label>
                <Field
                  name="description"
                  type="text"
                  placeholder="Description"
                  className="FormControl__control FormControl__textArea"
                  as="textarea"
                />
              </div>
              <div className="FormControl__group FormControl__group--centered">
                <button
                  type="submit"
                  className="Button Button--primary EditTodoModal__button"
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
  ) : (
    <>Sorry there's nothing to render</>
  );
}

export { EditTodoModal };

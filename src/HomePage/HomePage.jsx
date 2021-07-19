import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "@/_components";
import { EditTodoModal } from "@/EditTodoModal";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { todoActions } from "../_actions";

import "./HomePage.scss";
import closeButton from "../_assets/images/close_light.svg";
import logoutIcon from "../_assets/images/logout.svg";
import editIcon from "../_assets/images/edit.svg";
import deleteIcon from "../_assets/images/delete.svg";

function HomePage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [selectedDes, setSelectedDes] = useState("");
  const [toggleSideMenu, setToggleSideMenu] = useState(false);
  const todos = useSelector((state) => state.todos.items);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(todoActions.getTodoList());
  }, []);

  function handleDeleteTodo(id) {
    dispatch(todoActions.removeTodo(id));
  }

  return todos ? (
    <div className="HomePage">
      <nav className="Navigation">
        <h2 className="Navigation__title">To-do List</h2>
        <Link to="/login" className="Navigation__logout">
          <img src={logoutIcon} alt="Log Out" />
        </Link>
      </nav>
      <div className="Container">
        {/* Todo List */}
        <ul className="TodoCards">
          {todos.map((todo) => (
            <li key={todo._id} className="TodoCard">
              <span className="TodoCard__label">Title</span>
              <span className="TodoCard__title">{todo.title}</span>
              <span className="TodoCard__label">Description</span>
              <span className="TodoCard__description">{todo.description}</span>
              <section className="TodoCard__buttonSection">
                <button
                  onClick={() => {
                    setSelectedId(todo._id);
                    setSelectedTitle(todo.title);
                    setSelectedDes(todo.description);
                    setShowModal(true);
                  }}
                  className="TodoCard__button TodoCard__button--edit"
                >
                  <img
                    src={editIcon}
                    alt="Edit Todo"
                    className="TodoCard__buttonIcon"
                  />
                  <span className="TodoCard__buttonText">Edit</span>
                </button>

                {todo.deleting ? (
                  <em> - Deleting...</em>
                ) : todo.deleteError ? (
                  <span className="text-danger">
                    {" "}
                    - ERROR: {todo.deleteError}
                  </span>
                ) : (
                  <button
                    onClick={() => handleDeleteTodo(todo._id)}
                    className="TodoCard__button TodoCard__button--delete"
                  >
                    <img
                      src={deleteIcon}
                      alt="Delete Todo"
                      className="TodoCard__buttonIcon"
                    />
                    <span className="TodoCard__buttonText">Delete</span>
                  </button>
                )}
              </section>
            </li>
          ))}
        </ul>

        {/* Add Todo */}
        <button
          className="Button Button--primary Button--round HomePage__addTodoButton"
          onClick={() => setToggleSideMenu(true)}
        >
          <img
            src={closeButton}
            alt="Add Todo"
            className="HomePage__addTodoIcon"
          />
        </button>
        {/* Add to do sidebar */}
        <div
          className={`SideMenu ` + (toggleSideMenu ? "SideMenu--active" : "")}
        >
          <div className="SideMenu__container">
            <h3 className="SideMenu__title">Add To-do</h3>
            <button
              onClick={() => setToggleSideMenu(false)}
              className="SideMenu__close"
            >
              <img src={closeButton} alt="Close" />
            </button>
            <Formik
              initialValues={{
                title: "",
                description: "",
              }}
              validationSchema={Yup.object().shape({
                title: Yup.string().required("Title is required"),
              })}
              onSubmit={(
                { title, description },
                { setStatus, setSubmitting }
              ) => {
                setStatus();
                dispatch(todoActions.addTodo(title, description)).then(
                  (e) => e.preventDefault(),
                  (error) => {
                    setSubmitting(false);
                    setStatus(error);
                  }
                );
              }}
              render={({ errors, status, touched, isSubmitting }) => (
                <Form>
                  <div className="FormControl__group">
                    <label htmlFor="title" className="FormControl__label">
                      Title
                    </label>
                    <Field
                      name="title"
                      type="text"
                      placeholder="Title"
                      className={
                        "FormControl__control" +
                        (errors.title && touched.title
                          ? " FormControl--invalid"
                          : "")
                      }
                    />
                    <ErrorMessage
                      name="title"
                      component="div"
                      className="FormControl--invalidFeedback"
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
                  <div className="FormControl__group">
                    <button
                      type="submit"
                      className="Button Button--primary"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                      ) : (
                        "Add Todo"
                      )}
                    </button>
                  </div>
              {status && <div className={"alert alert-danger"}>{status}</div>}
                </Form>
              )}
            />
          </div>
        </div>

        {todos && (
          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <EditTodoModal
              id={selectedId}
              title={selectedTitle}
              description={selectedDes}
            />
          </Modal>
        )}
      </div>

      <div
        className={
          `SideMenu__backdrop ` +
          (toggleSideMenu ? "SideMenu__backdrop--active" : "")
        }
      />
    </div>
  ) : (
    <></>
  );
}

export { HomePage };

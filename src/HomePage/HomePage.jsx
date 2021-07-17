import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from "@/_components";
import { EditTodoModal } from "@/EditTodoModal";
import { Formik, Field, Form, ErrorMessage } from "formik";

import { todoActions } from '../_actions';

function HomePage() {
    const [showModal, setShowModal] = useState(false);
    const [selectedId, setSelectedId] = useState(0);
    const [selectedTitle, setSelectedTitle] = useState('');
    const [selectedDes, setSelectedDes] = useState('');
    const todos = useSelector(state => state.todos.items);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(todoActions.getTodoList());
    }, []);

    function handleDeleteTodo(id) {
        dispatch(todoActions.removeTodo(id));
    }

    return todos ? (
        <div className="col-lg-8 offset-lg-2">
        <Link to="/login">Logout</Link>
        {/* Add Todo */}
        <Formik
            initialValues={{
              title: "",
              description: "",
            }}
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
            render={({ isSubmitting }) => (
              <Form>
                <div className="LoginForm__group">
                  <label htmlFor="title" className="visually-hidden">
                    Title
                  </label>
                  <Field
                    name="title"
                    type="text"
                    placeholder="Title"
                    className="LoginForm__control"
                  />
                </div>
                <div className="LoginForm__group">
                  <label htmlFor="description" className="visually-hidden">
                    Description
                  </label>
                  <Field
                    name="description"
                    type="text"
                    placeholder="Description"
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
                      "Add Todo"
                    )}
                  </button>
                </div>
              </Form>
            )}
          />

        {/* Todo List */}
            <ul>
                {
                todos.map((todo) =>
                <li key={todo._id} >
                    {todo.title}
                    {todo.description}
                    <button onClick={() => {
                        setSelectedId(todo._id);
                        setSelectedTitle(todo.title);
                        setSelectedDes(todo.description);
                        setShowModal(true);
                    } 
                    }>Edit</button>

                    {
                        todo.deleting ? <em> - Deleting...</em>
                        : todo.deleteError ? <span className="text-danger"> - ERROR: {todo.deleteError}</span>
                        : <span> - <a onClick={() => handleDeleteTodo(todo._id)} className="text-primary">Delete</a></span>
                    }
                </li>
            )}
            </ul>
            {todos && (
                <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                >
                    <EditTodoModal id={selectedId} title={selectedTitle} description={selectedDes} />
                </Modal>
            )}
        </div>
    ) : (
        <></>
    );
}

export { HomePage };
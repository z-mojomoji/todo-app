import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { todoActions } from '../_actions';

function HomePage() {
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
            <ul>
                {todos.map((todo) =>
                    <li key={todo._id}>
                        {todo.title}
                        {todo.description}
                        {
                            todo.deleting ? <em> - Deleting...</em>
                            : todo.deleteError ? <span className="text-danger"> - ERROR: {todo.deleteError}</span>
                            : <span> - <a onClick={() => handleDeleteTodo(todo._id)} className="text-primary">Delete</a></span>
                        }
                    </li>
                )}
            </ul>
            <p>You're logged in with React Hooks!!</p>
            <h3>All registered todos:</h3>
            <p>
                <Link to="/login">Logout</Link>
            </p>
        </div>
    ) : (
        <></>
    );
}

export { HomePage };
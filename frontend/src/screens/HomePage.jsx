import React from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import {logout} from "../redux/userSlice";
import {removeTokens} from "../redux/tokenStore";
import FormMessage from "../components/FormMessage";

const Container = styled.div`
  width: 100%;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const HomePage = () => {
  const dispatch = useDispatch()
  const handleSignOut = (e) => {
    e.preventDefault();
    dispatch(logout());
    removeTokens();
  }

  const user = useSelector((state) => state.userReducer.user)
  const messages = useSelector((state) => state.messageReducer.messages)
  const isAuthenicated = !isEmpty(user);
  if(!isAuthenicated) {
    return <Redirect to="/signin"/>
  }

  return (
    <Container className="p-3">
      <div className="card p-3 w-100 mb-3">
        <p>Username: {user.username}</p>
        <p>Email: {user.email}</p>
        <button className="btn btn-outline-danger" onClick={handleSignOut}> Signout</button>
      </div>
      <div className="card p-3 w-100 mb-3">
        <div className="card-header">
          Data send to Rails
          <FormMessage/>
        </div>
      </div>
      <div className="card p-3 w-100 mb-3">
        <div className="card-header">
          Data from Socket
        </div>
        <div className="card-body">
          <ul className="list-group">
            {
              messages.map((message, i) => (
                <li key={i} className="list-group-item disabled">{message}</li>
              ))
            }
          </ul>
        </div>
      </div>
    </Container>
  );
}

export default HomePage

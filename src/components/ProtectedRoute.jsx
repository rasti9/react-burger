import { Route, Redirect, useLocation, useHistory } from 'react-router-dom';
import {useDispatch, Provider, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {store} from '../services/store.js';
import { getUserInfo} from '../services/actions/auth.js';

export function ProtectedRoute({ children, ...rest }) {
    return (
      <Provider store={store}> 
        <ProtectedRoutePage children={children} rest={rest} /> 
      </Provider>
    )
  }

function ProtectedRoutePage(props) {
    const { children, rest } = props;
    const dispatch = useDispatch();
    const {isAuth, isPasswordReset} = useSelector(state => state.userInfo);
    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        dispatch(getUserInfo(false));
    }, []);

    return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuth ? (
          children
        ) : (
            <Redirect to={{pathname: '/login', state: { from: location }}}/>
        )
            
      }
    />
  );
} 
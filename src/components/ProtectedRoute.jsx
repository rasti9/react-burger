import { Route, Redirect } from 'react-router-dom';
import {useDispatch, useSelector } from 'react-redux';
import { useEffect} from 'react';
import { getUserInfo} from '../services/actions/auth.js';

export function ProtectedRoute({ children, ...rest }) {
    const dispatch = useDispatch();
    const {isAuth} = useSelector(state => state.userInfo);

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
import React, { FC, ReactElement, useContext } from 'react';
// import { useSelector } from 'react-redux';
import { Navigate } from 'react-router'
import { AuthContext } from '../context/auth';

interface Props {
    children: ReactElement<any, any> | null;
}

export const PublicRoute: FC<Props> = ({ children }) => {
    // const uid=localStorage.getItem('uid');
    // const {uid} = useSelector(state=>state.auth);
    // console.log(uid);
    const { user: { uuid } } = useContext(AuthContext);
    return uuid
        ? <Navigate to="/user/profile" />
        : children
}

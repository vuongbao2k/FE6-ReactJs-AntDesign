/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteAllCookies } from '../../helpers/cookie';
import { checkLogin } from '../../actions/login';

function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  deleteAllCookies();
  useEffect(() => {
    dispatch(checkLogin(false));
    navigate("/login");
  }, [])
  return (
    <></>
  )
}

export default Logout
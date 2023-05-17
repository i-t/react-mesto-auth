import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ component: Component, ...props }) {
  // console.log(props.isLoggedIn)

  return (
    props.isLoggedIn ? <Component {...props} /> : <Navigate to="/sign-up" />
  )


}

export default ProtectedRoute;
import React from 'react'
import { Route, Redirect } from 'react-router-dom'

function ProtectedRoute({ component: Component, loggedIn, ...props }) {
  return (
    <Route>
      {() =>
        loggedIn === true ? <Component {...props} /> : <Redirect to="./login" />
      }
    </Route>
  )
}

export default ProtectedRoute

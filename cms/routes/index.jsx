import React from 'react'
import { Route } from 'react-router'

import EditPost from './../components/edit_post/root.jsx'

export default (
  <Route path='/admin/posts'>
    <Route path='new' component={EditPost} />
    <Route path=':id/:action' component={EditPost} />
  </Route>
)

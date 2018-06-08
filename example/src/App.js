import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { Provider as CroodsProvider } from 'croods'

import store from './store/store'
import List from './colors/List'

export default props => (
  <ReduxProvider store={store}>
    <CroodsProvider baseUrl="https://reqres.in/api">
      <div style={{ textAlign: 'center', padding: 20 }}>
        <List />
      </div>
    </CroodsProvider>
  </ReduxProvider>
)

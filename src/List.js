import { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import createActions from './createActions'
import withOptions from './withOptions'

@withOptions
@connect(
  (state, { name }) => ({ ...state[name] }),
  (dispatch, { name, parseResponse, options }) => ({
    actions: bindActionCreators(
      createActions({ ...options, name, parseResponse }),
      dispatch,
    ),
  }),
)
export default class extends Component {
  componentWillMount() {
    const { list, actions } = this.props

    if (!list) {
      actions.list()
    }
  }

  render() {
    const { options, ...props } = this.props
    const { render, list, listing, listError } = props
    const { renderLoading, renderError } = options

    if (listError) {
      return renderError(listError)
    }

    if (!list || listing) {
      return renderLoading()
    }

    return render(props)
  }
}

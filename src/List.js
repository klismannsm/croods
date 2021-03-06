import { Component } from 'react'
import { connect } from 'react-redux'

import withOptions from './withOptions'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'

@withOptions
@connect(
  mapStateToProps,
  mapDispatchToProps,
)
export default class extends Component {
  componentWillMount() {
    const { list, actions } = this.props

    if (!list) {
      actions.fetchList()
    }
  }

  render() {
    const { options, render, list, fetchingList, listError } = this.props
    const { renderLoading, renderError } = options

    if (listError) {
      return renderError(listError)
    }

    if (!list || fetchingList) {
      return renderLoading()
    }

    return render(list)
  }
}

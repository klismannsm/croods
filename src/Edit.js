import { Component } from 'react'
import { connect } from 'react-redux'

import withOptions from './withOptions'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import setOrFetchInfo from './setOrFetchInfo'

@withOptions
@connect(
  mapStateToProps,
  mapDispatchToProps,
)
export default class extends Component {
  constructor(props) {
    super(props)
    setOrFetchInfo(props)
  }

  componentWillReceiveProps(nextProps) {
    const { id } = nextProps
    const { id: oldId } = this.props

    if (id.toString() !== oldId.toString()) {
      setOrFetchInfo(nextProps)
    }
  }

  componentDidUpdate(prevProps) {
    const { actions, updated } = this.props
    const { updated: oldUpdated } = prevProps

    if (updated && !oldUpdated) {
      actions.resetUpdated()
    }
  }

  render() {
    const { render, renderUpdated, actions, info, fetchingInfo } = this.props
    const { infoError, updated, updating, updateError: error } = this.props
    const { options } = this.props
    const { update } = actions
    const { renderLoading, renderError } = options

    if (infoError) {
      return renderError(infoError)
    }

    if (!info || fetchingInfo) {
      return renderLoading()
    }

    if (updated) {
      return renderUpdated(updated)
    }

    return render({ info, update, updating, error })
  }
}

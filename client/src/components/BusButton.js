import React, { Component } from 'react'
// import {RaisedButton} from 'material-ui'

export default class BusButton extends Component {
  render() {
    return (
      <button onClick={this.props.onClick} className={'btn'}>
        <span>Quero um busão</span><br/><br/>
        <span><i className='material-icons'>directions_bus</i></span>
      </button>
    )
  }
}

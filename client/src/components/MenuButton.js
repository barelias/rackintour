import React, { Component } from 'react'

export default class MenuButton extends Component {
  render() {
    return (
      <div>
        <button onClick={this.props.onClick} className='menuBtn'><i className='material-icons'>menu</i></button>
      </div>
    )
  }
}

import React, { Component } from 'react'
import { RaisedButton } from 'material-ui';
import BusButton from './BusButton'
import StopMap from './StopsMap'
import {geolocated} from 'react-geolocated'
import Dialog from 'material-ui/Dialog';


var fadeOpacity = .5;

export default class FrontPage extends Component {
  constructor(props){
    super(props)

    this.state = {
      markers : [],
      buttonVisible: true,
      mapDisabled: true
    }

    this.buttonClick = this.buttonClick.bind(this)
  }


  buttonClick = () => {
    this.setState({ mapDisabled : false })
    this.setState({ buttonVisible : false })

    console.log(this.state)
  }

  componentWillMount(){
    const url = 'https://gist.githubusercontent.com/muztake/dcb136ba9e140734b55e2840b54f19e0/raw/9ff5ad2920f75826b1fc5c22ca2952a424be040e/stops.json'
    fetch(url)
      .then(data => data.json())
      .then(data => this.setState({ markers : data }))
  }

  render() {
    return (
      <div className='frontPage'>
        <div className={'fade' + (this.state.mapDisabled ? '' : ' out')} ></div>
        <StopMap 
          style={{position: "absolute"}}
          markers={this.state.markers}
        />
        
        {this.state.buttonVisible ? <BusButton onClick={this.buttonClick}/> : ''}
      </div>
    )
  }
}

import React, { Component } from 'react'
import { compose, withProps, withState, withStateHandlers } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"
import { MarkerClusterer } from "react-google-maps/lib/components/addons/MarkerClusterer";
import GoogleMapsLoader from 'google-maps'

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import TimePicker from 'material-ui/TimePicker';

const style = {
  position : "absolute",
  top : "0px",
  left : "0px",
  right : "0px",
  bottom : "0px",
  zIndex: 1
}

const GMap = withScriptjs(withGoogleMap( props => {
  return (<GoogleMap
    style={ style }
    defaultZoom={10}
    defaultOptions={{
      draggable: true,
      streetViewControl: false,
      scaleControl: true,
      mapTypeControl: false,
      panControl: true,
      zoomControl: true,
      rotateControl: true,
      fullscreenControl: false
    }}
    center={{ lat:  -23.5489, lng:  -46.6388 }}
    // onCenterChanged={() => props.onCenterChanged(this.getCenter())}
  >
    <MarkerClusterer>
      { props.markers.map( m => 
          <Marker
            defaultIcon={"https://i.cubeupload.com/msMI8f.png"}
            key={m.id}
            onClick={ () => { props.handleOpen(m.id) } }
            position={{ lat:m.lat, lng: m.lon}}
          />
      )}
    </MarkerClusterer>
  </GoogleMap>)
}))

class StopMap extends Component {
    constructor(props){
      super(props)
      this.state = {
        modalOpen: false,
        openMarkers : {},
        pos : { lat: 0, lng: 0},
        linha : [],
        linhaSelecionada : '',
        horario: {},
        ponto_id : 0,
        snack: false
      }
      this.handleOpen = this.handleOpen.bind(this)
      this.handleChange = this.handleChange.bind(this)
      this.handleHorarioChange = this.handleHorarioChange.bind(this)
      this.handleClose = this.handleClose.bind(this)
      this.sendData = this.sendData.bind(this)
      this.handleRequestClose = this.handleRequestClose.bind(this)
    }
    
    handleOpen = (id) => {
      var _linha = this.props.markers.find( a => a.id == id).linha
      if(typeof _linha == 'string') _linha = [_linha]
      this.setState({ linha:  _linha})
      this.setState({ponto_id:id})
      this.setState({modalOpen: true})
    };

    getCenter(pos){
      console.log(pos)
    }
    
    handleClose = () => {
      this.setState({modalOpen: false});
    };
  
    handleChange = (e, i, v) => {
      this.setState({ linhaSelecionada: v })
    }

    handleHorarioChange = (e, i, v) => {
      this.setState({ horario: v })
    }

    handleRequestClose = () => {
      this.setState({ snack: false })
    }

    sendData = () => {
      this.setState({ snack: true })
      fetch('http://localhost:2000/chamado', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          linha   : this.state.linhaSelecionada,
          horario : this.state.horario,
          data    : new Date().toDateString(),
          ponto   : this.state.ponto_id
        })
      })
      this.handleClose()
    }
    

    render(props){
      const actions = [
        <FlatButton
          label="Cancelar"
          primary={true}
          onClick={this.handleClose}
        />,
        <FlatButton
          label="Aceitar"
          primary={true}
          keyboardFocused={true}
          onClick={this.sendData}
        />,
      ]

      return <div>
          <Dialog
            title="Escolha a linha"
            actions={actions}
            modal={false}
            open={this.state.modalOpen}
            onRequestClose={this.handleClose}
          >
            <SelectField
              floatingLabelText="Escolha a linha"
              value={this.state.linhaSelecionada}
              onChange={this.handleChange}
            >
            { this.state.linha.map( a => <MenuItem value={a} key={a} primaryText={'Linha ' + a} />)}
            </SelectField>
            <TimePicker
              value={this.state.horario}
              onChange={this.handleHorarioChange}
              hintText="Horário"
            />
            
          </Dialog>
          <GMap
            ref = {this.onMapMount}
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
            loadingElement= {(<div style={{ height: `100%` }} />)}
            containerElement= {(<div style={ style } />)}
            mapElement= {(<div style={{ height: `100%`, zIndex: 0}} />)}
            coords={this.props.coords}
            markers={this.props.markers}
            handleOpen={this.handleOpen}
            />
            <Snackbar
              open={this.state.snack}
              message="Chamado solicitado com sucesso!"
              autoHideDuration={4000}
              onRequestClose={this.handleRequestClose}
            />
        </div>
      }
}


export default StopMap;
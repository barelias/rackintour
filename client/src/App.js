import React, { Component } from 'react';
import {MuiThemeProvider} from 'material-ui';
import {AppBar, Drawer, MenuItem, IconButton} from 'material-ui';
import FrontPage from './components/FrontPage'
import MenuButton from './components/MenuButton'

class App extends Component {
  // Bob o
  constructor(props){
    super(props)

    this.state = {
      drawer_open : false
    }
    this.openDrawer = this.openDrawer.bind(this)
  }

  openDrawer(){
    this.setState({ drawer_open: true })
  }

  render() {
    return (
      <MuiThemeProvider>
        {/* <AppBar 
          title = 'Tartaruga'
          iconElementLeft={
            <IconButton onClick={this.openDrawer}>
              <i className={'material-icons'}>menu</i>
            </IconButton>
          }
        /> */}
        <MenuButton
          onClick={this.openDrawer}
        />
        <Drawer
          docked={false}
          width={200}
          open={this.state.drawer_open}
          onRequestChange={(open) => this.setState({ drawer_open: open })}
        >
          <MenuItem>Horários Fixos</MenuItem>
        </Drawer>
        <FrontPage />
      </MuiThemeProvider>
    );
  }
}

export default App;

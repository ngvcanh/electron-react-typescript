import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import * as Components from './Components';
import { TitleBarMenu } from './Constants/Menu';
import Logo from './assets/img/logo.png';

const App: React.FunctionComponent = () => {

  return <BrowserRouter>
    <Components.Base.Container fluid>
    
      <Components.Layout.TitleBar logo={ Logo } menu={ TitleBarMenu } />
      <Components.Layout.RenderRouter />
    </Components.Base.Container>
  </BrowserRouter>

}

export default hot(module)(App);
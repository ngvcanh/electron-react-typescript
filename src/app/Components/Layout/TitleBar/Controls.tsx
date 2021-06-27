import React from 'react';
import Icon from './Icon';
import utils from '../../../utils';
import { HTMLDivProps } from '../../../Define/HTML';

import { 
  VscChromeClose, 
  VscChromeMaximize, 
  VscChromeMinimize, 
  VscChromeRestore 
} from 'react-icons/vsc';

interface TitleBarControlsProps extends HTMLDivProps{}

interface TitleBarControlsComponent extends React.FunctionComponent<TitleBarControlsProps>{}

const TitleBarControls: TitleBarControlsComponent = () => {

  const [ isMaximize, setMaximize ] = React.useState(true);
  const clickMinimize = () => utils.KenSoni.minimize();
  const clickToggle = () => setMaximize(!isMaximize) === undefined && utils.KenSoni.maximize();
  const clickClose = () => utils.KenSoni.closeWindow();

  return <div className="kensoni-titlebar-controls">
    <Icon Icon={ VscChromeMinimize } onClick={ clickMinimize } />
    <Icon Icon={ isMaximize ? VscChromeRestore : VscChromeMaximize } onClick={ clickToggle } />
    <Icon Icon={ VscChromeClose } className="kensoni-titlebar-close" onClick={ clickClose } />
  </div>

}

export default TitleBarControls;
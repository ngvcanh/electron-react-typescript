import React from 'react';
import utils from '../../../utils';
import Menu, { MenuProps } from './Menu';

interface MenuHorizontalProps extends MenuProps{}

interface MenuHorizontalComponent extends React.FunctionComponent<MenuHorizontalProps>{}

const MenuHorizontal: MenuHorizontalComponent = props => {

  const { className, ...others } = props;
  const menuClass = utils.className('kensoni-menu-horizontal', className);

  return <Menu className={ menuClass } { ...others } />

}

export default MenuHorizontal;
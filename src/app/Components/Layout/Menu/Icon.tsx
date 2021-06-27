import React from 'react';
import utils from '../../../utils';
import { IconType } from 'react-icons';
import { ReactIcon } from '../../Base';
import { BsCircle } from 'react-icons/bs';

interface MenuIconProps{
  className?: string;
  Icon?: IconType;
  useIcon: boolean;
}

interface MenuIconComponent extends React.FunctionComponent<MenuIconProps>{}

const MenuIcon: MenuIconComponent = props => {

  const { useIcon, className, Icon } = props;

  if (!useIcon) return null;

  return <span className={ utils.className('kensoni-menu-icon', className) }>
    { <ReactIcon Icon={ Icon ? Icon : BsCircle } /> }
  </span>

}

export default MenuIcon;
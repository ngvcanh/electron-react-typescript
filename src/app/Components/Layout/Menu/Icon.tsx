import React from 'react';
import utils from '@kensoni/react-utils';
import Icons, { IconType } from '@kensoni/react-icons';

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
    { <Icons.Icon Icon={ Icon ? Icon : Icons.BsCircle } /> }
  </span>

}

export default MenuIcon;
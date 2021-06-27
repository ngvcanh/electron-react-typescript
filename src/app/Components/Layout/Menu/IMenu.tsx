import React from 'react';
import MenuIcon from './Icon';
import { MenuItem, SubMenu, MenuDivider, MenuHeader, MenuItemProps, ClickEvent } from '@szhsin/react-menu';
import { IconType } from 'react-icons';
import { ERole, RoleOptions } from '../../../Constants/Role';
import utils from '../../../utils';

interface IRole{
  name: ERole;
  options: RoleOptions;
}

export interface IMenuItem{
  href?: string;
  icon?: IconType;
  isDivider?: boolean;
  isHeader?: boolean;
  items?: IMenuItem[];
  name?: string;
  onClick?(): void;
  role?: ERole | IRole;
}

export interface RectElement {
  getBoundingClientRect(): {
    left: number;
    right: number;
    top: number;
    bottom: number;
    width: number;
    height: number;
  };
}

const clickRole = (item: IMenuItem) => (e: ClickEvent) => {
  if (!item.role) return;

  if (typeof item.role === 'string'){
    utils.roleHandler(item.role);
  }
  else{
    utils.roleHandler(item.role.name, item.role.options);
  }
}

const clickHref = (href: string) => () => {
  if (utils.isInternalLink(href)){
    utils.KenSoni.openExternalLink(href);
  }
  else{
    window.location.href = href;
  }
}

const getItemProps = (item: IMenuItem): MenuItemProps => {
  const props: MenuItemProps = {};

  if (item.href){
    props.onClick = clickHref(item.href);
  }
  else if (item.role){
    props.onClick = clickRole(item);
  }
  else{
    props.onClick = item.onClick;
  }

  return props;
}

export const renderItem = (items: IMenuItem | IMenuItem[]) => {
  if (!Array.isArray(items)) items = [ items ];

  const useIcon = !!items.filter(item => !!item.icon).length;

  return items.map((_item, index) => {

    const itemProps = getItemProps(_item);

    if (_item.isDivider){
      return <MenuDivider key={ index } />
    }

    if (_item.isHeader){
      return <MenuHeader key={ index }>
        <MenuIcon Icon={ _item.icon } useIcon={ useIcon } />
        { _item.name }
      </MenuHeader>
    }

    if (_item.items?.length){
      return <SubMenu key={ index } label={ _item.name }>
        { renderItem(_item.items) }
      </SubMenu>
    }

    return <MenuItem key={ index } { ...itemProps }>
      <MenuIcon Icon={ _item.icon } useIcon={ useIcon } />
      { _item.name }
    </MenuItem>;
  });
}
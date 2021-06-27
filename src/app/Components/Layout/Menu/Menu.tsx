import React from 'react';
import utils from '../../../utils';
import MenuItem from './Item';
import { IMenuItem } from './IMenu';

export interface MenuProps{
  className?: string;
  items?: IMenuItem[];
}

interface MenuComponent extends React.FunctionComponent<MenuProps>{}

const Menu: MenuComponent = props => {

  const { className, items = [] } = props;
  const menuClass = utils.className('kensoni-menu', className);

  if (!items.length) return null;

  return <div className={ menuClass }>
    <ul className="kensoni-ul kensoni-menu-wrapper">
      {items.map((item, key) => <MenuItem key={ key } item={ item } isRoot />)}
    </ul>
  </div>

}

export default React.memo(Menu);
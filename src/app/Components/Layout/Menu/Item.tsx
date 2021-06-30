import React from 'react';
import MenuContext, { MenuContextRef } from './Context';
import { IMenuItem, renderItem } from './IMenu';

interface MenuItemProps{
  isRoot?: boolean;
  useIcon?: boolean;
  item: IMenuItem;
}

interface MenuItemComponent extends React.FunctionComponent<MenuItemProps>{}

const MenuItem: MenuItemComponent = props => {

  const { isRoot, item } = props;
  const contextRef = React.useRef<MenuContextRef>(null);
  const itemRef = React.useRef(null);
  const clickItem = () => contextRef.current?.toggle();

  if (isRoot){
    return <React.Fragment>
      <li className="kensoni-menu-item" ref={ itemRef } onClick={ clickItem }>
        <p>{ item.name }</p>
      </li>
      {!!item.items?.length && 
        <MenuContext ref={ contextRef } items={ item.items } anchorRef={ itemRef } isOpen={ false } />
      }
    </React.Fragment>
  }

  return <React.Fragment>
    { renderItem(item) }
  </React.Fragment>

}

export default MenuItem;
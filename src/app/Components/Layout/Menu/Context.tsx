import React from 'react';
import MenuItem from './Item';
import { ControlledMenu } from '@szhsin/react-menu';
import { IMenuItem, RectElement, renderItem } from './IMenu';

export interface MenuContextRef{
  toggle(): void;
  open(): void;
  close(): void;
};

interface MenuContextProps{
  anchorRef: React.RefObject<Element | RectElement>;
  isContext?: boolean;
  isOpen: boolean;
  items: IMenuItem[];
}

interface MenuContextComponent extends React.ForwardRefRenderFunction<MenuContextRef, MenuContextProps>{}

const MenuContext: MenuContextComponent = (props, ref) => {

  const { anchorRef, isContext = false, isOpen, items } = props;

  const [ openMenu, setOpenMenu ] = React.useState(isOpen);
  const [ anchorPoint, setAnchorPoint ] = React.useState({ x: 0, y: 0 });

  React.useImperativeHandle(ref, () => ({
    toggle: () => setOpenMenu(!openMenu),
    open: () => setOpenMenu(true),
    close: () => setOpenMenu(false)
  }));

  const close = () => setOpenMenu(false);

  const renderMenu = (p = {}) => {
    return <ControlledMenu theming="dark" anchorRef={ anchorRef } isOpen={ openMenu } onClose={ close } { ...p }>
      { renderItem(items) }
    </ControlledMenu>;
  }

  const handleContext = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setAnchorPoint({ x: e.clientX, y: e.clientY });
    setOpenMenu(true);
  }

  if (!items.length) return null;

  if (isContext){
    return <div onContextMenu={ handleContext }>
      { renderMenu({ anchorPoint }) }
    </div>
  }

  return renderMenu();

}

export default React.forwardRef(MenuContext);
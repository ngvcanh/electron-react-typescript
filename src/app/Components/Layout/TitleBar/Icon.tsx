import React from 'react';
import utils from '@kensoni/react-utils';
import Icons, { IconType } from '@kensoni/react-icons';
import { HTMLDivProps } from '../../../Define/HTML';

interface TitleBarIconProps extends HTMLDivProps{
  Icon: IconType;
  onClick?(): void;
}

interface TitleBarIconComponent extends React.FunctionComponent<TitleBarIconProps>{}

const TitleBarIcon: TitleBarIconComponent = props => {

  const { className, Icon, onClick } = props;
  const iconClass = utils.className('kensoni-titlebar-icons', className);

  return <div className={ iconClass } onClick={ onClick }>
    <Icons.Icon Icon={ Icon } className="kensoni-titlebar-icon" />
  </div>

}

export default TitleBarIcon;
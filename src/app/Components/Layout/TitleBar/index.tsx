import React from 'react';
import { HTMLDivProps } from '../../../Define/HTML';
import utils from '../../../utils';
import Controls from './Controls';
import Title from './Title';
import Logo from './Logo';
import { MenuHorizontal, IMenuItem } from '../Menu';

interface TitleBarProps extends HTMLDivProps{
  logo: string;
  title?: string;
  menu?: IMenuItem[]
}

interface TitleBarComponent extends React.FunctionComponent<TitleBarProps>{}

const TitleBar: TitleBarComponent = props => {

  const { className, children, logo, menu = [], title, ...others } = props;
  const [ dargTitle ] = React.useState(() => {
    if (!title) return 'KenSoni Testing';
    return title;
  });
  const titleClass = utils.className('kensoni-titlebar', className);

  return <div className={ titleClass } { ...others }>
    <div className="kensoni-titlebar-wrapper">
      {/* <div className="kensoni-titlebar-drag-region"></div> */}
      <Logo logo={ logo } />
      <MenuHorizontal items={ menu } />
      <Title>{ dargTitle }</Title>
      <Controls />
    </div>
  </div>

}

export default TitleBar;
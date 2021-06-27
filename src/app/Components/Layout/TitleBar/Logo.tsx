import React from 'react';
import { HTMLDivProps } from '../../../Define/HTML';
import utils from '../../../utils';

interface TitleBarLogoProps extends HTMLDivProps{
  logo: string;
}

interface TitleBarLogoComponent extends React.FunctionComponent<TitleBarLogoProps>{}

const TitleBarLogo: TitleBarLogoComponent = props => {

  const { className, logo, children, ...others } = props;
  const logoClass = utils.className('kensoni-titlebar-logo', className);

  return <div className={ logoClass } { ...others }>
    <img src={ logo } alt="" />
  </div>

}

export default TitleBarLogo;
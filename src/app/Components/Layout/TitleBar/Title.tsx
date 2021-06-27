import React from 'react';
import { HTMLDivProps } from '../../../Define/HTML';

interface TitleBarTitleProps extends HTMLDivProps{}

interface TitleBarTitleCcomponent extends React.FunctionComponent<TitleBarTitleProps>{}

const TitleBarTitle: TitleBarTitleCcomponent = props => {

  const { children } = props;

  return <div className="kensoni-titlebar-title">
    { children }
  </div>

}

export default TitleBarTitle;
import React from 'react';
import utils from '@kensoni/react-utils';
import { HTMLDivProps } from '../../../Define/HTML';

interface ContainerProps extends HTMLDivProps{
  fluid?: boolean;
}

interface ContainerComponent extends React.FunctionComponent<ContainerProps>{}

const Container: ContainerComponent = props => {

  const { className, fluid, children, ...others } = props;
  const fluidClass = utils.className('container', { fluid }).replace(' ', '-');
  const elClass = utils.className(fluidClass, className);

  return <div className={ elClass } { ...others }>
    { children }
  </div>

}

export default Container;
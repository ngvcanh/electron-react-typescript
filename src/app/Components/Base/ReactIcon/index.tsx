import React from 'react';
import { IconContext, IconType } from 'react-icons';
import utils from '../../../utils';

interface ReactIconProps extends IconContext{
  clasName?: string;
  Icon: IconType;
}

interface ReactIconComponent extends React.FunctionComponent<ReactIconProps>{}

const ReactIcon: ReactIconComponent = props => {

  const { children, className, Icon, ...others } = props;
  const iconClass = utils.className('kensoni-icons', className);

  return <IconContext.Provider value={{ ...others, className: iconClass }}>
    <Icon />
  </IconContext.Provider>

}

export default ReactIcon;
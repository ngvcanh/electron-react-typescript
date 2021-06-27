import React from 'react';
import { StaticContext } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { IconType } from 'react-icons';

export interface IRouter{
  active?: boolean;
  component: React.ComponentType<RouteComponentProps<any, StaticContext, unknown>> | React.ComponentType<any> | null;
  exact?: boolean;
  groupName?: string;
  icon?: IconType;
  items?: IRouter[];
  name?: string;
  uri: string;
}
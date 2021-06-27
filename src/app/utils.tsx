import React from 'react';
import { FaSleigh } from 'react-icons/fa';
import { IKenSoni } from '../shared/preload';
import { ERole, Role, RoleOptions } from './Constants/Role';
import { 
  Destructor, 
  DestructorDependencies, 
  Dependencies, 
  ReactChildrenCallback, 
  ReactNode
} from './Define/DidMount';

declare global{
  interface Window{
    KenSoni: IKenSoni
  }
}



const utils = {

  KenSoni: window.KenSoni,

  roleHandler: (role: ERole, options?: RoleOptions) => {
    switch(role){
      case ERole.COPY:
        return Role.copy(options);
      case ERole.PASTE:
        return Role.paste(options);
      case ERole.CUT:
        return Role.cut(options);
      case ERole.OPENFILE:
        return Role.openFile(options);
      case ERole.OPENFOLDER:
        return Role.openFolder(options);
      default: throw new Error('Role undefined');
    }
  },

  className: (...classes: any[]): string => {
    let arr: string[] = [];

    classes.map(_cls => {
      let type = typeof _cls;

      switch(type){
        case 'string':
        case 'bigint':
        case 'number':
          _cls = _cls.toString();
          _cls.length && (arr = arr.concat(_cls.replace(/\s+/, ' ').split(' ')));
          break;
        case 'object':
          if (Array.isArray(_cls)){
            arr.push(utils.className(..._cls));
          }
          else if (_cls){
            for (let x in _cls){
              !!_cls[x] && arr.push(x);
            }
          }
      }

      return null;
    });

    return arr.filter((_cls, index, self) => self.indexOf(_cls) === index).join(' ');
  },

  didMount: (mount: Destructor, ...desdep: Dependencies) => {
    let destructor: DestructorDependencies | undefined = desdep[0];
    let dependencies: DestructorDependencies | undefined = desdep[1];

    if (Array.isArray(destructor)){
      dependencies = desdep[0];
      destructor = desdep[1];
    }

    React.useEffect(() => {
      mount();

      return () => {
        destructor && (destructor as Destructor)();
      }
    }, dependencies as (React.DependencyList | undefined));
  },

  children: (children: ReactNode, callback: ReactChildrenCallback) => {
    return React.Children.toArray(children).map(callback);
  },

  isInternalLink: (link: string): boolean => !!link.match(/^\.?\/[^\/]/)

}

export default utils;
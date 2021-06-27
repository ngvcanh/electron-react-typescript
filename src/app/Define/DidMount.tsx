import React from 'react';

export type Destructor = () => void;

export type ReactNode = React.ReactNode | React.ReactNode[];

export type ReactChildren = React.ReactChild | React.ReactFragment | React.ReactPortal;

export type DestructorDependencies = Destructor | React.DependencyList;

export type Dependencies = [ DestructorDependencies?, DestructorDependencies? ];

export interface ReactChildrenCallback{
  (value: ReactChildren, index: number, array: ReactChildren[]): unknown
}
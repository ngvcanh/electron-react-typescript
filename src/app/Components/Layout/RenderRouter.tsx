import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { IRouter } from '../../Define/Router';
import { Router } from '../../Constants/Router';


const getRouter = (routers: IRouter[]): IRouter[] => {
  let rs: IRouter[] = [];

  routers.map(router => {
    router.component && rs.push(router);
    router.items?.length && (rs = rs.concat(getRouter(router.items)));
  });

  return rs;
}

const RenderRouter: React.FunctionComponent = () => {

  return <Switch>
    {getRouter(Router).map((router, key) => {
      const { uri, exact, component } = router;
      if (component === null) return null;
      return <Route key={ key } path={ uri } exact={ exact } component={ component } />
    })}
  </Switch>

}

export default RenderRouter;
import React from 'react';
import {useLocation, useNavigate, useNavigationType} from 'react-router-dom';
import RouteCore from '../route/RouteCore';
import {RouteConf} from '../route/RouteConf';

export const RouteContext = React.createContext({})

export function RouteProvider(props) {

    const location = useLocation()
    const navigate = useNavigate()
    const type = useNavigationType()

    const conf = RouteConf
    const [route] = React.useState(new RouteCore(conf, location, navigate, type));

    route.update(location, navigate, type)

    return (
        <RouteContext.Provider
            value={{
                route,
                routes: conf.routes
            }}>
            {props.children}
        </RouteContext.Provider>
    )
}

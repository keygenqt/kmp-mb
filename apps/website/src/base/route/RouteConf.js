import {Route} from 'react-router-dom';
import {BaseLayout} from "../../layouts/BaseLayout";
import {
    HomePage,
    ErrorPage,
    ComingSoonPage,
} from "../../pages";

export const RouteConf = {
    delay: 200,
    routes: {
        home: {
            path: '/',
            render: function (key, path) {
                return <Route
                    key={key}
                    exact
                    path={path}
                    element={
                        <BaseLayout isCenter={false} className={'HomePage'}>
                            <HomePage/>
                        </BaseLayout>
                    }
                />
            }
        },
        community: {
            path: '/community',
            render: function (key, path) {
                return <Route
                    key={key}
                    exact
                    path={path}
                    element={
                        <BaseLayout isCenter={true} className={'ComingSoonPage CommunityPage'}>
                            <ComingSoonPage/>
                        </BaseLayout>
                    }
                />
            }
        },
        experts: {
            path: '/experts',
            render: function (key, path) {
                return <Route
                    key={key}
                    exact
                    path={path}
                    element={
                        <BaseLayout isCenter={true} className={'ComingSoonPage ExpertsPage'}>
                            <ComingSoonPage/>
                        </BaseLayout>
                    }
                />
            }
        },
        404: {
            path: '*',
            render: function (key, path) {
                return <Route
                    key={key}
                    exact
                    path={path}
                    element={
                        <BaseLayout isCenter={true} className={'ErrorPage'}>
                            <ErrorPage/>
                        </BaseLayout>
                    }
                />
            }
        },
    },
}

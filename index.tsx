'use client'

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

type UseRenderReturn = {
    render: (content: React.ReactNode) => React.ReactNode
};

const useRenderContext = createContext<{
    defaultCheck: () => boolean,
    defaultRouteTrue: string,
    defaultRouteFalse: string,
    defaultRoutesFalse: Array<string>,
    loading: React.ReactNode
} | null>(null);

export const UseRenderProvider = useRenderContext.Provider;

type UseRenderProps = {
    check?: () => boolean,
    trueRoute?: string,
    falseRoute?: string,
    falseRoutes?: Array<string>,
    falseRoutesExclude?: Array<string>,
    loading?: React.ReactNode
};

export default function useRender (props?:UseRenderProps): UseRenderReturn {
    const router = useRouter();

    const useRender = useContext(useRenderContext);

    const currentRoute = usePathname();

    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        function routePush (route: string, routeType: boolean, falseRoutes: Array<string>) {
            const currentRouteIsFalseRoute = falseRoutes.includes(currentRoute);

            if (routeType) {
                if (currentRouteIsFalseRoute) {
                    router.push(route);
                    setIsLoading(false);
                } else {
                    setIsLoading(false);
                };
            } else {
                if (currentRouteIsFalseRoute) {
                    if (props?.falseRoutesExclude) {
                        if (props.falseRoutesExclude.includes(currentRoute)) {
                            router.push(route);
                            setIsLoading(false);
                        } else {
                            setIsLoading(false);
                        };
                    } else {
                        setIsLoading(false);
                    };
                } else {
                    router.push(route);
                    setIsLoading(false);
                };
            };
        };

        if (props?.check) {
            if (props.check()) {
                if (props.trueRoute) {
                    if (typeof props.falseRoutes !== 'undefined') {
                        routePush(props.trueRoute, true, props.falseRoutes);
                    } else if (typeof useRender?.defaultRoutesFalse !== 'undefined') {
                        routePush(props.trueRoute, true, useRender?.defaultRoutesFalse);
                    } else {
                        throw new Error('False routes default not defined');
                    };
                } else if (useRender?.defaultRouteTrue) {
                    if (typeof props.falseRoutes !== 'undefined') {
                        routePush(useRender?.defaultRouteTrue, true, props.falseRoutes);
                    } else if (typeof useRender?.defaultRoutesFalse !== 'undefined') {
                        routePush(useRender?.defaultRouteTrue, true, useRender?.defaultRoutesFalse);
                    } else {
                        throw new Error('False routes default not defined');
                    };
                } else {
                    throw new Error('True route defaul not defined')
                };
            } else {
                if (props.falseRoute) {
                    if (typeof props.falseRoutes !== 'undefined') {
                        routePush(props.falseRoute, false, props.falseRoutes);
                    } else if (typeof useRender?.defaultRoutesFalse !== 'undefined') {
                        routePush(props.falseRoute, false, useRender?.defaultRoutesFalse);
                    } else {
                        throw new Error('Default routes false not defined');
                    };
                } else if (useRender?.defaultRouteFalse) {
                    if (typeof props.falseRoutes !== 'undefined') {
                        routePush(useRender?.defaultRouteFalse, false, props.falseRoutes);
                    } else if (typeof useRender?.defaultRoutesFalse !== 'undefined') {
                        routePush(useRender?.defaultRouteFalse, false, useRender?.defaultRoutesFalse);
                    } else {
                        throw new Error('Default routes false not defined');
                    };
                } else {
                    throw new Error('Default route false not defined');
                };
            };
        } else if (useRender?.defaultCheck) {
            if (useRender.defaultCheck()) {
                if (useRender?.defaultRouteTrue) {
                    if (typeof useRender?.defaultRoutesFalse !== 'undefined') {
                        routePush(useRender?.defaultRouteTrue, true, useRender?.defaultRoutesFalse);
                    } else {
                        throw new Error('False routes default not defined');
                    };
                } else {
                    throw new Error('True route defaul not defined')
                };
            } else {
                if (useRender?.defaultRouteFalse) {
                    if (typeof useRender?.defaultRoutesFalse !== 'undefined') {
                        routePush(useRender?.defaultRouteFalse, false, useRender?.defaultRoutesFalse);
                    } else {
                        throw new Error('Default routes false not defined');
                    };
                } else {
                    throw new Error('Default route false not defined');
                };
            };
        } else {
            throw new Error('Default check not defined');
        };
    }, [props, currentRoute, router, useRender])

    function render (content: React.ReactNode): React.ReactNode {
        if (props?.loading) {
            return isLoading ? props?.loading : content;
        } else if (useRender?.loading) {
            return isLoading ? useRender.loading : content;
        } else {
            throw new Error("Default loading screen not defined");
        };
    };

    return { render };
};
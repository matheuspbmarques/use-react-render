# **use-react-render**
The use-react-render hook use a check function to render or not the page content.

_This was created to **[Next](https://nextjs.org/) Project**._

## Instalation
```
npm i use-react-render
```

## Setup
First, you need setup your layout root, doing a import of UseRenderProvider and cover body tag with it. After this, you need set a **defaultCheck**, **defaultRouteTrue**, **defaultRouteFalse**, **defaultRoutesFalse** and **loading** to value prop.

| Value Keys         | Description                                                        |
|--------------------|--------------------------------------------------------------------|
| defaultCheck       | Function that return a boolean                                     |
| defaultRouteTrue   | Route that will be renderized if defaultCheck return true          |
| defaultRouteFalse  | Route that will be renderized if defaultCheck return false         |
| defaultRoutesFalse | Routes list that dont can renderized if defaultCheck return false  |

**Example:**
```
'use client' // UseRenderProvider runner just in client side

import "./globals.css";
import { UseRenderProvider } from 'use-react-render'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>useReactRender</title>
      </head>
      <UseRenderProvider
        value={{
          defaultCheck: () => true,
          defaultRouteTrue: '/route/true',
          defaultRouteFalse: '/route/false',
          defaultRoutesFalse: ['/route/false', '/'],
          loading: <div className="m-auto">Loading...</div>
        }}
      >
        <body>
          {children}
        </body>
      </UseRenderProvider>
    </html>
  );
}
```

## Usage
Now you can import the **useRender** from **use-react-render** in your page component:
```
'use client' // hooks just running in client side

import useRender from "@/hook/use-react-render"

export default function TrueRoutePage () {
    const { render } = useRender();

    return render(
        <div className="m-auto">True</div>
    );
};
```
You can set a configuration to useRender:
```
'use client'

import useRender from "@/hook/use-react-render"

export default function TrueRoutePage () {
    const { render } = useRender({
        check: () => true,
        trueRoute: '/route-if-true',
        falseRoute: '/route-if-false',
        falseRoutes: ['/route-if-false', '/route-if-false-1', 'route-if-false-2'],
        falseRoutesExclude: ['/route-if-false-3'],
        loading: <div>Custom Loading...</div>
    });

    return render(
        <div className="m-auto">True</div>
    );
};
```
| Config Key            | Description                                                                               |
|-----------------------|-------------------------------------------------------------------------------------------|
| check                 | Function that return boolean result                                                       |
| trueRoute             | Route if check or defaultCheck return true                                                |
| falseRoute            | Route if check or defaultCheck return false                                               |
| falseRoutes           | Route list that if check or defaultCheck return true, can't render                        |
| falseRoutesExclude    | Route list that will be exclude from falseRoutes in useRender and from defaultRoutesFalse |
| loading               | Loading component that will be used in the page                                           |
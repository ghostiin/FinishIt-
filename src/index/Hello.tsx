import * as React from "react";
import './style.scss';

export interface HelloProps { compiler: string; framework: string; }

export const Hello = (props: HelloProps) => (
    <>
        <h1>Hello ffffrom { props.compiler } and { props.framework }!!!!!!</h1>
    </>
);
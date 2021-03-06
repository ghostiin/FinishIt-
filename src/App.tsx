import React from 'react';
import './global.scss';
import List from './containers/List';
import Module from './containers/Module';
import Search from './containers/Search';
import Nav from './components/Nav';
import Footer from './components/footer';

export default () => (
    <>
        <Nav></Nav>
        <Search />
        <Module />
        <List />
        <Footer />
    </>
)

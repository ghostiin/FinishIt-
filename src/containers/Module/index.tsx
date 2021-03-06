import React from 'react';
import Card from '../../UI/card';
import styles from './module.module.scss'

const Module = () => {

    return <div className={ styles.module }>
        <Card>card1</Card>
        <Card>card2</Card>
        <Card>card3</Card>
        <Card>card4</Card>
    </div>
}

export default Module;
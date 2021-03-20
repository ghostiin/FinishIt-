import React from 'react';
import { useHistory } from 'react-router';
import Card from '../../UI/card';
import styles from './module.module.scss'

const Module = () => {
    const history = useHistory();
    return <div className={ styles.module }>
        <Card>
            <div onClick={ () => history.push('/?filter=all') } className={ styles.card }>
                <div className={ styles.left }>
                    <div>📁</div>
                    <span>所有待办历史</span>
                </div>
                <div>1</div>
            </div>
        </Card>
        <Card><div onClick={ () => history.push('/?filter=scheduled') } className={ styles.card }>
            <div className={ styles.left }>
                <div>📆</div>
                <span>计划时间</span>
            </div>
            <div>1</div>
        </div></Card>
        <Card><div onClick={ () => history.push('/?filter=flag') } className={ styles.card }>
            <div className={ styles.left }>
                <div>📍</div>
                <span>想做但未完成</span>
            </div>
            <div>1</div>
        </div></Card>
        <Card><div onClick={ () => history.push('/review') } className={ styles.card }>
            <div className={ styles.left }>
                <div>📈</div>
                <span>回顾与分析</span>
            </div>
            <div>1</div>
        </div></Card>
    </div>
}

export default Module;
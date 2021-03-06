import React from 'react';
import Button from '../../UI/button';
import styles from './nav.module.scss';

export type NavProps = {}

const Nav: React.FC<NavProps> = (props) => {
    return (
        <div className={ styles.nav }>
            <Button>设置</Button>
        </div>
    )
}

export default Nav;
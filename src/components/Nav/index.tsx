import React from 'react';
import { useHistory } from 'react-router';
import Button from '../../UI/button';
import styles from './nav.module.scss';

export type NavProps = {
    isFiltered?: boolean;
}

const Nav: React.FC<NavProps> = (props) => {
    const { isFiltered = false } = props;
    const history = useHistory();
    return (
        <div className={ styles.nav }>
            <Button>设置</Button>
            {isFiltered && <Button onClick={ () => history.push('/') }>Back</Button> }
        </div>
    )
}

export default Nav;
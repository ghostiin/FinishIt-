import React, { useState } from 'react';
import { useHistory } from 'react-router';
import Button from '../../UI/button';
import Modal from '../../UI/modal';
import styles from './nav.module.scss';

export type NavProps = {
    isFiltered?: boolean;
}

const Nav: React.FC<NavProps> = (props) => {
    const { isFiltered = false } = props;
    const [show, setShow] = useState(false);
    const history = useHistory();
    return (
        <>
            <div className={ styles.nav }>
                <Button onClick={ () => { setShow(true) } }>登录</Button>
                { isFiltered && <Button onClick={ () => history.push('/') }>Back</Button> }
            </div>
            {show && <Modal onClose={ () => { setShow(false) } }>
                <div className={ 'loginPopUp' }>登录或注册(开发中)</div>
            </Modal> }
        </>
    )
}

export default Nav;
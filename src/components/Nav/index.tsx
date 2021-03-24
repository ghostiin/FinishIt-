import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { loginOrCreateUser, logoutUser } from '../../apis/request';
import { IUser } from '../../constants';
import { LOGIN_USER, LOGOUT_USER, UserContext } from '../../Context/user';
import Button from '../../UI/button';
import Modal from '../../UI/modal';
import styles from './nav.module.scss';

export type NavProps = {
    isFiltered?: boolean;
}



const Nav: React.FC<NavProps> = (props) => {
    const { isFiltered = false } = props;
    const [show, setShow] = useState(false);
    const { user, dispatch } = useContext(UserContext);
    // const [signUp, setSignUp] = useState(false);
    const [data, setData] = useState<IUser>({
        // name: '',
        email: '',
        password: ''
    });
    const history = useHistory();
    const loginForm = (
        <div className={ 'loginPopUp' }>
            <div className={ 'form' }>
                <input type='text' value={ data.email }
                    autoFocus
                    placeholder={ '请输入邮箱' }
                    required
                    onChange={ (e) => {
                        setData({ ...data, email: e.target.value })
                    } }></input>
                <input value={ data.password } type='password'
                    placeholder={ '请输入密码' }
                    required
                    onChange={ (e) => {
                        setData({ ...data, password: e.target.value })
                    } }></input>
                {/* {
                signUp && <input type='text' value={ data.name }
                    placeholder={ '用户名' }
                    onChange={ (e) => {
                        setData({ ...data, name: e.target.value })
                    } }></input>
            } */}
            </div>
            <div className={ 'form-title' }>
                <Button onClick={ async () => {
                    try {
                        const resp: any = await loginOrCreateUser(data);
                        if (resp) {
                            const { user, token } = resp;
                            localStorage.setItem('token', token);
                            dispatch({ type: LOGIN_USER, payload: user })
                            setShow(false);
                        }

                    } catch (err) {
                        localStorage.removeItem('token');
                    }
                } }>登录</Button>
                <span>未注册自动注册</span>
            </div>
        </div>
    )

    const logoutForm = function () {
        return (
            <div className={ 'loginPopUp' }>
                <div className={ 'form' }>
                    <div>用户名: { user.name }</div>
                    <div>邮箱: { user.email }</div>
                </div>
                <div className={ 'form-title' }>
                    <Button onClick={ async () => {
                        await logoutUser();
                        localStorage.removeItem('token');
                        dispatch({ type: LOGOUT_USER })
                        setShow(false);
                    } }>登出当前用户</Button>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className={ styles.nav }>
                <Button onClick={ () => { setShow(true) } }>{
                    localStorage.getItem('token') && user ? user.name : '登录'
                }</Button>
                { isFiltered && <Button onClick={ () => history.push('/') }>Back</Button> }
            </div>
            {show && <Modal onClose={ () => { setShow(false) } }>
                {
                    localStorage.getItem('token') && user !== null ?
                        logoutForm()
                        : loginForm
                }
            </Modal> }
        </>
    )
}

export default Nav;
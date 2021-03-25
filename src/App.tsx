import React from 'react';
import device from 'current-device';
import { TodosProvider } from './Context/todos';
import { UserProvider } from './Context/user';
import {
    BrowserRouter as Router,
    Route, Switch
} from 'react-router-dom';
import './global.scss';
import Home from './Home';
import qrCode from './qr-code.svg';

//因为ios webapp跳转连接时弹出safari组件影响使用感
//所以这里强行使用单页，把review也挂在/下
export default () => {
    const goDesktop = () => (
        <>
            <div className={ 'pc' }>
                <div className={ 'qrcode' }>
                    <img src={ qrCode } width={ 300 } height={ 300 } />
                </div>
                <div className={ 'pc-text' }>
                    请使用移动端访问~或f12开启chrome dev tool模拟
            </div>
            </div>
        </>
    )
    const goMobile = () => (
        <>
            <Router>
                <UserProvider>
                    <TodosProvider>
                        <Switch>
                            <Route exact path='/' component={ Home } />
                            {/* <Route exact path='/?review' component={ Review } /> */ }
                            {/* <Route exact path='/:action' component={ Home } /> */ }
                        </Switch>
                    </TodosProvider>
                </UserProvider>
            </Router>
        </>
    )

    return device.type === 'mobile' ? goMobile() : goDesktop();
}

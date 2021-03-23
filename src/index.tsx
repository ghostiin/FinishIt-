import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'url-search-params-polyfill';


ReactDOM.render(<App />, document.getElementById('root'));

if (module.hot) {
    module.hot.accept();
    console.log('hot reloading!')
}

//PWA 
console.log('hello,world');
if (process.env.NODE_ENV !== 'development' && 'serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js').then((register) => {
        console.log('注册成功');
    }).catch(error => {
        console.log('注册失败');
    })
}
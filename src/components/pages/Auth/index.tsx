import React, {useState} from 'react';
import styles from "./Auth.module.scss";
import classNames from 'classnames';
import Input from "../../UI/Input";
import Button from "../../UI/Button";

const Auth: React.FC = () => {

    const [isLogin, setIsLogin] = useState(true);

    const switchAuthTypeHandler = () => {
        setIsLogin(!isLogin);
    }

    return (
        <div className={classNames(styles['auth-container'], 'box')}>
            <h3 className={styles['auth-container__header']}>
                {isLogin ? 'Авторизация' : 'Регистрация'}
            </h3>
            <div className={'m-b-16'}>
                <Input label={'Email'} type={'email'} placeholder={'mail@example.kz'}/>
            </div>
            <div className={'m-b-16'}>
                <Input label={'Пароль'} type={'password'}/>
            </div>
            {
                !isLogin && <div className={'m-b-16'}>
                    <Input label={'Повторите пароль'} type={'password-confirm'}/>
                </div>
            }
            <span className={styles['auth-container__switch-type']} onClick={switchAuthTypeHandler}>
                { isLogin ? 'Зарегистрироваться' : 'Авторизоваться'}
            </span>

            <Button className={'m-t-16'} color={'primary'}>{!isLogin ? 'Зарегистрироваться' : 'Войти'}</Button>
        </div>
    );
};

export default Auth;
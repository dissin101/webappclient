import React, {useEffect, useState} from 'react';
import styles from "./Auth.module.scss";
import classNames from 'classnames';
import Input from "../../UI/Input";
import Button from "../../UI/Button";
import * as yup from 'yup';
import {Form, Formik, Field} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {loginUser, registrationUser} from "../../../store/actions/auth";
import {RootState} from "../../../index";
import {useNavigate} from "react-router-dom";
import Loader from "../../UI/Loader";

/**
 * Страница авторизации / регистрации
 * @constructor
 */
const Auth: React.FC = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isLogin, setIsLogin] = useState(true);

    const {isAuth, loading, error} = useSelector((state: RootState) => ({
        isAuth: state.auth.isAuth,
        loading: state.auth.loading,
        error: state.auth.error
    }));

    useEffect(() => {
        if (isAuth){
            navigate("/profile");
        }
    }, [isAuth])


    const switchAuthTypeHandler = () => {
        setIsLogin(!isLogin);
    }

    const validationSchema = React.useMemo(() =>
        yup.object().shape({
            email: yup.string()
                .email("Поле заполнено некорректно")
                .required("Поле обязательно для заполнения"),
            password: yup.string()
                .min(6, "Пароль должен содержать не менее 6 символов")
                .required("Поле обязательно для заполнения"),
            confirmPassword: isLogin ? yup.string() : yup.string()
                .oneOf([yup.ref('password'), null], 'Пароли не совпадают')
                .required("Поле обязательно для заполнения"),
        }), [isLogin]);

    const initialValues = {
        email: "",
        password: "",
        confirmPassword: ""
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(
                values
            ) => {
                if (isLogin){
                    const data = {
                        email: values.email,
                        password: values.password
                    }

                    dispatch(loginUser(data));
                } else {
                    const data = {...values};

                    dispatch(registrationUser(data));
                }
            }}
        >
            {({errors, touched, isValid}) => (
                <Form>
                    <div className={classNames(styles['auth-container'], 'box')}>
                        {loading ? <Loader className={'m-auto'}/> :
                            <h3 className={styles['auth-container__header']}>
                                {isLogin ? 'Авторизация' : 'Регистрация'}
                            </h3>
                        }
                        <div className={'m-b-16'}>
                            <Field
                                label={'Email'}
                                name={'email'}
                                placeholder={'example@email.kz'}
                                as={Input}
                            />
                            {(errors.email && touched.email) &&
                            <div className={'error-message'}>{errors.email}</div>}
                        </div>
                        <div className={'m-b-16'}>
                            <Field
                                label={'Пароль'}
                                name={'password'}
                                type={'password'}
                                as={Input}
                            />
                            {(errors.password && touched.password) &&
                            <div className={'error-message'}>{errors.password}</div>}
                        </div>
                        {
                            !isLogin && <div className={'m-b-16'}>
                                <Field
                                    label={'Повторите пароль'}
                                    name={'confirmPassword'}
                                    type={'password'}
                                    as={Input}
                                />
                                {(errors.confirmPassword && touched.confirmPassword) &&
                                <div className={'error-message'}>{errors.confirmPassword}</div>}
                            </div>
                        }
                        <span className={styles['auth-container__switch-type']} onClick={switchAuthTypeHandler}>
                            {isLogin ? 'Зарегистрироваться' : 'Авторизоваться'}
                        </span>
                        {error &&
                            <div className={styles['auth-container__error']}>
                                {error.message}
                            </div>
                        }
                        <Button className={'m-t-16'}
                                type={'submit'}
                                color={'primary'}
                                disabled={!isValid}
                        >
                            {!isLogin ? 'Зарегистрироваться' : 'Войти'}
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default Auth;
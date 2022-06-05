import React, {useEffect} from 'react';
import {IProfileModelAddModal} from "./interface";
import {Field, Form, Formik} from "formik";
import Input from "../../../../UI/Input";
import Button from "../../../../UI/Button";
import Loader from "../../../../UI/Loader";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../../index";
import {addModel} from "../../../../../store/actions/models";

const ProfileModelAddModal: React.FC<IProfileModelAddModal> = ({brandId, closeHandler}) => {

    const dispatch = useDispatch();

    const {isModelAdd, loading, error} = useSelector((state: RootState) => ({
        isModelAdd: state.models.isModelAdd,
        loading: state.models.loading,
        error: state.models.error
    }));

    const initialValues = {
        name: "",
        brandId
    };

    useEffect(() => {
        if (isModelAdd) {
            closeHandler();
        }
    }, [isModelAdd])

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(
                values
            ) => {
                const form = {
                    name: values.name,
                    brandId
                };

                dispatch(addModel(form));
            }}
        >
            {({errors, touched, isValid}) => (
                <Form>
                    <div className={'row m-l-0 m-r-0'}>
                        <div className={'col-12'}>
                            <Field
                                label={'Название модели'}
                                name={'name'}
                                type={'string'}
                                as={Input}
                            />
                            {(errors.name && touched.name) &&
                            <div className={'error-message'}>{errors.name}</div>}
                        </div>
                        {error &&
                        <div className={'col-12 d-flex justify-content-center danger m-t-8'}>
                            <span>{error}</span>
                        </div>
                        }
                        {
                            !loading ?
                                <Button className={'m-t-16 m-l-auto m-r-auto'}
                                        type={'submit'}
                                        color={'primary'}
                                        disabled={!isValid}
                                >
                                    Добавить
                                </Button> :
                                <Loader className={'m-auto'}/>
                        }
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default ProfileModelAddModal;
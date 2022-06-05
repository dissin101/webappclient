import React, {useEffect} from 'react';
import {Field, Form, Formik} from "formik";
import Input from "../../../../UI/Input";
import Button from "../../../../UI/Button";
import {useDispatch, useSelector} from "react-redux";
import {addBrand} from "../../../../../store/actions/brands";
import {RootState} from "../../../../../index";
import {stat} from "fs";
import styles from "../../../Auth/Auth.module.scss";
import Loader from "../../../../UI/Loader";
import {IProfileBrandAddModal} from "./interface";

const ProfileBrandAddModal: React.FC<IProfileBrandAddModal>  = ({closeHandler}) => {

    const dispatch = useDispatch();
    const {isBrandAdd, loading, error} = useSelector((state: RootState) => ({
        loading: state.brands.loading,
        isBrandAdd: state.brands.isBrandAdd,
        error: state.brands.error
    }));

    const initialValues = {
        name: "",
        img: []
    };

    useEffect(() => {
        closeHandler();
    }, [isBrandAdd])

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(
                values
            ) => {
                dispatch(addBrand(values));
            }}
        >
            {({errors, touched, isValid, setFieldValue}) => (
                <Form>
                    <div className={'row m-l-0 m-r-0'}>
                        <div className={'col-12'}>
                            <Field
                                label={'Название бренда'}
                                name={'name'}
                                type={'string'}
                                as={Input}
                            />
                            {(errors.name && touched.name) &&
                            <div className={'error-message'}>{errors.name}</div>}
                        </div>

                        <div className={'col-12 m-t-16'}>
                            <input
                                id="file"
                                name="img"
                                type="file"
                                onChange={(event) => {
                                    const files: FileList | null = event.target.files;
                                    if (files) {
                                        let myFiles = Array.from(files);
                                        setFieldValue("img", myFiles);
                                    }
                                }}
                            />
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
                                    Добавить {loading && <Loader/>}
                                </Button> :
                                    <Loader className={'m-auto'}/>
                        }
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default ProfileBrandAddModal;
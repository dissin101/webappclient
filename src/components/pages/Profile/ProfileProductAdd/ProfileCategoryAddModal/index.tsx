import React, {useEffect} from 'react';
import {IProfileCategoryAddModal} from "./interface";
import {useDispatch, useSelector} from "react-redux";
import {Field, Form, Formik} from "formik";
import Input from "../../../../UI/Input";
import Button from "../../../../UI/Button";
import Loader from "../../../../UI/Loader";
import {RootState} from "../../../../../index";
import Select from "react-select";
import {addCategory} from "../../../../../store/actions/categories";

const ProfileCategoryAddModal: React.FC<IProfileCategoryAddModal> = ({options, closeHandler}) => {

    const dispatch = useDispatch();

    const {isCategoryAdd, loading, error} = useSelector((state: RootState) => ({
        loading: state.categories.error,
        error: state.categories.error,
        isCategoryAdd: state.categories.isCategoryAdd
    }))

    const initialValues = {
        name: "",
        parentId: null
    };

    const categoriesListOptions = [{value: null, label: "Без родительской категории"}, ...options];

    useEffect(() => {
        if (isCategoryAdd) {
            closeHandler();
        }
    }, [isCategoryAdd])

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(
                {name, parentId}
            ) => {
                const form = {
                    name,
                    parentId
                };

                dispatch(addCategory(form));
            }}
        >
            {({errors, touched, isValid, setFieldValue}) => (
                <Form>
                    <div className={'row m-l-0 m-r-0'}>
                        <div className={'col-12 m-t-8 m-b-16'}>
                            <Select
                                options={categoriesListOptions}
                                onChange={(e: any) => {
                                    setFieldValue("parentId", e.value)
                                }}
                                isMulti={false}
                                placeholder={'Родительская категория'}
                            />
                        </div>
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

export default ProfileCategoryAddModal;
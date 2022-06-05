import React, {useEffect, useState} from 'react';
import Modal from "../../../UI/Modal";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../index";
import {IBrand} from "../../../../models/brand";
import Select from "react-select";
import Icon from "../../../UI/Icon";
import Button from "../../../UI/Button";
import ProfileBrandAddModal from "./ProfileBrandAddModal";
import Loader from "../../../UI/Loader";
import {addBrand, getBrands} from "../../../../store/actions/brands";
import {Form, Formik} from 'formik';
import {getModels} from "../../../../store/actions/models";
import {IModel} from "../../../../models/model";
import ProfileModelAddModal from "./ProfileModelAddModal";

const ProfileProductAdd = () => {

    const initialValues = {
        brandId: ''
    };

    const dispatch = useDispatch();

    const {brands, brandsLoading, isBrandAdd, models, modelsLoading, isModelAdd} = useSelector((state: RootState) => ({
        brands: state.brands.data,
        brandsLoading: state.brands.loading,
        isBrandAdd: state.brands.isBrandAdd,
        models: state.models.data,
        modelsLoading: state.models.loading,
        isModelAdd: state.models.isModelAdd
    }));

    const [isShowAddBrandModal, setIsShowAddBrandModal] = useState(false);
    const [isShowAddModelModal, setIsShowAddModelModal] = useState(false);
    const [selectedBrandId, setSelectedBrandId] = useState('');
    const [modelListOptions, setModelListOptions] = useState([]);

    const brandListOptions = brands.map(({id, name}: IBrand) => {
        return {
            value: id,
            label: name
        }
    });

    useEffect(() => {
        if (isBrandAdd) {
            dispatch(getBrands());
        }
    }, [isBrandAdd]);

    useEffect(() => {
        if (!!selectedBrandId) {
            dispatch(getModels(Number(selectedBrandId)));
        }

    }, [selectedBrandId, isModelAdd]);

    useEffect(() => {
        setModelListOptions(models.map(({id, name}: IModel) => {
            return {
                value: id,
                label: name
            }
        }))
    }, [selectedBrandId, models]);

    const changeBrandsModalHandler = () => {
        setIsShowAddBrandModal(!isShowAddBrandModal)
    };

    const changeModelsModalHandler = () => {
        setIsShowAddModelModal(!isShowAddModelModal)
    };

    return (
        <>
            <Formik
                initialValues={initialValues}
                onSubmit={(
                    values
                ) => {

                }}
            >
                {({errors, touched, isValid, setFieldValue}) => (
                    <Form>
                        <h2 className={'m-t-0 m-b-8'}>Добавление товара</h2>
                        <div className={'row'}>
                            <div className={'col-12 col-md-6 d-flex align-items-center'}>
                                {
                                    !brandsLoading ?
                                        <>
                                            <Select
                                                className={'col-11 p-l-0'}
                                                options={brandListOptions}
                                                onChange={(e: any) => {
                                                    setFieldValue("brandId", e.value)
                                                    setSelectedBrandId(e.value);
                                                }}
                                                isMulti={false}
                                                placeholder={'Бренд'}
                                            />
                                            <Button
                                                size={'sm'}
                                                color={'info'}
                                                onClick={changeBrandsModalHandler}
                                            >
                                                <Icon name={'add'}/>
                                            </Button>
                                        </>
                                        :
                                        <Loader className={'m-l-auto m-r-auto'}/>
                                }
                            </div>
                            <div className={'col-12 col-md-6 d-flex align-items-center'}>
                                {
                                    !modelsLoading ?
                                        <>
                                            <Select
                                                className={'col-11 p-l-0'}
                                                isDisabled={!selectedBrandId}
                                                options={modelListOptions}
                                                onChange={(e: any) => {
                                                    setFieldValue("modelId", e.value)
                                                    //setSelectedBrandId(e.value);
                                                }}
                                                isMulti={false}
                                                placeholder={'Модель'}
                                            />
                                            <Button
                                                disabled={!selectedBrandId}
                                                size={'sm'}
                                                color={'info'}
                                                onClick={changeModelsModalHandler}
                                            >
                                                <Icon name={'add'}/>
                                            </Button>
                                        </>
                                        :
                                        <Loader className={'m-l-auto m-r-auto'}/>
                                }
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
            <Modal
                header={'Добавление бренда'}
                isVisible={isShowAddBrandModal}
                onClose={changeBrandsModalHandler}
            >
                <ProfileBrandAddModal closeHandler={changeBrandsModalHandler}/>
            </Modal>
            <Modal
                header={'Добавление модели'}
                isVisible={isShowAddModelModal}
                onClose={changeModelsModalHandler}
            >
                <ProfileModelAddModal closeHandler={changeModelsModalHandler}
                                      brandId={selectedBrandId}
                />
            </Modal>
        </>
    );
};

export default ProfileProductAdd;
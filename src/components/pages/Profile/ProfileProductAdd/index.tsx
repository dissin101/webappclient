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
import {getBrands} from "../../../../store/actions/brands";
import {Form, Formik} from 'formik';
import {getModels} from "../../../../store/actions/models";
import {IModel} from "../../../../models/model";
import ProfileModelAddModal from "./ProfileModelAddModal";
import {getCategories} from "../../../../store/actions/categories";
import {ICategory} from "../../../../models/category";
import ProfileCategoryAddModal from "./ProfileCategoryAddModal";

const ProfileProductAdd = () => {

    const initialValues = {
        brandId: ''
    };

    const dispatch = useDispatch();

    const {
        brands,
        brandsLoading,
        isBrandAdd,
        models,
        modelsLoading,
        isModelAdd,
        categories,
        categoriesLoading,
    } = useSelector((state: RootState) => ({
        brands: state.brands.data,
        brandsLoading: state.brands.loading,
        isBrandAdd: state.brands.isBrandAdd,
        models: state.models.data,
        modelsLoading: state.models.loading,
        isModelAdd: state.models.isModelAdd,
        categories: state.categories.data,
        categoriesLoading: state.categories.loading
    }));

    const [isShowAddBrandModal, setIsShowAddBrandModal] = useState(false);
    const [isShowAddModelModal, setIsShowAddModelModal] = useState(false);
    const [isShowAddCategoryModal, setIsShowAddCategoryModal] = useState(false);
    const [selectedBrandId, setSelectedBrandId] = useState('');
    const [modelListOptions, setModelListOptions] = useState([]);
    const [selectedModelId, setSelectedModelId] = useState('');

    const brandListOptions = brands.map(({id, name}: IBrand) => {
        return {
            value: id,
            label: name
        }
    });

    /** Сортировка категорий по parentId */
    const categoriesList = categories.reduce((categories: ICategory[], currentValue: ICategory) => {
        let category: ICategory | undefined = categories.find(x => x.id === currentValue.parentId);
        let index = category ? categories.indexOf(category) : -1;
        index = index !== -1 ? index + 1 : categories.length;
        categories.splice(index, 0, currentValue);
        return categories;
    }, []);

    const categoriesListOptions = categoriesList.map(({id, parentId, name}: ICategory) => {
        let a = "";

        const getForParent = (id: string) => {
            const category = categories.find((el: ICategory) => el.id === id);

            if (category.parentId !== null) {
                a += '\xa0';
                getForParent(category.parentId);
            }
        }

        if (parentId === null) {
            return {
                value: id,
                label: name
            }
        } else {
            a = '\xa0';
            getForParent(parentId);
            return {
                value: id,
                label: a + name
            }
        }
    });

    /** Получение списка категорий */
    useEffect(() => {
        dispatch(getCategories());
    }, []);

    /** Обновление списка брендов */
    useEffect(() => {
        if (isBrandAdd) {
            dispatch(getBrands());
        }
    }, [isBrandAdd]);

    /** Обновление списка моделей */
    useEffect(() => {
        if (!!selectedBrandId) {
            dispatch(getModels(Number(selectedBrandId)));
        }

    }, [selectedBrandId, isModelAdd]);

    /** Построение опций моделей */
    useEffect(() => {
        setModelListOptions(models.map(({id, name}: IModel) => {
            return {
                value: id,
                label: name
            }
        }))
    }, [selectedBrandId, models]);

    const changeBrandsModalHandler = () => {
        setIsShowAddBrandModal(!isShowAddBrandModal);
    };

    const changeModelsModalHandler = () => {
        setIsShowAddModelModal(!isShowAddModelModal);
    };

    const changeCategoryModalHandler = () => {
        setIsShowAddCategoryModal(!isShowAddCategoryModal);
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
                                                    setSelectedModelId(e.value);
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
                            <div className={'col-12 col-md-6 d-flex align-items-center'}>
                                {
                                    !categoriesLoading ?
                                        <>
                                            <Select
                                                className={'col-11 p-l-0'}
                                                isDisabled={!selectedModelId}
                                                options={categoriesListOptions}
                                                onChange={(e: any) => {
                                                    setFieldValue("categoryId", e.value)
                                                    //setSelectedModelId(e.value);
                                                }}
                                                isMulti={false}
                                                placeholder={'Категория'}
                                            />
                                            <Button
                                                disabled={!selectedModelId}
                                                size={'sm'}
                                                color={'info'}
                                                onClick={changeCategoryModalHandler}
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
            <Modal
                header={'Добавление категории'}
                isVisible={isShowAddCategoryModal}
                onClose={changeCategoryModalHandler}
            >
                <ProfileCategoryAddModal closeHandler={changeCategoryModalHandler}
                                         options={categoriesListOptions}
                />
            </Modal>
        </>
    );
};

export default ProfileProductAdd;
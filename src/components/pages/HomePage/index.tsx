import React, {ReactElement, useEffect, useState} from "react";
import Breadcrumbs from "../../UI/Breadcrumbs";
import Category from "../../UI/Category";
import {useDispatch, useSelector} from "react-redux";
import {getBrands} from "../../../store/actions/brands";
import {RootState} from "../../../index";
import {IBrand} from "../../../models/brand";
import Loader from "../../UI/Loader";
import {useNavigate} from "react-router-dom";
import {getModels} from "../../../store/actions/models";
import {IModel} from "../../../models/model";
import {getCategories} from "../../../store/actions/categories";
import CategoriesTree from "../../CategoriesTree";

const HomePage: React.FC = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [breadcrumbs, setBreadcrumbs] = useState([
        {title: 'Главная', path: '#'},
        {title: 'Каталог', path: "/"}
    ]);

    const [content, setContent] = useState<ReactElement | null>(null);

    enum cardType {
        brand,
        model
    }

    const onClickCardHandler = (id: number, name: string, type: cardType) => {
        setBreadcrumbs([...breadcrumbs, {
            title: name,
            path: name
        }]);

        if (type === cardType.brand){
            navigate(`?brand=${name}`);

            dispatch(getModels(id));
        }

        if (type === cardType.model){
            navigate(`?model=${name}`);

            dispatch(getCategories());
        }
    };

    useEffect(() => {
        dispatch(getBrands());
    }, []);

    const {
        brands,
        brandsLoading,
        brandsError,
        models,
        modelsLoading,
        modelsError,
        categoriesList,
        categoriesLoading,
        categoriesError
    } = useSelector((state: RootState) => ({
        brands: state.brands.data,
        brandsLoading: state.brands.loading,
        brandsError: state.brands.error,
        models: state.models.data,
        modelsLoading: state.brands.loading,
        modelsError: state.brands.error,
        categoriesList: state.categories.data,
        categoriesLoading: state.categories.loading,
        categoriesError: state.categories.error
    }));

    useEffect(() => {
        if (!!brands && brands.length > 0) {
            setContent(
                <div className={'col-12'}>
                    <div className={'row'}>
                        {brands.map(({id, name, img}: IBrand) => {
                            return (
                                <div className={'col-12 col-sm-6 col-lg-3 m-t-16 m-b-16'} key={id}>
                                    <Category title={name} img={img} onClick={() => onClickCardHandler(id, name, cardType.brand)}/>
                                </div>
                            )
                        })}
                    </div>
                </div>
            );
        }

        if (!!models && models.length > 0) {
            setContent(
                <div className={'col-12'}>
                    <div className={'row'}>
                        {models.map(({id, name}: IModel) => {
                            return (
                                <div className={'col-12 col-sm-6 col-lg-3 m-t-16 m-b-16'} key={id}>
                                    <Category title={name} onClick={() => onClickCardHandler(id, name, cardType.model)}/>
                                </div>
                            )
                        })}
                    </div>
                </div>
            );
        }

        if (!!categoriesList && categoriesList.length > 0){
            setContent(
                <CategoriesTree list={categoriesList} onSelectCallback={(e: any) => console.log(e)} />
            )
        }
    }, [brands, models, categoriesList])

    if (brandsLoading || modelsLoading || categoriesLoading) {
        return (
            <div className={'d-flex'}>
                <Loader className={'m-auto'}/>
            </div>
        )
    }

    /*todo Добавить UI компонент для вывода ошибок*/
    if (brandsError || modelsError || categoriesError) {
        return <div>Ошибка</div>
    }

    return (
        <>
            <Breadcrumbs links={breadcrumbs}/>
            <div className={'row m-t-16'}>
                <h3 className={'m-0 col-12'}>Запчасти</h3>
                {!!content ?
                    content :
                    <div className={'col-12 m-t-8'}>Список пуст</div>
                }
            </div>
        </>
    )
}

export default HomePage;
import React, {Fragment, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import {getCategories} from "../../../../store/actions/categories";
import {RootState} from "../../../../index";
import Loader from "../../../UI/Loader";
import {ICategory} from "../../../../models/category";
import styles from "./CategoriesOutput.module.scss"
import Icon from "../../../UI/Icon";
import classNames from "classnames";
import {ICategoryTree, ITreeItem} from "./interface";
import Breadcrumbs from "../../../UI/Breadcrumbs";
import {getBrands} from "../../../../store/actions/brands";
import queryString from "query-string";
import {getModels} from "../../../../store/actions/models";
import {IBrand} from "../../../../models/brand";
import {IModel} from "../../../../models/model";

/**
 * Страница списка категорий
 * @constructor
 */

const CategoriesOutput: React.FC = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [breadcrumbs, setBreadcrumbs] = useState([
        {title: 'Главная', path: '#'},
        {title: 'Каталог', path: "/"}
    ]);

    const path = queryString.parse(location.search);
    const brandId = path.brand ? Number(path.brand) : null;
    const modelId = path.model ? Number(path.model) : null;

    const {categories, loading, error, brands, models} = useSelector((state: RootState) => ({
        categories: state.categories.data,
        loading: state.categories.loading,
        error: state.categories.error,
        brands: state.brands.data,
        models: state.models.data
    }));

    useEffect(() => {
        dispatch(getCategories());

        if (brands.length === 0) {
            dispatch(getBrands());
        }

        if (models.length === 0) {
            if (brandId !== null) {
                dispatch(getModels(brandId));
            }
        }

        if (!modelId || !brandId){
            navigate("/");
        }
    }, [dispatch]);

    useEffect(() => {
        const _breadcrumbs: {title: string, path: string}[] = [];

        const brand = brands.find((brand: IBrand) => brand.id === brandId);
        const model = models.find((model: IModel) => model.id === modelId);

        if (brand){
            if (!_breadcrumbs.find((breadcrumb) => breadcrumb.title === brand.name)){
                _breadcrumbs.push({title: brand.name, path: `/models?brand=${brand.id}`});
            }
        }

        if (model) {
            if (!_breadcrumbs.find((breadcrumb) => breadcrumb.title === model.name)){
                _breadcrumbs.push({title: model.name, path: ""});
            }
        }

        if (_breadcrumbs.length === 2){
            setBreadcrumbs([...breadcrumbs,..._breadcrumbs])
        }
    }, [brands, models]);

    const [categoriesTree, setCategoriesTree] = useState<ICategoryTree[]>([]);

    const buildTree = (tree: ICategoryTree[], category: ICategory) => {
        tree.forEach((treeItem: ICategoryTree) => {
            for (let prop in treeItem) {
                if (prop === "children") {
                    let node = treeItem[prop];
                    if (!!node.find((x: ICategoryTree) => x.id === category.parentId)) {
                        node.find((x: ICategoryTree) => x.id === category.parentId)?.children.push({
                            name: category.name,
                            id: category.id,
                            children: []
                        })
                    } else {
                        if (prop === "children") {
                            buildTree(treeItem[prop], category);
                        }
                    }
                }
            }
        })
    };

    useEffect(() => {
        if (categories != null && categories.length > 0) {
            let categoriesTree: ICategoryTree[] = [];

            /**
             * Сортировка списка категорий, элементы массива с parentId === null выводятся наверх
             * */
            categories.sort((category: ICategory) => {
                if (category.parentId === null) {
                    return -1;
                } else {
                    return 1;
                }
            })

            /**
             * Построение древа категорий
             */
            categories.forEach((category: ICategory) => {
                if (category.parentId === null) {
                    categoriesTree.push({
                        name: category.name,
                        id: category.id,
                        children: []
                    })
                } else {
                    if (!!categoriesTree.find((x: ICategoryTree) => x.id === category.parentId)) {
                        categoriesTree.find((x: ICategoryTree) => x.id === category.parentId)?.children.push({
                            name: category.name,
                            id: category.id,
                            children: []
                        })
                    } else {
                        buildTree(categoriesTree, category)
                    }
                }
            })
            setCategoriesTree(categoriesTree);
        }

    }, [categories])

    const onClickCategoryHandler = (branch: ICategoryTree) => {
        navigate(`/products${location.search}&category=${branch.id}`)
    };

    const createTree = (branch: ICategoryTree) =>
        branch.children && (
            <TreeItem
                id={branch.id}
                key={branch.id}
                onSelectCallback={(e: React.MouseEvent<HTMLElement>) => {
                    onClickCategoryHandler(branch)
                }}
                label={branch.name}
            >
                {branch.children.map((branch: ICategoryTree) => {
                    return <Fragment key={branch.id}>{createTree(branch)}</Fragment>
                })}
            </TreeItem>
        )

    if (loading) {
        return (
            <Loader className={'m-auto'}/>
        )
    }

    if (error) {
        /* todo add Plug*/
        return (
            <div>PLUG</div>
        )
    }

    return (
        <>
            <Breadcrumbs links={breadcrumbs}/>
            <div className={'box m-t-8'}>
                {categoriesTree.map((branch: ICategoryTree, index: number) => (
                    <div key={index}>{createTree(branch)}</div>
                ))}
            </div>
        </>
    )
};

const TreeItem: React.FC<ITreeItem> = ({onSelectCallback, label, children}) => {

    const [isOpen, toggleItemOpen] = useState<boolean | null>(null)

    return (
        <div>
            <div className={styles['tree-item']}
                 onClick={(e: React.MouseEvent<HTMLInputElement>) => {
                     if (children.length === 0) {
                         onSelectCallback(e)
                     } else {
                         toggleItemOpen(!isOpen)
                     }
                 }}
            >
                {children.length > 0 && (
                    isOpen ?
                        <Icon name={'expand_more'}/>
                        :
                        <Icon name={'chevron_right'}/>)}
                <div
                    className={classNames(styles['label'], children.length === 0 && styles['label--has-node'])}>
                    {label}
                </div>
            </div>
            <div className={styles['tree-children']}>{isOpen && children}</div>
        </div>
    )
}

export default CategoriesOutput;
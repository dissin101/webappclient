import React, {Fragment, useEffect, useState} from 'react';

/**
 * Компонент - список категорий товаров
 * @param list
 * @param onSelectCallback
 * @constructor
 */

const CatalogCategoriesTreeOutput = (props: any) => {
    return(<div>
        123
    </div>)
}

/*const CatalogCategoriesTreeOutput: React.FC<ICategoriesTree> = ({list, onSelectCallback}) => {

    const [categories, setCategories] = useState<ICategoryTree[]>([]);

    /!**
     * Рекурсивное построение древа категорий
     *!/
    const buildTree = (tree: ICategoryTree[], category: ICategory) => {
        tree.forEach((treeItem: ICategoryTree) => {
            for (let prop in treeItem){
                if (prop === "children"){
                    let node = treeItem[prop];
                    if (!!node.find((x: ICategoryTree) => x.id === category.parentId)){
                        node.find((x: ICategoryTree) => x.id === category.parentId)?.children.push({
                            name: category.name,
                            id: category.id,
                            children: []
                        })
                    } else {
                        if (prop === "children"){
                            buildTree(treeItem[prop], category);
                        }
                    }
                }
            }
        })
    };

    useEffect(() => {
        if (list != null && list.length > 0) {
            let categoriesTree: ICategoryTree[] = [];

            /!**
             * Сортировка списка категорий, элементы массива с parentId === null выводятся наверх
             * *!/
            list.sort((category: ICategory) => {
                if (category.parentId === null){
                    return -1;
                } else {
                    return 1;
                }
            })

            /!**
             * Построение древа категорий
             *!/
            list.forEach((category: ICategory) => {
                if (category.parentId === null){
                    categoriesTree.push({
                        name: category.name,
                        id: category.id,
                        children: []
                    })
                } else {
                    if (!!categoriesTree.find((x: ICategoryTree) => x.id === category.parentId)){
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
            setCategories(categoriesTree);
        }

    }, [list])

    const createTree = (branch: ICategoryTree) =>
        branch.children && (
            <TreeItem
                id={branch.id}
                key={branch.id}
                onSelectCallback={(e: React.MouseEvent<HTMLElement>) => {
                    onSelectCallback(branch)
                }}
                label={branch.name}
            >
                {branch.children.map((branch: ICategoryTree) => {
                    return <Fragment key={branch.id}>{createTree(branch)}</Fragment>
                })}
            </TreeItem>
        )

    return (
            <div className={'box'}>
                {categories.map((branch: ICategoryTree, index: number) => (
                    <div key={index}>{createTree(branch)}</div>
                ))}
            </div>
    )
}

/!**
 * Компонент - элемент списка категорий
 * @param onSelectCallback
 * @param label
 * @param children
 * @constructor
 *!/
const TreeItem: React.FC<ITreeItem> = ({onSelectCallback, label, children}) => {

    const [isOpen, toggleItemOpen] = useState<boolean | null>(null)

    return (
        <div>
            <div className={styles['tree-item']}
                 onClick={(e: React.MouseEvent<HTMLInputElement>) => {
                     if (children.length === 0){
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
}*/

export default CatalogCategoriesTreeOutput;
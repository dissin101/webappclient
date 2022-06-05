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

const ProfileProductAdd = () => {

    const dispatch = useDispatch();

    const {brands, brandsLoading, isBrandAdd} = useSelector((state: RootState) => ({
        brands: state.brands.data,
        brandsLoading: state.brands.loading,
        isBrandAdd: state.brands.isBrandAdd
    }))

    useEffect(() => {
        if (isBrandAdd){
            dispatch(getBrands());
        }
    }, [isBrandAdd])

    const [isShowAddBrandModal, setIsShowAddBrandModal] = useState(false);

    const brandListOptions = brands.map(({id, name}: IBrand) => {
        return {
            value: id,
            label: name

        }
    })

    const changeBrandsModalHandler = () => {
        setIsShowAddBrandModal(!isShowAddBrandModal)
    }

    return (
        <div>
            <h2 className={'m-t-0 m-b-8'}>Добавление товара</h2>
            <div className={'row'}>
                <div className={'col-12 col-md-6 d-flex align-items-center'}>
                    {
                        !brandsLoading ?
                            <>
                                <Select
                                    options={brandListOptions}
                                    onChange={(e) => console.log(e)}
                                    isMulti={false}
                                    placeholder={'Бренд'}
                                />
                                <Button className={'m-l-8'}
                                        size={'sm'}
                                        color={'info'}
                                        onClick={() => changeBrandsModalHandler()}
                                >
                                    <Icon name={'add'}/>
                                </Button>
                            </>
                            :
                            <Loader/>
                    }
                </div>
            </div>
            <Modal
                header={'Добавление бренда'}
                isVisible={isShowAddBrandModal}
                onClose={changeBrandsModalHandler}
            >
                <ProfileBrandAddModal closeHandler={changeBrandsModalHandler}/>
            </Modal>
        </div>
    );
};

export default ProfileProductAdd;
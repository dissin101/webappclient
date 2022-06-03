import React from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../../../../index";
import Button from "../../../UI/Button";

const ProfileSettingsOutput: React.FC = () => {

    const {data} = useSelector((state: RootState) => state.auth);

    return (
        <div className={'d-flex flex-column'}>
            <h2 className={'m-t-0 m-b-8'}>Настройки пользователя</h2>
            <div className={'m-b-8'}>
                <span>ID: {data.id}</span>
            </div>
            <div className={'m-b-8'}>
                <span>Роль: {data.role}</span>
            </div>
            <div className={'m-b-8'}>
                <span>Email: {data.email}</span>
            </div>
            <Button className={'m-l-auto m-r-auto'} color={'primary'}>Редактировать</Button>
        </div>
    );
};

export default ProfileSettingsOutput;
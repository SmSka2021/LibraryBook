
import React from 'react';
import {useForm} from 'react-hook-form';
import st from './load-img.module.css';
import avatar from '../../assets/icon/avatar.svg';
import {useAppSelector} from '../../store/selectors/hook';
import {avatarUserSelector} from '../../store/selectors/user-state-selectors';
import {useAppDispatch} from '../../store/store';
import {fetchLoadAvatar} from '../../store/thunks/load-avatar-thunk';
import {baseUrl} from "../../shared/constants/url";


export const LoadImg = () => {
    const userAvatar = useAppSelector(avatarUserSelector);
    const dispatchApi = useAppDispatch();
    const { register, handleSubmit } = useForm();

    const onSubmit = async ( data:any) => {
        const formData = new FormData();
       await formData.append('files', data.file[0]);
        dispatchApi(fetchLoadAvatar(formData));
    };

        return (
            <form onSubmit={handleSubmit(onSubmit)} className={st.header__auth_form}>
            <label htmlFor='contained-button-file' >
                <input
                       id='contained-button-file'
                       type='file' className={st.load_img}
                       {...register('file')}
                       onChange={handleSubmit(onSubmit)}/>
                <img className={st.avatar_user}
                     src={userAvatar ? `${baseUrl}${userAvatar}` : avatar} alt='Avatar'/>
            </label>
            </form>
        );

}



// [{'id':561,'name':'bronchtein2023_1 (1).jpg',
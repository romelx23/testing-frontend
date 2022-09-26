import React, { useContext, useRef } from 'react'
import { UIContext } from '../../../context/ui';

type Props = {
    children: JSX.Element,
};

export const Modal = ({ children }: Props) => {
    const {ToggleModal,toggleModal} = useContext(UIContext)
    return (
        <div
        className={`container__modal ${ToggleModal?'modal__visible':'modal__hidden'}`}
        >
            <div 
            className='w-full h-full'
            onClick={()=>toggleModal(false)}
            >
            </div>
            <button 
            className='btn bg-red-500 text-white p-2 rounded-lg top-8 right-4 absolute z-30'
            onClick={()=>toggleModal(false)}
            >
                <i className='fas fa-times'></i>
            </button>
            <div className='absolute h-full flex justify-center items-center'>
                {children}
            </div>
        </div>
    )
}
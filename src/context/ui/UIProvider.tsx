import { FC, useReducer } from 'react'
import { UIContext, UIReducer } from './'
interface Props {
    children: React.ReactNode
}

export interface UIState {
  ToggleMenu: boolean;
  ToggleCart: boolean;
  ToggleModal:boolean;
  ToggleTheme:boolean;
  logoMarket:string;
}

export const UI_INITIAL_STATE: UIState = {
  ToggleMenu: false,
  ToggleCart:false,
  ToggleModal:false,
  ToggleTheme:localStorage.getItem('theme') === 'false' ? false : true,
  logoMarket:'',
}

export const UIProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(UIReducer, UI_INITIAL_STATE)
  const toggleMenu=(value:boolean)=>{
    dispatch({type:'[UI] - Toggle Sidebar',payload:value})
  }
  const toggleCart=(value:boolean)=>{
    dispatch({type:'[UI] - Toggle Cart',payload:value})
  }
  const toggleModal=(value:boolean)=>{
    dispatch({type:'[UI] - Toggle Modal',payload:value})
  }
  const SetLogo=(image:string)=>{
    dispatch({type:'[UI] - Set LogoMarket',payload:image})
  }
  const toggleTheme=(value:boolean)=>{
    localStorage.setItem('theme',`${value}`)
    dispatch({type:'[UI] - Toggle Theme',payload:value})
  }
  return (
    <UIContext.Provider
      value={{
        ...state,
        toggleMenu,
        toggleCart,
        toggleModal,
        toggleTheme,
        SetLogo
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

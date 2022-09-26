import { FC, useContext, useReducer } from "react";
import Swal from "sweetalert2";
import { AuthContext, AuthReducer } from ".";
import { fetchContoken, fetchSintoken } from "../../helpers";
import { User, UserBody } from "../../interfaces";

interface AuthProviderProps {
  children: React.ReactNode;
}

export interface AuthState {
  checking: boolean;
  user: User;
}

export const Auth_INITIAL_STATE: AuthState = {
  checking: true,
  user: {} as User,
};

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, Auth_INITIAL_STATE);
 
  const startLogin = async (email: string, password: string) => {
    const resp = await fetchSintoken(
      "api/auth/login",
      { correo: email, password },
      "POST"
    );
    const body: UserBody = await resp!.json();
    // console.log(body);
    if (body.token) {
      const { token, usuario } = body;
      localStorage.setItem("token", body.token);
      dispatch({
        type: "[Auth] - Login",
        payload: {
          user: usuario,
        },
      });
    } else {
      return Swal.fire("Error", "Error al Loguearse", "error");
    }
  };

  const startRegister = async (
    name: string,
    email: string,
    password: string,
    password2: string
  ) => {
    const resp = await fetchSintoken(
      "api/usuarios",
      {
        nombre: name,
        correo: email,
        password,
        password2,
        img:"https://jsl-online.com/wp-content/uploads/2017/01/placeholder-user.png",
        rol: "CLIENTE_ROLE",
      },
      "POST"
    );
    const body: UserBody = await resp!.json();
    console.log(body);
    if (body.token) {
      const { token, usuario } = body;
      localStorage.setItem("token", token);
      dispatch({
        type: "[Auth] - Register",
        payload: {
          user: usuario,
        },
      });
    } else {
      Swal.fire("Error", body.msg, "error");
    }
  };

  const startCheking = async () => {
    const resp = await fetchContoken("api/auth");
    const body: UserBody = await resp!.json();
    if (body.token) {
      // console.log(body,"body");
      const { token, usuario } = body;
      localStorage.setItem("token", body.token);
      dispatch({
        type: "[Auth] - Login",
        payload: {
          user: usuario,
        },
      });
      checkingFinish();
    } else {
      checkingFinish();
    }
  };

  const checkingStart = () =>
    dispatch({
      type: "[Auth] - Checking",
      payload: { checking: true },
    });
  const checkingFinish = () =>
    dispatch({
      type: "[Auth] - Checking",
      payload: { checking: false },
    });
  const logOut = () => {
    localStorage.removeItem("token");
    dispatch({
      type: "[Auth] - Logout",
    });
  };
  const updateUser = (user: User) =>{
    dispatch({
      type: "[User] - Update",
      payload: { user },
    });
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        startLogin,
        startRegister,
        startCheking,
        updateUser,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

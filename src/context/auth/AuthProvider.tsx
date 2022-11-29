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
      { email, password },
      "POST"
    );
    const body: UserBody = await resp!.json();
    console.log(body);
    if (body.token) {
      const { token, user } = body;
      localStorage.setItem("token", body.token);
      dispatch({
        type: "[Auth] - Login",
        payload: {
          user: user,
        },
      });
      checkingStart();
      // checkingFinish();
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
      "api/users",
      {
        name,
        email,
        password,
        image: "https://jsl-online.com/wp-content/uploads/2017/01/placeholder-user.png",
        rol: "USER_ROLE",
      },
      "POST"
    );
    const body: UserBody = await resp!.json();
    console.log(body);
    if (body.token) {
      const { token, user } = body;
      localStorage.setItem("token", token);
      dispatch({
        type: "[Auth] - Register",
        payload: {
          user: user,
        },
      });
    } else {
      Swal.fire("Error", body.msg, "error");
    }
  };

  const startCheking = async () => {
    const resp = await fetchContoken("api/auth");
    const body: UserBody = await resp!.json();
    // console.log(body, "body");
    if (body.token) {
      const { token, user } = body;
      localStorage.setItem("token", body.token);
      dispatch({
        type: "[Auth] - Login",
        payload: {
          user: {
            ...user,
          },
        },
      });
      checkingFinish();
    } else {
      checkingFinish();
    }
  };

  const checkingStart = () => {
    dispatch({
      type: "[Auth] - Checking",
      payload: { checking: true },
    });
  }

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
  const updateUser = (user: User) => {
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

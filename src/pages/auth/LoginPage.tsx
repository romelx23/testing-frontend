import { MyForm, NavbarAuth } from "../../components/ui";
// import { login, LoginWithGoogle } from "../actions/auth";

export const LoginPage = () => {
  // const dispatch = useDispatch();
  const handleLogin = () => {
    // dispatch(login('1412125','romel','htpp://google.com'))
    // dispatch(LoginWithGoogle())
    // console.log('hola');
  };
  const handleGoogleLogin = () => {
    // dispatch(LoginWithGoogle())
  };
  return (
    <div className="login-page" id="login">
      <NavbarAuth />
      <div className="lg:grid lg:grid-cols-2 lg:h-[90vh] flex flex-col items-center">
        <h3 className="lg:text-5xl mt-10 mb-5 text-blue-600 font-bold text-center text-lg ">
          Adminnistre sus Productos y Proveedores
        </h3>
        <img
          className="lg:rounded-t object-cover h-96 w-96 rounded-full lg:m-auto mb-5"
          src="https://media.discordapp.net/attachments/839620709517230081/1027711480424050809/unknown.png"
          alt="La sed nocturna"
        />
        <div className="col-start-2 flex w-full">
          <MyForm message="Incio de Serión" />
        </div>
      </div>
    </div>
  );
};

import React, { useContext, useEffect, useState } from 'react'
import { LayoutProfile } from '../../components/layout'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FormikErrors, useFormik } from 'formik';
import { useProviders } from '../../hooks/useProviders';
import { ProviderContext } from '../../context/provider';
interface FormValues {
    name: string;
    email: string;
    phone: string;
    address: string;
    image: string;
}
export const ProviderActionPage = () => {
    const { pathname } = useLocation();
    const action = pathname.split('/')[3];
    const id = pathname.split('/')[4];
    const [isExist, setIsExist] = useState(false);
    const navigate = useNavigate();
    const { createProvider, updateProvider } = useProviders();
    const { provider, selectProvider } = useContext(ProviderContext);
    const {
        errors,
        values,
        touched,
        handleChange,
        handleSubmit,
        handleBlur,
        setValues,
        setTouched,
    } = useFormik({
        initialValues: {
            name: "",
            email: "",
            phone: "",
            address: "",
            image: ""
        },
        validate: (values: FormValues) => {
            let errors: FormikErrors<FormValues> = {};
            if (!values.name) {
                errors.name = "El Nombre es requerido";
            }
            if (values.name.length < 3 || values.name.length > 20) {
                errors.name = "La Nombre debe tener entre 3 a 20 caracteres aprox.";
            }
            if (!values.email) {
                errors.email = "El email es requerido";
            }
            if (!values.phone) {
                errors.phone = "El teléfono es requerido";
            }
            if (values.phone.length < 9 || values.phone.length > 9) {
                errors.phone = "El teléfono debe tener 9 dígitos";
            }
            if (!values.address) {
                errors.address = "La dirección es requerida";
            }
            if (!values.image) {
                errors.image = "La imagen es requerida";
            }

            return errors;
        },
        onSubmit: () => {
            submitProvider();
        },
    });

    const submitProvider = () => {
        if (action === "agregar") {
            createProvider(values);
            setValues({
                name: "",
                email: "",
                phone: "",
                address: "",
                image: ""
            });
            setTouched({
                name: false,
                email: false,
                phone: false,
                address: false,
                image: false
            });
            return;
        }
        if (action === "editar") {
            if (!provider?.uuid) return;
            updateProvider(provider.uuid, values);
            navigate("/admin/proveedores");
            setValues({
                name: "",
                email: "",
                phone: "",
                address: "",
                image: ""
            });
            setTouched({
                name: false,
                email: false,
                phone: false,
                address: false,
                image: false
            });
            return;
        }
    };

    useEffect(() => {
        console.log(id);
        selectProvider(id);
        if (action === 'editar' && provider) {
            setValues({
                name: provider.name || "",
                email: provider.email || "",
                phone: provider.phone.toString() || "",
                address: provider.address || "",
                image: provider.image || ""
            });
        }
    }, [action, setTouched, setValues, id, provider]);


    return (
        <LayoutProfile>
            <div className="min-h-[85vh]">
                <h1 className="text-2xl font-bold">{
                    action === 'agregar' ? 'Agregar Proveedor' : 'Editar Proveedor'
                }</h1>
                <form
                    className='flex flex-col gap-5 md:gap-0 md:grid md:grid-cols-2'
                    onSubmit={handleSubmit}>
                    <div className="px-4">
                        <div className="text-left mb-2">
                            <label htmlFor="name" className="mb-2">
                                Nombre del Proveedor
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="w-full border-2 border-gray-300 px-2 py-1"
                                placeholder="Ingrese el nombre de la categoría"
                            />
                        </div>
                        {touched.name && errors.name && (
                            <p className="text-red-600 text-left max-w-md w-full">
                                {errors.name}
                            </p>
                        )}
                        <div className="text-left mb-2">
                            <label htmlFor="email" className="mb-2">
                                Email del Proveedor
                            </label>
                            <input
                                type="text"
                                name="email"
                                id="email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="w-full border-2 border-gray-300 px-2 py-1"
                                placeholder="Ingrese el email del proveedor"
                            />
                        </div>
                        {touched.email && errors.email && (
                            <p className="text-red-600 text-left max-w-md w-full">
                                {errors.email}
                            </p>
                        )}
                        <div className="text-left mb-2">
                            <label htmlFor="phone" className="mb-2">
                                Teléfono del Proveedor
                            </label>
                            <input
                                type="text"
                                name="phone"
                                id="phone"
                                value={values.phone}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="w-full border-2 border-gray-300 px-2 py-1"
                                placeholder="Ingrese el telefono del proveedor"
                            />
                        </div>
                        {touched.phone && errors.phone && (
                            <p className="text-red-600 text-left max-w-md w-full">
                                {errors.phone}
                            </p>
                        )}
                        <div className="text-left mb-2">
                            <label htmlFor="address" className="mb-2">
                                Dirección del Proveedor
                            </label>
                            <input
                                type="text"
                                name="address"
                                id="address"
                                value={values.address}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="w-full border-2 border-gray-300 px-2 py-1"
                                placeholder="Ingrese la dirección del proveedor"
                            />
                        </div>
                        {touched.address && errors.address && (
                            <p className="text-red-600 text-left max-w-md w-full">
                                {errors.address}
                            </p>
                        )}
                        <div className="text-left mb-2">
                            <label htmlFor="image" className="mb-2">
                                Imagen del Proveedor
                            </label>
                            <input
                                type="text"
                                name="image"
                                id="image"
                                value={values.image}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="w-full border-2 border-gray-300 px-2 py-1"
                                placeholder="Ingrese la imagen del proveedor"
                            />
                        </div>
                        {touched.image && errors.image && (
                            <p className="text-red-600 text-left max-w-md w-full">
                                {errors.image}
                            </p>
                        )}
                        {action === 'agregar' ? (
                            <div className="flex flex-col">
                                <button
                                    type="submit"
                                    className="w-full btn my-2 bg-blue-500 text-white hover:bg-blue-700"
                                >
                                    Agregar Proveedor
                                </button>

                            </div>
                        ) : (
                            <>
                                {
                                    provider ? (
                                        <button
                                            type="submit"
                                            className="w-full btn my-2 bg-purple-500 text-white hover:bg-purple-700"
                                        >
                                            Actualizar Proveedor
                                        </button>
                                    )
                                        :
                                        (
                                            <div className="flex flex-col justify-center items-center">
                                                <p className='font-semibold text-lg '>No Existe este proveedor</p>
                                                <Link
                                                    to="/admin/proveedores"
                                                    className="btn bg-blue-500 text-white hover:bg-blue-700"
                                                >
                                                    Volver a Proveedores
                                                </Link>
                                            </div>
                                        )
                                }
                            </>
                        )}
                    </div>
                    <div className="flex flex-col justify-center items-center col-start-2 ">
                        <p className='font-semibold text-lg '>Vista Previa</p>
                        <div className="flex justify-center items-center flex-1">
                            <img
                                src={values.image ? values.image : 'https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544807?k=20&m=1147544807&s=612x612&w=0&h=pBhz1dkwsCMq37Udtp9sfxbjaMl27JUapoyYpQm0anc='}
                                alt="Imagen del proveedor"
                                className="w-40 h-40 object-cover rounded-lg shadow-lg shadow-gray-600"
                            />
                        </div>
                    </div>
                </form>

            </div>
        </LayoutProfile>
    )
}

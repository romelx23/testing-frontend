import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { LayoutProfile } from "../../components/layout";
import { MyMapComponent } from "../../components/ui/Map/Map";
import { AuthContext } from "../../context/auth";
import { MapContext } from "../../context/map";
import { fetchContoken, MarketShema } from "../../helpers";
import { useMarket } from "../../hooks/useMarket";
import { MarketForm } from "../../interfaces/market";
import { baseUrl } from "../../utils";

export const MarketAddPage = () => {
  const { user } = useContext(AuthContext);
  const {MyLocation} = useContext(MapContext);
  const {handleExistMarket,id,setId}=useMarket();
  const { pathname } = useLocation();
  const path = pathname.split("/")[3];
  const {
    errors,
    values,
    touched,
    handleChange,
    handleSubmit,
    handleBlur,
    setValues,
  } = useFormik<MarketForm>({
    initialValues: {
      name: "",
      description: "",
      address: "",
      phone: "",
      email: "",
      owner: "",
      latitude: "",
      longitude: "",
      h_start: "",
      h_end: "",
      // social: "",
      // socialMedia: [],
      yape: "",
      image: "",
    },
    validationSchema: MarketShema,
    onSubmit: () => {
      console.log("submit");
      if (path === "agregar") handleCreate();
      if (path === "actualizar") handleUpdate();
    },
  });
  // console.log(values,"values");
  // const addSoialMedia = () => {
  //   if (values.socialMedia.length < 5) {
  //     console.log(values.social);
  //     const { social } = values;
  //     setValues({
  //       ...values,
  //       socialMedia: [...values.socialMedia, { name: social, url: "" }],
  //     });
  //   }
  // };
  // const removeSocialMedia = (index: number) => {
  //   setValues({
  //     ...values,
  //     socialMedia: values.socialMedia.filter((_, i) => i !== index),
  //   });
  // };
  const addMarket = async () => {
    const {
      name,
      description,
      address,
      phone,
      email,
      owner,
      latitude,
      longitude,
      h_start,
      h_end,
      // socialMedia,
      image,
    } = values;
    const resp = await fetchContoken(
      `api/bodega`,
      {
        nombre: name,
        descripcion: description,
        telefono: phone,
        latitudDeBodega: latitude,
        longitudDeBodega: longitude,
        email: email,
        nombrePropietario: owner,
        h_inicio: h_start,
        h_final: h_end,
        direccion: address,
        // facebook:socialMedia[0].url,
        // instagram:socialMedia[1].url,
        // twitter:socialMedia[2].url,
        // youtube:socialMedia[3].url,
        youtube: "a",
        Twitter: "a",
        imagen: image,
      },
      "POST"
    );
    const data = await resp!.json();
    console.log(data);
    Swal.fire({
      icon: "success",
      title: "Bodega agregada",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    });
  };

  const handleCreate=()=>{
    if(id){
      Swal.fire({
        icon: "warning",
        title: "Usted ya tiene una bodega",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      });
      return;
    }
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Esta acción no se puede revertir",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, agregar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        addMarket();
      }
    }
    );
  }

  const updateMarket = async () => {
    const {
      name,
      description,
      address,
      phone,
      email,
      owner,
      latitude,
      longitude,
      h_start,
      h_end,
      // socialMedia,
      image,
    } = values;
    const resp = await fetchContoken(
      `api/bodega/${id}`,
      {
        nombre: name,
        descripcion: description,
        telefono: phone,
        latitudDeBodega: latitude,
        longitudDeBodega: longitude,
        email: email,
        nombrePropietario: owner,
        h_inicio: h_start,
        h_final: h_end,
        direccion: address,
        // facebook:socialMedia[0].url,
        // instagram:socialMedia[1].url,
        // twitter:socialMedia[2].url,
        // youtube:socialMedia[3].url,
        youtube: "a",
        Twitter: "a",
        imagen: image,
      },
      "PUT"
    );
    const data = await resp!.json();
    console.log(data);
    Swal.fire({
      icon: "success",
      title: "Bodega actualizada",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    });
  };

  const handleUpdate=()=>{
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Esta acción no se puede revertir",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, actualizar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        updateMarket();
      }
    }
    );
  }
  

  // console.log(values);
  // console.log(errors);
  // if market is not null then we are editing

  const chargeMarket = async () => {
    const { uid } = user;
    const resp = await fetchContoken(
      `api/usuarios/datosBodega/${uid}`,
      {},
      "POST"
    );
    const data = await resp!.json();
    if (!data.errors) {
      const bodega = data.bodega;
      console.log(bodega);
      setValues({
        ...values,
        name: bodega[0].nombre || "",
        description: bodega[0].descripcion || "",
        address: bodega[0].direccion || "",
        phone: bodega[0].telefono || "",
        email: bodega[0].email || "",
        owner: bodega[0].nombrePropietario || "",
        h_start: bodega[0].h_inicio || "",
        h_end: bodega[0].h_final || "",
        // latitude: bodega[0].latitudDeBodega?bodega[0].latitudDeBodega:MyLocation[0],
        // longitude: bodega[0].longitudDeBodega?bodega[0].longitudDeBodega:MyLocation[1],
        // latitude:`${MyLocation[1]}`,
        // longitude:`${MyLocation[0]}`,
        latitude:bodega[0].latitudDeBodega,
        longitude:bodega[0].longitudDeBodega,
        // socialMedia: bodega[0].socialMedia || "",
        yape: bodega[0].yape || "",
        image: bodega[0].imagen || "",
      });
      // set Id
      setId(bodega[0]._id);
    }
  };

  useEffect(() => {
    if (path === "actualizar") chargeMarket();
  }, []);

  useEffect(() => {
    setValues({
      ...values,
      latitude: `${MyLocation[1]}`,
      longitude: `${MyLocation[0]}`,
    });
  }, [MyLocation])
  

  useEffect(() => {
    if (path === "agregar")
    setValues({
      ...values,
      latitude: `${MyLocation[1]}`,
      longitude: `${MyLocation[0]}`,
    });
  }, [MyLocation]);
  

  // console.log(errors, "errors");
  return (
    <LayoutProfile>
      <form
        onSubmit={handleSubmit}
        className="min-h-[85vh]
            grid grid-cols-1 gap-2
            md:grid-cols-2
            md:gap-4
            pb-3
            "
      >
        <div className="px-4">
          <h1 className="text-left font-semibold">Agregar Bodega</h1>
          <div className="text-left">
            <label htmlFor="name">Nombre de la Bodega</label>
            <input
              type="text"
              name="name"
              id="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full border-2 border-gray-300 px-2 py-1"
              placeholder="Ej. Bodega de Don Carlos"
            />
            {touched.name && errors.name && (
              <p className="text-red-600 text-left max-w-md w-full">
                {errors.name}
              </p>
            )}
          </div>
          <div className="text-left">
            <label htmlFor="description">Descripción de la bodega</label>
            <input
              type="text"
              name="description"
              id="description"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full border-2 border-gray-300 px-2 py-1"
              placeholder="Ej. La bodega de la ciudad"
            />
            {touched.description && errors.description && (
              <p className="text-red-600 text-left max-w-md w-full">
                {errors.description}
              </p>
            )}
          </div>
          <div className="text-left">
            <label htmlFor="owner">Propietario de la bodega</label>
            <input
              type="text"
              name="owner"
              id="owner"
              value={values.owner}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full border-2 border-gray-300 px-2 py-1"
              placeholder="Ej. Carlos Ivan"
            />
            {touched.owner && errors.owner && (
              <p className="text-red-600 text-left max-w-md w-full">
                {errors.owner}
              </p>
            )}
          </div>
          <div className="text-left">
            <label htmlFor="phone">Telefono de la bodega</label>
            <input
              type="tel"
              name="phone"
              id="phone"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full border-2 border-gray-300 px-2 py-1"
              placeholder="Ej. +51912345678"
            />
            {touched.phone && errors.phone && (
              <p className="text-red-600 text-left max-w-md w-full">
                {errors.phone}
              </p>
            )}
          </div>
          <div className="text-left">
            <label htmlFor="address">Ubicación de la bodega</label>
            <input
              type="text"
              name="address"
              id="address"
              value={values.address}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full border-2 border-gray-300 px-2 py-1"
              placeholder="Ingrese el nombre de la bodega"
            />
            {touched.address && errors.address && (
              <p className="text-red-600 text-left max-w-md w-full">
                {errors.address}
              </p>
            )}
          </div>
          <div className="text-left">
            <label htmlFor="email">Email de la bodega</label>
            <input
              type="text"
              name="email"
              id="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full border-2 border-gray-300 px-2 py-1"
              placeholder="Ingrese el nombre de la bodega"
            />
            {touched.email && errors.email && (
              <p className="text-red-600 text-left max-w-md w-full">
                {errors.email}
              </p>
            )}
          </div>
          <div className="text-left">
            <label htmlFor="h_start">Hora de Inicio</label>
            <input
              type="time"
              name="h_start"
              id="h_start"
              value={values.h_start}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full border-2 border-gray-300 px-2 py-1"
              placeholder="Harario de la bodega"
            />
            {touched.h_start && errors.h_start && (
              <p className="text-red-600 text-left max-w-md w-full">
                {errors.h_start}
              </p>
            )}
          </div>
          <div className="text-left">
            <label htmlFor="h_end">Hora de Cerrar</label>
            <input
              type="time"
              name="h_end"
              id="h_end"
              value={values.h_end}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full border-2 border-gray-300 px-2 py-1"
              placeholder="Harario de la bodega"
            />
            {touched.h_end && errors.h_end && (
              <p className="text-red-600 text-left max-w-md w-full">
                {errors.h_end}
              </p>
            )}
          </div>
          <div className="h-96 overflow-hidden my-5">
            <MyMapComponent />
          </div>
          <div className="text-left">
            <label htmlFor="longitude">Longitud</label>
            <input
              type="text"
              name="longitude"
              id="longitude"
              value={values.longitude}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full border-2 border-gray-300 px-2 py-1"
              placeholder="Harario de la bodega"
            />
            {touched.longitude && errors.longitude && (
              <p className="text-red-600 text-left max-w-md w-full">
                {errors.longitude}
              </p>
            )}
          </div>
          <div className="text-left">
            <label htmlFor="latitude">Latitud</label>
            <input
              type="text"
              name="latitude"
              id="latitude"
              value={values.latitude}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full border-2 border-gray-300 px-2 py-1"
              placeholder="Harario de la bodega"
            />
            {touched.latitude && errors.latitude && (
              <p className="text-red-600 text-left max-w-md w-full">
                {errors.latitude}
              </p>
            )}
          </div>
          {/* dinamic input for add social media */}
          {/* <div className="text-left">
            <label htmlFor="social">Redes Sociales</label>
            <div className="w-full flex">
              <select
                name="social"
                id="social"
                value={values.social}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full border-2 border-gray-300 px-2 py-1"
              >
                <option value="facebook">Facebook</option>
                <option value="instagram">Instagram</option>
                <option value="twitter">Twitter</option>
                <option value="youtube">Youtube</option>
              </select>
              <button
                type="button"
                onClick={addSoialMedia}
                className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                +
              </button>
            </div>
            <div className="flex flex-col">
              {values.socialMedia &&
                values.socialMedia.map((socialMedia, index) => (
                  <div key={index} className="flex flex-col">
                    <label htmlFor={`socialMedia-${index}`} className="w-full">
                      {socialMedia.name}
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        name={`socialMedia.${index}.${socialMedia.name}`}
                        id={`socialMedia.${index}.${socialMedia.name}`}
                        value={socialMedia.url}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-full border-2 border-gray-300 px-2 py-1"
                        placeholder={`Ingrese su ${socialMedia.name}`}
                      />
                      <button
                        type="button"
                        onClick={() => removeSocialMedia(index)}
                        className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      >
                        -
                      </button>
                    </div>
                    {touched.socialMedia![`${index.toString}.name`] && errors.socialMedia.${index}.name && (
                      <p className="text-red-600 text-left max-w-md w-full">
                        {errors.socialMedia.${index}.name}
                      </p>
                    )}
                  </div>
                ))}
            </div>
          </div> */}
        </div>
        <div className="px-4">
          <div className="text-left">
            <label htmlFor="image">Ingrese el logo de la empresas</label>
            <input
              type="text"
              name="image"
              id="image"
              value={values.image}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full border-2 border-gray-300 px-2 py-1"
              placeholder="Ingrese el logo de la empresa"
            />
            {touched.image && errors.image && (
              <p className="text-red-600 text-left max-w-md w-full">
                {errors.image}
              </p>
            )}
          </div>
          <div className="my-2">
            <img
              src={
                values.image
                  ? values.image
                  : "https://upload.wikimedia.org/wikipedia/commons/2/2c/OneWeb_Logo.png"
              }
              alt="imagen"
              title="imagen"
              className="max-w-md max-h-48 mx-auto object-cover"
            />
          </div>
          <div className="text-left">
            <label htmlFor="yape">Ingrese su Código qr de yape</label>
            <input
              type="text"
              name="yape"
              id="yape"
              value={values.yape}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full border-2 border-gray-300 px-2 py-1"
              placeholder="Ingrese el logo de la empresa"
            />
            {touched.yape && errors.yape && (
              <p className="text-red-600 text-left max-w-md w-full">
                {errors.yape}
              </p>
            )}
            <a href="https://www.youtube.com/watch?v=7ZziKtxpMls">
              <p className="text-blue-500 text-left max-w-md w-full">
                ¿No tienes un código qr de yape?
              </p>
            </a>
          </div>
          <div className="my-2">
            <img
              src={
                values.yape
                  ? values.yape
                  : "https://res.cloudinary.com/react-romel/image/upload/v1658199985/yape_xekq41.jpg"
              }
              alt="imagen"
              title="imagen"
              className="max-w-md max-h-48 mx-auto object-cover"
            />
          </div>
          {path === "actualizar" ? (
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Actulizar
            </button>
          ) : (
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Guardar
            </button>
          )}
        </div>
      </form>
    </LayoutProfile>
  );
};

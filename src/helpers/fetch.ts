import { baseUrl } from "../utils";

export const fetchSintoken = (endpoint: string, data: any, method = "GET") => {
  const url = `${baseUrl}/${endpoint}`; //localhost:4000/api/
  try {
    if (method === "GET") {
      return fetch(url);
    } else {
      return fetch(url, {
        method,
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchContoken = (endpoint: string, data?: any, method = "GET") => {
  const url = `${baseUrl}/${endpoint}`; //localhost:4000/api/
  const token = localStorage.getItem("token") || "";
  try {
    if (method === "GET") {
      return fetch(url, {
        method,
        headers: {
          "x-token": token,
        },
      });
    } else {
      return fetch(url, {
        method,
        headers: {
          "Content-type": "application/json",
          "x-token": token,
        },
        body: JSON.stringify(data),
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// export const fetchSinToken=async(email:string,password:string)=>{
//     const res=await fetch(`${baseUrl}/api/auth/login`,{
//       method:'POST',
//       headers:{
//         'Content-Type':'application/json'
//       },
//       body:JSON.stringify({correo:email,password})
//     })
//     const data=await res.json();
//     console.log(data);
//   }

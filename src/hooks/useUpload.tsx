import { useState } from "react";
import { fetchSintoken } from "../helpers";
import { fileUpload } from "../helpers/fileUpload";
interface UploadResponse {
  url: string;
}

export const useUpload = () => {
  const [url, setUrl] = useState("");
  const handleUploadImage = async (file:File) => {
    try {
      const resp = await fileUpload(file);
      //   const data: UploadResponse = resp.json();
      setUrl(resp.url);
      console.log(resp, "handleUploadImage");
    } catch (error) {
      console.log(error);
    }
  };
  return {
    handleUploadImage,
    url,
  };
};

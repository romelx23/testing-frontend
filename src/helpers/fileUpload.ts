import Swal from "sweetalert2";

export const fileUpload=async (file:File)=>{
    const cloudUrl='https://api.cloudinary.com/v1_1/react-romel/upload';

    const formData=new FormData();

    formData.append('upload_preset','react-journal');
    formData.append('file',file);

    try{
        const resp= await fetch(cloudUrl,{
            method:'POST',
            body:formData
        });
        
        if(resp.ok){
            const cloudResp=await resp.json();
            Swal.fire({
                title:'Success',
                text:'File uploaded successfully',
                icon:'success'
            });
            return cloudResp.secure_url;
        }else{
            throw await resp.json();
        }
    }catch(error){
        console.log(error)
        Swal.fire({
            title:'Error',
            text:'File upload failed',
            icon:'error'
        });
        throw error
    }
}
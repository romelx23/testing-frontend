export const searchApi=async()=>{
    const resp=await fetch('https://api.mapbox.com/geocoding/v5/mapbox.places/zoo%20.json?proximity=ip&types=place%2Cpostcode%2Caddress&language=es&access_token=pk.eyJ1Ijoicm9tZWx4MjMiLCJhIjoiY2tzZHA2Y2M0MHQyMjJvbXNsMmVjZW41aCJ9.2As_5QylbPvQj6mFtsHD_g')
    const data=await resp.json();
    return data;
}
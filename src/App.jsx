import { useEffect } from "react"
import getPlaylist from "./api";

const App = () => {
  useEffect(()=>{
    getPlaylist('PLfqMhTWNBTe0b2nM6JHVCnAkhQRGiZMSJ').then((data)=>{
      console.log(data);
    }) .catch((err)=>{
      console.log(err);
    })
    
  },[]);

  return (
    <div>App</div>
  )
}

export default App
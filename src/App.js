import logo from './logo.svg';
import './App.css';
import {useEffect} from "react";
import {useDispatch} from "react-redux";


function App() {
  const dispatch = useDispatch()

  // useEffect(()=>{
  //   dispatch(fetchProfile({name: 'test'}))
  //
  // },[])

  // const fetchProfile = async()=>{
  //   try {
  //     const resp = await axios.get('http://localhost:8081/profile')
  //     console.log(resp,'qqq')
  //   }catch (e) {
  //     console.log(e,'e')
  //   }
  // }

  return (
    <div className="main-container ">
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
    </div>
  );
}

export default App;

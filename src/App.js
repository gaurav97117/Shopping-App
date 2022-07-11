import {Routes, Route } from 'react-router-dom';


import Navigation from './routes/home/navigation/naviagation.component';
import Home from "./routes/home/home.component"

import SignIn from '../src/routes/sign-in/sign-in.component'



const Shop = ()=>{

return  <h1>I am Shop Page</h1>
}


const App = () => {

  return (
    <Routes>
      <Route path='/' element ={<Navigation/>}>
       <Route index element= {<Home/>}/>
       <Route path='shop' element= {<Shop/>}/>
       <Route path='sign-in' element= {<SignIn/>}/>
      </Route>
    </Routes>
  )
};

export default App;
import { DefaultLayout } from './components/Layout';
import { Routes,Route } from 'react-router-dom';
import {publicRoute} from './routes';
import axios from 'axios';
import  UserContextProvider  from './UserContext';
axios.defaults.baseURL = 'http://localhost:3000/api';
axios.defaults.withCredentials = true;
function App() {
  return (
          <UserContextProvider>
            <Routes>
              <Route path='/' element={<DefaultLayout/>}>
                  {publicRoute.map((route,index) =>{
                    const Page = route.component;
                    return <Route key={index} path={route.path} element={<Page/>}/>
                  })          
                  }
              </Route>
            </Routes>
          </UserContextProvider>
  )
}

export default App

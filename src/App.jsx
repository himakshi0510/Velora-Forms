import { useState, useEffect } from "react";
import {
BrowserRouter,
Routes,
Route,
useLocation
}
from "react-router-dom";

import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import CreateForm from "./pages/CreateForm";
import MyForms from "./pages/MyForms";
import FillForm from "./pages/FillForm";
import Responses from "./pages/Responses";
import Notifications from "./pages/Notifications";
import Analytics from "./pages/Analytics";
import Profile from "./pages/Profile";
import HelpDesk from "./pages/HelpDesk";
import Publish from "./pages/Publish";
import ThankYou from "./pages/ThankYou";



function Layout({theme,setTheme})
{

const location = useLocation();

const hideSidebar =

location.pathname.startsWith("/fill/")

||

location.pathname === "/thanks";



return(

<div className="layout">


{

!hideSidebar

&&


<Sidebar

theme={theme}

setTheme={setTheme}

/>

}



<div className="content">


<Routes>


<Route path="/" element={<Dashboard/>}/>

<Route path="/create" element={<CreateForm/>}/>

<Route path="/myforms" element={<MyForms/>}/>

<Route path="/fill/:id" element={<FillForm/>}/>

<Route path="/responses/:id" element={<Responses/>}/>

<Route path="/notifications" element={<Notifications/>}/>

<Route path="/analytics" element={<Analytics/>}/>

<Route path="/profile" element={<Profile/>}/>

<Route path="/help" element={<HelpDesk/>}/>

<Route path="/publish/:id" element={<Publish/>}/>

<Route path="/thanks" element={<ThankYou/>}/>


</Routes>


</div>


</div>

);

}




function App()
{

const [theme,setTheme] = useState(

localStorage.getItem("theme")

||

"light"

);



useEffect(()=>{

document.body.className = theme;

localStorage.setItem(

"theme",

theme

);

},[theme]);



return(

<BrowserRouter>


<Layout

theme={theme}

setTheme={setTheme}

/>


</BrowserRouter>

);

}



export default App;

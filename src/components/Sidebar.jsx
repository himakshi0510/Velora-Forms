import { Link } from "react-router-dom";
import { useState } from "react";

import {

Home,
PlusCircle,
FileText,
Bell,
BarChart3,
User,
CircleHelp,
PanelLeft

}

from "lucide-react";


function Sidebar(

{

theme,

setTheme

}

){

const [open,setOpen]=useState(true);


return(

<div

className={

open

?

"sidebar"

:

"sidebar collapsed"

}

>



<button

className="menuBtn"

onClick={()=>setOpen(!open)}

>

<PanelLeft size={22}/>

</button>




<h2 className="logo">

{

open

?

"VELORA"

:

"V"

}

</h2>




<Link to="/">


<Home size={18}/>


{

open &&

<span>

Dashboard

</span>

}


</Link>





<Link to="/create">


<PlusCircle size={18}/>


{

open &&

<span>

Create Form

</span>

}


</Link>





<Link to="/myforms">


<FileText size={18}/>


{

open &&

<span>

My Forms

</span>

}


</Link>






<Link to="/notifications">


<Bell size={18}/>


{

open &&

<span>

Notifications

</span>

}


</Link>






<Link to="/analytics">


<BarChart3 size={18}/>


{

open &&

<span>

Analytics

</span>

}


</Link>






<Link to="/profile">


<User size={18}/>


{

open &&

<span>

Profile

</span>

}


</Link>






<Link to="/help">


<CircleHelp size={18}/>


{

open &&

<span>

Help Desk

</span>

}


</Link>




<button

className="themeBtn"

onClick={()=>


setTheme(

theme==="light"

?

"dark"

:

"light"

)

}

>


{

theme==="light"

?

"🌙 Dark"

:

"☀ Light"

}


</button>



</div>

);

}


export default Sidebar;
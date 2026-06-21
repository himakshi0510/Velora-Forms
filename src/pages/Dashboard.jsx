import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";

import {

PlusCircle,

FileText,

MessageSquare

}

from "lucide-react";

import { supabase }

from "../supabase/supabase";



function Dashboard()
{

const navigate = useNavigate();

const [forms,setForms] = useState([]);

const [responses,setResponses] = useState([]);



useEffect(()=>{

fetchData();

},[]);



const fetchData = async()=>{


const {

data:{user}

}

=

await supabase.auth.getUser();



if(!user)
{

return;

}



const {

data:formsData

}

=

await supabase

.from(

"forms"

)

.select(

"*"

)

.eq(

"user_id",

user.id

);




const {

data:responsesData

}

=

await supabase

.from(

"responses"

)

.select(

"*"

);




const myFormIds =

(

formsData

||

[]

)

.map(

f=>f.id

);




const filteredResponses =

(

responsesData

||

[]

)

.filter(

response=>

myFormIds.includes(

response.form_id

)

);




setForms(

formsData

||

[]

);



setResponses(

filteredResponses

||

[]

);



};



const totalForms = forms.length;

const totalResponses = responses.length;



return(

<div className="dashboard">


<h1>

Welcome Back

</h1>


<p>

Build forms effortlessly and collect responses intelligently.

</p>




<div className="cards">



<div

className="card"

onClick={()=>navigate("/create")}

>


<PlusCircle

size={40}

color="#14b8a6"

/>


<h3>

Create Form

</h3>


<p>

Start Building

</p>


</div>





<div

className="card"

onClick={()=>navigate("/myforms")}

>


<FileText

size={40}

color="#2563eb"

/>


<h2>

{

totalForms

}

</h2>


<p>

Saved Forms

</p>


</div>





<div

className="card"

onClick={()=>navigate("/analytics")}

>


<MessageSquare

size={40}

color="#14b8a6"

/>


<h2>

{

totalResponses

}

</h2>


<p>

Collected Responses

</p>


</div>



</div>





{

forms.length===0


?


(

<div

className="formCard"

style={{marginTop:"40px"}}

>


<h2>

Welcome..

</h2>



<p>

You haven't created any forms yet.

</p>



<br/>



<button

className="saveBtn"

onClick={()=>navigate(

"/create"

)}

>

Create Form

</button>


</div>

)



:



(


<div

className="formCard"

style={{marginTop:"40px"}}

>


<h2>

Recent Activity

</h2>


<br/>



{

forms

.slice(

0,

3

)

.map(

(form)=>(


<div

key={form.id}

>


<h3>

{

form.title

}

</h3>



<p>

Responses :

{

responses.filter(

r=>r.form_id===form.id

)

.length

}

</p>



<br/>


</div>


)

)



}


</div>


)


}



</div>

);


}



export default Dashboard;
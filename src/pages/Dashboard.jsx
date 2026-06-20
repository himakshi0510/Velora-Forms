import { useNavigate } from "react-router-dom";
import {

PlusCircle,

FileText,

MessageSquare,

Clock

}

from "lucide-react";



function Dashboard(){

const navigate = useNavigate();

const forms =
JSON.parse(
localStorage.getItem("forms")
)
||
[];

const totalForms = forms.length;

const totalResponses =
forms.reduce(

(sum,form)=>

sum+

(

form.responses?.length

||

0

),

0

);


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

forms.length>0

&&


<div


className="formCard"

style={{

marginTop:"40px"

}}

>


<h2>

Recent Activity

</h2>



<br/>



{

forms.slice(

0,

3

)

.map(

(form,index)=>(


<div

key={index}

>


<h3>

{

form.title

}

</h3>



<p>

Responses :

{

form.responses?.length

||

0

}

</p>



<br/>


</div>


)


)



}



</div>

}



</div>

)


}

export default Dashboard;
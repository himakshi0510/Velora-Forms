import {supabase}

from "../supabase/supabase";

import { useNavigate } from "react-router-dom";

import {

useEffect,

useState

}

from "react";
import {

PieChart,
Pie,
Cell,

BarChart,
Bar,

XAxis,
YAxis,

Tooltip,

CartesianGrid,

Legend,

ResponsiveContainer

}

from "recharts";


function Analytics()
{

const navigate = useNavigate();

const [

forms,

setForms

]

=

useState(

[]

);


const [

responses,

setResponses

]

=

useState(

[]

);


const totalForms = forms.length;

const totalResponses = responses.length;

const formCounts = {};

responses.forEach(

(response)=>{

formCounts[response.form_id] =

(formCounts[response.form_id] || 0)

+

1;

}

);



const mostActiveId =

Object.keys(formCounts)

.reduce(

(a,b)=>

formCounts[a] >

formCounts[b]

?

a

:

b

,

Object.keys(formCounts)[0]

);



const mostActiveForm =

forms.find(

f=>f.id===mostActiveId

)

||

{

title:"None"

};


const averageResponses =

totalForms===0

?

0

:

(

totalResponses/

totalForms

)

.toFixed(1);


const emptyForms = forms.filter(

(form)=>{


return !responses.some(

r=>r.form_id===form.id

);


}

)

.length;



const checkUser = async()=>{


const {

data:{user}

}

=

await supabase.auth.getUser();



if(!user)
{

navigate("/profile");

}


};


useEffect(()=>{


checkUser();

fetchData();


},[]);


const pieData = [

{

name:"Responses",

value:

totalResponses

},

{

name:"Empty Forms",

value:

emptyForms

}

];


const barData = forms.map(

(form)=>({


name:

form.title,



responses:


responses.filter(

r=>r.form_id===form.id

)

.length


})

);




const fetchData = async()=>{


const {

data:{user}

}

=

await supabase.auth.getUser();



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

);

};

if(forms.length===0)
{

return(

<div className="formPage">

<h1>

Analytics

</h1>

<p>

No forms available

</p>

</div>

);

}

return(

<div className="formPage">


<h1

style={{

textAlign:"center",

marginBottom:"30px"

}}

>

Analytics

</h1>



<div className="analyticsGrid">



<div className="statsCard">

<h3>

Forms Created

</h3>

<h1>

{totalForms}

</h1>

</div>




<div className="statsCard">

<h3>

Responses Received

</h3>

<h1>

{totalResponses}

</h1>

</div>




<div className="statsCard">

<h3>

Average Responses

</h3>

<h1>

{averageResponses}

</h1>

</div>




<div className="statsCard">

<h3>

Empty Forms

</h3>

<h1>

{emptyForms}

</h1>

</div>




<div className="statsCard">

<h3>

Most Active Form

</h3>

<p>

{

mostActiveForm.title

||

"None"

}

</p>

</div>




<div className="statsCard">

<h3>

Highest Responses

</h3>

<h1>

{

formCounts[

mostActiveId

]

||

0

}

</h1>

</div>



</div>





<div className="chartCard">


<h2>

Responses Distribution

</h2>


<div

style={{

width:"100%",

height:"320px"

}}

>

<ResponsiveContainer

width="100%"

height={320}

>

<PieChart>

<Pie

data={pieData}

dataKey="value"

outerRadius={110}

label

>

<Cell fill="#14b8a6"/>

<Cell fill="#3b82f6"/>

</Pie>

<Tooltip/>

<Legend/>

</PieChart>

</ResponsiveContainer>

</div>


</div>





<div className="chartCard">


<h2>

Forms Overview

</h2>


<div

style={{

width:"100%",

height:"350px"

}}

>

<ResponsiveContainer

width="100%"

height={350}

>

<BarChart

data={barData}

>

<CartesianGrid/>

<XAxis dataKey="name"/>

<YAxis/>

<Tooltip/>

<Legend/>



<Bar

dataKey="responses"

fill="#14b8a6"

/>

</BarChart>

</ResponsiveContainer>

</div>


</div>





<h2

style={{

marginTop:"40px",

marginBottom:"20px"

}}

>

Forms Details

</h2>




{

forms.map(

(form,index)=>(



<div


className="formCard"


key={form.id}

>


<h3>

{

form.title

}

</h3>


<p>

Fields :

{

form.fields.length

}

</p>



<p>

Responses :

{

responses.filter(

r=>r.form_id===form.id

)

.length

}

</p>



</div>



)

)



}



</div>

)


}


export default Analytics;
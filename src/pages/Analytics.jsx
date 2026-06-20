import {supabase}

from "../supabase/supabase";

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


const mostActiveForm = { title: "Coming Soon" };


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


const emptyForms = 0;


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

name:form.title,

responses:0

})

);


useEffect(()=>{


fetchData();


},[]);



const fetchData = async()=>{


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



setForms(

formsData

||

[]

);



setResponses(

responsesData

||

[]

);


};

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

mostActiveForm.responses?.length

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

<ResponsiveContainer>

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

<ResponsiveContainer>

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


key={index}

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






</div>



)

)



}



</div>

)


}


export default Analytics;
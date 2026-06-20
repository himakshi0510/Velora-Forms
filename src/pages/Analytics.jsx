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

const forms =

JSON.parse(

localStorage.getItem(

"forms"

)

)

||

[];



const totalForms = forms.length;



const totalResponses = forms.reduce(

(sum,form)=>

sum+

(

form.responses?.length

||

0

),

0

);

const mostActiveForm = forms.reduce(

(max,form)=>

(form.responses?.length||0)

>

(max.responses?.length||0)

?

form

:

max

,

{

responses:[]

}

);



const averageResponses =

totalForms===0

?

0

:

(

totalResponses/

totalForms

)

.toFixed(

1

);



const emptyForms = forms.filter(

(form)=>

(form.responses?.length||0)

===0

).length;


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

(form)=>

({

name:

form.title,

responses:

form.responses.length

})

);


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

Responses :

{

form.responses.length

}

</p>



{

form.responses.length>0

&&


<p>

Latest Response :

{


form.responses[

form.responses.length-1

]

.submittedAt


}

</p>


}



</div>



)

)



}



</div>

)


}


export default Analytics;
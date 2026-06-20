import {useParams} from "react-router-dom";
import {useState,useEffect} from "react";
import { useToast } from "../context/ToastContext";

function Responses()
{

const {id}=useParams();

const [responses,setResponses]=useState([]);

const [search,setSearch]=useState("");

const [filter,setFilter]=useState("all");

const { showToast } = useToast();

const handleDelete = (responseIndex)=>{

let forms = JSON.parse(

localStorage.getItem("forms")

)

||

[];


let updatedForms = forms.map(

(form)=>{

if(form.id===id)
{

let updatedResponses =

form.responses.filter(

(_,i)=>

i!==responseIndex

);


return {

...form,

responses:updatedResponses

};

}


return form;

}

);


localStorage.setItem(

"forms",

JSON.stringify(updatedForms)

);


setResponses(

updatedForms.find(

(f)=>f.id===id

).responses

);

};

showToast(

"✔ Response deleted successfully"

);


useEffect(()=>{


let forms =

JSON.parse(

localStorage.getItem("forms")

)

||

[];



let form = forms.find(

(f)=>f.id===id

);



console.log("URL id:",id);

console.log("All forms:",forms);

console.log("Found form:",form);

if(form)
{

console.log(

"Responses:",

form.responses

);


setResponses(

form.responses || []

);

}

},[id]);


return(

<div className="formPage">


<h1

style={{

textAlign:"center",

marginBottom:"30px"

}}

>

Responses

</h1>



<div

style={{

display:"flex",

gap:"15px",

marginBottom:"30px"

}}

>


<input

className="formInput"

type="text"

placeholder="Search responses"

value={search}

onChange={(e)=>setSearch(e.target.value)}

/>



<select

className="formInput"

style={{maxWidth:"220px"}}

value={filter}

onChange={(e)=>setFilter(e.target.value)}

>

<option value="all">

All

</option>

<option value="latest">

Latest First

</option>

<option value="oldest">

Oldest First

</option>

</select>


</div>





{

responses.length===0


?


<p>

No responses yet

</p>


:



responses


.filter(

(response)=>

JSON.stringify(response)

.toLowerCase()

.includes(

search.toLowerCase()

)

)



.sort(

(a,b)=>{


if(filter==="latest")

{

return new Date(b.submittedAt)

-

new Date(a.submittedAt);

}



if(filter==="oldest")

{

return new Date(a.submittedAt)

-

new Date(b.submittedAt);

}


return 0;


}

)



.map(


(response,index)=>(



<div


className="formCard"


key={index}

>



<h2>

Response {index+1}

</h2>



<p>

Submitted :

{

response.submittedAt

||

"Unknown"

}

</p>



<hr/>

<br/>



{

Object.entries(

response

)

.map(

([key,value])=>(



<div key={key}>


<h4>

{

key

}

</h4>



{

Array.isArray(value)


?


value.map(

(item,i)=>(

<p key={i}>

• {item}

</p>

)

)



:


<p>

{

value

}

</p>

}



<br/>


</div>


)


)


}



<button


className="deleteBtn"


onClick={()=>{


let choice=

window.confirm(

"Delete this response?"

);


if(choice)

{

handleDelete(

index

);

}


}}

>


Delete


</button>




</div>



)


)



}



</div>

);




}


export default Responses;
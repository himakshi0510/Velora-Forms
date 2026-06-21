import {supabase}

from "../supabase/supabase";
import { useNavigate } from "react-router-dom";
import {useParams} from "react-router-dom";
import {useState,useEffect} from "react";
import { useToast } from "../context/ToastContext";

function Responses()
{

const navigate = useNavigate();

const {id}=useParams();

const [responses,setResponses]=useState([]);

const [search,setSearch]=useState("");

const [filter,setFilter]=useState("all");

const { showToast } = useToast();

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



const handleDelete = async(responseId)=>{

const {

error

}

=

await supabase

.from(

"responses"

)

.delete()

.eq(

"id",

responseId

);



if(error)
{

console.log(error);

return;

}



setResponses(

responses.filter(

r=>r.id!==responseId

)

);



showToast(

"✔ Response deleted successfully"

);


};


useEffect(()=>{

checkUser();

fetchResponses();

},[id]);


const fetchResponses = async()=>{


const {

data,

error

}

=


await supabase

.from(

"responses"

)

.select(

"*"

)

.eq(

"form_id",

id

)

.order(

"submitted_at",

{

ascending:false

}

);



if(error)
{

console.log(error);

return;

}




setResponses(

data

||

[]

);



};


const exportCSV = ()=>{


let csv =

"Submitted At,";


if(responses.length===0)
{

return;

}



Object.keys(

responses[0].answers

)

.forEach(

key=>{

csv +=

key +

",";

}

);


csv += "\n";



responses.forEach(

response=>{


csv +=

new Date(

response.submitted_at

)

.toLocaleString(

"en-IN",

{

timeZone:

"Asia/Kolkata"

}

)

+

",";



Object.values(

response.answers

)

.forEach(

value=>{


csv +=


'"'+value+'"'


+


",";


});


csv += "\n";


}

);



const blob =

new Blob(

[

csv

],

{

type:

"text/csv"

}

);


const url = URL.createObjectURL(

blob

);



const a = document.createElement(

"a"

);



a.href = url;



a.download = "responses.csv";



a.click();



URL.revokeObjectURL(

url

);


showToast(

"CSV Downloaded"

);


};

return(

<div className="formPage">


<p

style={{

textAlign:"center",

marginBottom:"30px",

color:"#64748b"

}}

>

{

responses.length

}

Responses Found


</p>



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

responses.length>0

&&

(

<button

className="saveBtn"

style={{


marginBottom:"25px"

}}

onClick={exportCSV}

>

Export CSV

</button>

)

}



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

JSON.stringify(

response.answers

)

.toLowerCase()

.includes(

search.toLowerCase()

)

)

.sort(

(a,b)=>{


if(filter==="oldest")

{

return new Date(

a.submitted_at

)

-

new Date(

b.submitted_at

);

}



return new Date(

b.submitted_at

)

-

new Date(

a.submitted_at

);


}

)


.map(


(response,index)=>(



<div


className="formCard"


key={response.id}

>

<h2>

Response #

{

responses.length-index

}

</h2>


<p>

Submitted :


{

response.submitted_at

?

new Date(

response.submitted_at

)

.toLocaleString(

"en-IN",

{

timeZone:

"Asia/Kolkata"

}

)

:

"Unknown"

}


</p>



<hr/>

<br/>



{

Object.entries(

response.answers

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

response.id

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
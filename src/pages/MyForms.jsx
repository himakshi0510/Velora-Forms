import {supabase}

from "../supabase/supabase";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext";

function MyForms() {

    const navigate = useNavigate();

    const [forms, setForms] = useState([]);

    const checkUser = async()=>{


const {

data:{user}

}

=

await supabase.auth.getUser();

if(!user)
{
return;
}

if(!user)
{

navigate(

"/profile"

);

return;

}


};


useEffect(()=>{


checkUser();

fetchForms();


},[]);  


const [

responses,

setResponses

]

=

useState(

[]

);


const fetchForms = async()=>{

const {

data:{user}

}

=

await supabase.auth.getUser();



const {

data,

error

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

)

.order(

"created_at",

{

ascending:false

}

);


if(error)
{

console.log(

error

);

return;

}


setForms(

data

||

[]

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


setResponses(

responsesData

||

[]

);



};

    const { showToast } = useToast();

const handleDelete = async(id)=>{

const {error} = await supabase

.from(

"forms"

)

.delete()

.eq(

"id",

id

);


if(error)
{

console.log(error);

return;

}


setForms(

forms.filter(

form=>form.id!==id

)

);


showToast(

"✔ Form deleted successfully"

);

};

    const [search,setSearch]=useState("");

    let filteredForms = forms.filter(

(form)=>

form.title.toLowerCase()

.includes(

search.toLowerCase()

)

);

  
const handleDuplicate = async(form)=>{


const {

data:{user}

}

=

await supabase.auth.getUser();

const copy = {

id:

crypto.randomUUID(),

title:

form.title +

" Copy",

fields:

form.fields,

user_id:

user.id,

created_at:

new Date()

.toISOString()

};

const {

error

}

=

await supabase

.from(

"forms"

)

.insert(

copy

);



if(error)
{

console.log(error);

return;

}



fetchForms();



showToast(

"✔ Form duplicated"

);


};


    return(

<div className="formPage">


<input

className="formInput"

type="text"

placeholder="Search forms..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

/>


<br/>

<br/>


<h1

style={{

textAlign:"center",

marginBottom:"30px"

}}

>

My Forms

</h1>



{

filteredForms.length===0


?


<p>

No forms saved yet

</p>


:


filteredForms.map(


(form)=>(


<div


className="formCard"


key={form.id}

>



<h2>

{

form.title

}

</h2>

<p
style={{
color:"#64748b",
fontSize:"14px"
}}
>

Created :

{

new Date(

form.created_at

)

.toLocaleDateString()

}

</p>



<p>

Fields :

{

form.fields.length

}

</p>

<p>

Responses :

<b>

{

responses.filter(

r=>r.form_id===form.id

)

.length

}

</b>

</p>

<br/>


<div

style={{

display:"flex",

gap:"12px",

flexWrap:"wrap"

}}

>



<button

className="saveBtn"

onClick={()=>navigate(

"/create",

{

state:form

}

)}

>

Edit

</button>





<button

className="addBtn"

onClick={()=>navigate(

"/fill/"+

form.id

)}

>

Open

</button>





<button

className="saveBtn"

onClick={()=>navigate(

"/responses/"+

form.id

)}

>

Responses

</button>





<button

className="addBtn"

onClick={() => {

const link =

window.location.origin +

"/fill/" +

form.id;

navigator.clipboard.writeText(link)

.then(()=>{

showToast(

"✔ Link copied successfully"

);

})

.catch(()=>{

prompt(

"Copy this link",

link

);

});


alert(link);

showToast(

"✔ Link copied successfully"

);

}

}

>

Share

</button>





<button

className="resetBtn"

onClick={()=>handleDuplicate(form)}

>

Duplicate

</button>





<button

className="deleteBtn"

onClick={()=>{


let choice=

window.confirm(

"Delete this form?"

);


if(choice)

{

handleDelete(

form.id

);

}


}}

>

Delete

</button>




</div>



</div>


)


)



}



</div>

);

}


export default MyForms;
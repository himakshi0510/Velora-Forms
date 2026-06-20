import {supabase}

from "../supabase/supabase";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext";

function MyForms() {

    const navigate = useNavigate();

    const [forms, setForms] = useState([]);


    useEffect(()=>{


fetchForms();


},[]);



const fetchForms = async()=>{


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

);


};

    const { showToast } = useToast();


    const handleDelete = (id) => {

        let updatedForms = forms.filter(

            form => form.id !== id

        );


        setForms(updatedForms);


        localStorage.setItem(

            "forms",

            JSON.stringify(updatedForms)

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

    const handleDuplicate=(form)=>{

let copy={

...form,

id:crypto.randomUUID(),

title:

form.title+

" Copy"

};


let updated=[

...forms,

copy

];


setForms(updated);


localStorage.setItem(

"forms",

JSON.stringify(updated)

);


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



<p>

Fields :

{

form.fields.length

}

</p>



<p>

Responses :

{

form.responses?.length

||

0

}

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

onClick={()=>{


navigator.clipboard.writeText(

window.location.origin+

"/fill/"+

form.id

);


showToast(

"✔ Link copied"

);


}}

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
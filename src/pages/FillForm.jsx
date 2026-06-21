import { supabase } from "../supabase/supabase";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useToast } from "../context/ToastContext";

function FillForm() {

    // ==========================
    // States
    // ==========================

    const { id } = useParams();

    const navigate = useNavigate();

    const [form, setForm] = useState(null);

    const [answers, setAnswers] = useState({});

    const [loading, setLoading] = useState(true);

    const { showToast } = useToast();



    // ==========================
    // Load Form
    // ==========================

useEffect(()=>{

fetchForm();

},[id]);


const fetchForm = async()=>{


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

"id",

id

)

.single();



if(error)
{

console.log(error);

setLoading(false);

return;

}



setForm(

data

);



setLoading(

false

);


};


    // ==========================
    // Handlers
    // ==========================

    const handleChange = (label, value) => {

        setAnswers(

            {

                ...answers,

                [label]: value

            }

        );

    };




    const handleCheckboxChange = (

        label,

        option,

        checked

    ) => {



        let current =

            answers[label]

            ||

            [];



        if (checked)

        {

            current =

                [

                    ...current,

                    option

                ];

        }


        else

        {

            current =

                current.filter(

                    item =>

                        item !== option

                );

        }



        setAnswers(

            {

                ...answers,

                [label]: current

            }

        );


    };




    // ==========================
    // Submit
    // ==========================

const handleSubmit = async()=>{

for(let field of form.fields)
{

const value = answers[field.label];

if(field.required)
{

if(
!value
||
(Array.isArray(value) && value.length===0)
)
{

alert(

field.label +

" is required"

);

return;

}

}


if(field.type==="url" && value)
{

try{

new URL(value);

}

catch{

alert(

"Please enter a valid URL"

);

return;

}

}

for(let field of form.fields)
{

if(field.required)
{

const value = answers[field.label];

if(
!value
||
(Array.isArray(value) && value.length===0)
)
{

alert(

field.label +

" is required"

);

return;

}

}

}

}



const {error} = await supabase

.from(

"responses"

)

.insert(

{

id:

crypto.randomUUID(),

form_id:

id,

answers:

answers,

submitted_at:

new Date().toISOString()

}

);



if(error)
{

console.log(error);

alert(error.message);

return;

}



showToast(

"✔ Response submitted successfully"

);


navigate(

"/thanks"

);

};



    // ==========================
    // Render Fields
    // ==========================

const renderField = (field)=>{


if(field.type==="textarea")
{

return(

<textarea

className="formInput"

required={field.required}

onChange={(e)=>

handleChange(

field.label,

e.target.value

)

}

/>

);

}



if(field.type==="select")
{

return(

<select

className="formInput"

required={field.required}

onChange={(e)=>

handleChange(

field.label,

e.target.value

)

}

>

<option>

Choose option

</option>


{

(field.options||[])

.map(

(option,index)=>(

<option key={index}>

{option}

</option>

)

)

}


</select>

);

}



if(field.type==="radio")
{

return(

(field.options||[])

.map(

(option,index)=>(


<div

key={index}

style={{

marginTop:"10px"

}}

>


<input

type="radio"

name={field.label}

value={option}

onChange={(e)=>

handleChange(

field.label,

e.target.value

)

}

/>


&nbsp;


{option}


</div>


)

)

);

}



if(field.type==="checkbox")
{

return(

(field.options||[])

.map(

(option,index)=>(


<div

key={index}

style={{

marginTop:"10px"

}}

>


<input

type="checkbox"

checked={

(

answers[field.label]

||

[]

)

.includes(

option

)

}


onChange={(e)=>

handleCheckboxChange(

field.label,

option,

e.target.checked

)

}


/>


&nbsp;


{option}


</div>


)

)

);

}



if(field.type==="file")
{

return(

<input

className="formInput"

type="file"

required={field.required}

onChange={(e)=>

handleChange(

field.label,

e.target.files[0]?.name

)

}

/>

);

}



return(

<input

className="formInput"

type={field.type}

required={field.required}

onChange={(e)=>

handleChange(

field.label,

e.target.value

)

}

/>

);

};


    // ==========================
    // Loading
    // ==========================

    if (loading)

    {

        return (

            <h2>

                Loading...

            </h2>

        );

    }




    if (!form)

    {

        return (

            <h2>

                Form not found

            </h2>

        );

    }




    // ==========================
    // JSX
    // ==========================

return(

<div className="formPage">


<div className="formCard">


<h1

style={{

textAlign:"center",

marginBottom:"35px"

}}

>

{form.title}

</h1>



{

form.fields.map(

(field,index)=>(


<div

className="formSection"

key={index}

>


<h3>


{field.label}


{

field.required

&&


<span

style={{

color:"red"

}}

>

 *

</span>

}


</h3>



{

renderField(

field

)

}



</div>


)

)

}



<button

className="saveBtn"

style={{

width:"100%",

marginTop:"25px"

}}

onClick={handleSubmit}

>


Submit Response


</button>


</div>


</div>

);

}

export default FillForm;
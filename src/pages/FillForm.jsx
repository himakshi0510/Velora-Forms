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

    const handleSubmit = async () => {

    let filled = Object.values(

answers

)

.some(

value =>

Array.isArray(value)

?

value.length > 0

:

value

);



if(!filled)
{

alert(

"Please fill at least one field"

);

return;

}


    
        for(let field of form.fields)
{

if(field.type==="url")
{

let value = answers[field.label] || "";

try
{

new URL(value);

}

catch
{

alert(

"Please enter a valid URL"

);

return;

}

}

}


    const { error } = await supabase

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

new Date()

}

);


if(error)
{

console.log(error);

alert(error.message);

return;

}



        setAnswers(

            {}

        );



        alert(

            "✔ Response submitted successfully"

        );

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

    const renderField = (field) => {


        if (

            field.type === "textarea"

        )

        {

            return (

                <textarea


                    required={field.required}


                    onChange={(e) =>

                        handleChange(

                            field.label,

                            e.target.value

                        )

                    }


                />

            );

        }




        if (

            field.type === "select"

        )

        {

            return (

                <select


                    required={field.required}


                    onChange={(e) =>

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

                        (field.options || []).map(

                            (option, index) => (


                                <option

                                    key={index}

                                >

                                    {option}

                                </option>


                            )

                        )

                    }


                </select>

            );

        }




        if (

            field.type === "radio"

        )

        {

            return (

                (field.options || []).map(

                    (option, index) => (


                        <div key={index}>


                            <input


                                type="radio"


                                name={field.label}


                                value={option}


                                onChange={(e) =>

                                    handleChange(

                                        field.label,

                                        e.target.value

                                    )

                                }


                            />


                            {option}


                        </div>


                    )

                )

            );

        }




        if (

            field.type === "checkbox"

        )

        {

            return (

                (field.options || []).map(

                    (option, index) => (


                        <div

                            key={index}

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



                                onChange={(e) =>


                                    handleCheckboxChange(

                                        field.label,

                                        option,

                                        e.target.checked

                                    )


                                }


                            />



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

    return (

        <div>


            <h1>

                {form.title}

            </h1>



            {

                form.fields.map(

                    (field, index) => (


                        <div

                            key={index}

                        >


                            <label>

                                {field.label}

                            </label>


                            <br />


                            {

                                renderField(

                                    field

                                )

                            }


                            <br />

                            <br />


                        </div>


                    )

                )

            }




            <button

                onClick={handleSubmit}

            >

                Submit Response

            </button>


        </div>

    );

}

export default FillForm;
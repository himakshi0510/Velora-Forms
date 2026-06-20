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

    useEffect(() => {

        let forms =

            JSON.parse(

                localStorage.getItem("forms")

            )

            ||

            [];


        let foundForm =

            forms.find(

                form => form.id === id

            );


        setForm(

            foundForm

        );


        setLoading(

            false

        );



    }, [id]);




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

    const handleSubmit = () => {


        if (

            Object.keys(

                answers

            ).length === 0

        )

        {

            alert(

                "Please fill at least one field"

            );

            return;

        }



        let forms =

            JSON.parse(

                localStorage.getItem(

                    "forms"

                )

            )

            ||

            [];




        let updatedForms =

            forms.map(

                f => {


                    if (

                        f.id === id

                    )

                    {

                        return {


                            ...f,


                      responses:[

...(f.responses||[]),


{


...answers,


submittedAt:


new Date()

.toLocaleString()


}


]


                        };

                    }



                    return f;


                }

            );




        localStorage.setItem(

            "forms",

            JSON.stringify(

                updatedForms

            )

        );



        setAnswers(

            {}

        );



        alert(

            "✔ Response submitted successfully"

        );



        navigate(

            "/myforms"

        );

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

showToast(

"Please enter a valid URL"

);

return;

}

}

}


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


field.type==="file"

?

(

<input


type="file"


onChange={(e)=>

handleChange(

field.label,

e.target.files[0]?.name

)

}


/>

)

:

field.type==="file"

?

(

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

)

:

(

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

)


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
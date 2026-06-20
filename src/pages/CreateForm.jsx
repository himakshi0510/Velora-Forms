
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext";




function CreateForm() {

    // ============================
    // Navigation & Edit Mode
    // ============================

    const navigate = useNavigate();
    const location = useLocation();

    const editForm = location.state || null;


    // ============================
    // States
    // ============================

    const [title, setTitle] = useState(
        editForm?.title || ""
    );

    const [fieldLabel, setFieldLabel] = useState("");

    const [type, setType] = useState("text");

    const [required, setRequired] = useState(false);

    const [options, setOptions] = useState("");

    const [fields, setFields] = useState(
        editForm?.fields || []
    );

    const [editIndex, setEditIndex] = useState(null);

    const { showToast } = useToast();

    


    // ============================
    // Add / Update Field
    // ============================

    const handleAddField = () => {

        if (fieldLabel.trim() === "") {

            alert("Please enter field label");
            return;

        }


        let exists = fields.some(

            (field, index) =>

                index !== editIndex &&

                field.label.toLowerCase()

                ===

                fieldLabel.toLowerCase()

        );


        if (exists) {

            let choice = window.confirm(

                `You already used "${fieldLabel}" before.\n\nDo you want to use it again?`

            );

            if (!choice) return;

        }


        let optionList = [];

        if (

            type === "select"

            ||

            type === "radio"

            ||

            type === "checkbox"

        ) {

            optionList =

                options

                    .trim()

                    .split("\n")

                    .filter(

                        option => option.trim() !== ""

                    );



            if (optionList.length === 0) {

                alert(

                    "Please enter at least one option"

                );

                return;

            }

        }


        let newField = {

            label: fieldLabel,

            type: type,

            required: required,

            options: optionList

        };


        if (editIndex !== null) {

            let updatedFields = [...fields];

            updatedFields[editIndex] = newField;

            setFields(updatedFields);

            setEditIndex(null);

        }

        else {

            setFields(

                [...fields, newField]

            );

        }


        handleReset();

    };


    // ============================
    // Edit Field
    // ============================

    const handleEdit = (index) => {

        let field = fields[index];

        setFieldLabel(field.label);

        setType(field.type);

        setRequired(field.required);

        setOptions(

            field.options

                ?

                field.options.join("\n")

                :

                ""

        );

        setEditIndex(index);

    };


    // ============================
    // Delete Field
    // ============================

    const handleDelete = (index) => {

        let updatedFields =

            fields.filter(

                (_, i) => i !== index

            );

        setFields(updatedFields);

    };


    // ============================
    // Reset Current Field
    // ============================

    const handleReset = () => {

        setFieldLabel("");

        setType("text");

        setRequired(false);

        setOptions("");

        setEditIndex(null);

    };


    // ============================
    // Clear Entire Form
    // ============================

    const handleClearAll = () => {

        setTitle("");

        setFieldLabel("");

        setType("text");

        setRequired(false);

        setOptions("");

        setFields([]);

        setEditIndex(null);

    };


    // ============================
    // Save Form
    // ============================

    const handleSaveForm = () => {

        console.log("editForm :",editForm);


if(title.trim()==="")
{

alert(

"Please enter form title"

);

return;

}



if(fields.length===0)
{

alert(

"Please add at least one field"

);

return;

}



let form={

id:

editForm?.id

||

crypto.randomUUID(),

title,

fields,

responses:

editForm?.responses

||

[]

};



let savedForms=

JSON.parse(

localStorage.getItem(

"forms"

)

)

||

[];



if(editForm)
{


savedForms=savedForms.map(

(f)=>


f.id===editForm.id


?


form


:


f

);



showToast(

"✔ Form updated successfully"

);



localStorage.setItem(

"forms",

JSON.stringify(

savedForms

)

);



navigate(

"/myforms"

);


}



else
{


savedForms.unshift(

form

);



showToast(

"✔ Form saved successfully"

);



localStorage.setItem(

"forms",

JSON.stringify(

savedForms

)

);



navigate(

"/publish/"+

form.id

);


}



};


    // ============================
    // JSX
    // ============================

    return(

<div className="formPage">


<div className="formCard">


<h1

style={{

textAlign:"center",

marginBottom:"30px"

}}

>

Create Form

</h1>



<div className="formSection">

<h3>

Form Title

</h3>

<input

className="formInput"

type="text"

value={title}

onChange={(e)=>setTitle(e.target.value)}

/>

</div>




<div className="formSection">


<h3>

Field Label

</h3>


<input

className="formInput"

type="text"

value={fieldLabel}

onChange={(e)=>setFieldLabel(e.target.value)}

/>


</div>





<div className="formSection">


<h3>

Field Type

</h3>


<select

className="formInput"

value={type}

onChange={(e)=>setType(e.target.value)}

>


<option value="text">Text</option>

<option value="email">Email</option>

<option value="number">Number</option>

<option value="password">Password</option>

<option value="date">Date</option>

<option value="url">URL</option>

<option value="file">File</option>

<option value="textarea">Textarea</option>

<option value="radio">Radio</option>

<option value="checkbox">Checkbox</option>

<option value="select">Select</option>


</select>



</div>




<div

style={{

marginBottom:"25px"

}}

>


<label>


<input

type="checkbox"

checked={required}

onChange={(e)=>setRequired(e.target.checked)}

/>


&nbsp;

Required


</label>


</div>





{

(type==="select"

||

type==="radio"

||

type==="checkbox")

&&


<div className="formSection">


<h3>

Options

</h3>



<textarea

className="formInput"

rows="5"

placeholder="One option per line"

value={options}

onChange={(e)=>setOptions(e.target.value)}

/>


</div>

}



<div className="buttonRow">


<button

className="addBtn"

onClick={handleAddField}

>


{

editIndex!==null

?

"Update Field"

:

"Add Field"

}


</button>




<button

className="resetBtn"

onClick={handleReset}

>


Reset Field


</button>



</div>




<div className="formCard">


<h2>

Added Fields

(

{fields.length}

)

</h2>



{

fields.length===0

?


<p>

No fields added yet

</p>


:


fields.map(

(field,index)=>(


<div

className="fieldCard"

key={index}

>


<h3>

{

field.label

}

</h3>


<p>

Type :

{

field.type

}

</p>



{

field.required

&&


<p>

✓ Required

</p>

}




{

field.options?.length>0

&&


field.options.map(

(option,i)=>(


<p key={i}>


•


{

option

}


</p>

)

)

}



<br/>


<button

className="saveBtn"

onClick={()=>handleEdit(index)}

>


Edit


</button>



&nbsp;



<button

className="deleteBtn"

onClick={()=>handleDelete(index)}

>


Delete


</button>



</div>


)

)


}



</div>


<div
style={{
display:"flex",
justifyContent:"flex-end",
gap:"20px",
marginTop:"25px"
}}
>

<button

className="deleteBtn smallBtn"

onClick={handleClearAll}

>

Clear All

</button>



<button

className="saveBtn smallBtn"

onClick={handleSaveForm}

>

{

editForm

?

"Update Form"

:

"Save Form"

}

</button>


</div>



</div>



</div>

);

}

export default CreateForm;



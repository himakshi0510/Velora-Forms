import {useState,useEffect}

from "react";

import {supabase}

from "../supabase/supabase";

function Notifications()
{

const [notifications,setNotifications] = useState([]);

useEffect(()=>{

fetchNotifications();

},[]);


const fetchNotifications = async()=>{

const {

data:responses

}

=

await supabase

.from("responses")

.select("*");


const {

data:{user}

}

=

await supabase.auth.getUser();



const {

data:forms

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

);

const myFormIds =

(

forms

||

[]

)

.map(

form=>form.id

);



const result =

(

responses

||

[]

)

.filter(

response=>

myFormIds.includes(

response.form_id

)

)

.map(

response=>{


const form = forms.find(

f=>f.id===response.form_id

);



return{

title:

form?.title

||

"Untitled Form",


time:

response.submitted_at

};


}

);


result.sort(

(a,b)=>

new Date(

b.time

)

-

new Date(

a.time

)

);

setNotifications(

result

);

};



return(

<div className="formPage">


<h1

style={{

textAlign:"center",

marginBottom:"35px"

}}

>

Notifications

</h1>



{

notifications.length===0


?


(


<div className="formCard">


<h2>

No notifications yet

</h2>


<p>

Responses will appear here.

</p>


</div>


)



:


(


notifications.map(


(notification,index)=>(



<div


className="formCard"


key={

notification.time

+
index

}

>



<h3>

{

notification.title

||

"Untitled Form"

}

</h3>


<p

style={{

color:"#14b8a6",

fontWeight:"600"

}}

>

New response received

</p>



<p

style={{

marginTop:"10px",

color:"#64748b"

}}

>


{

notification.time

?

new Date(

notification.time

)

.toLocaleString()

:

"Unknown"

}


</p>



</div>



)


)



)



}



</div>

);


}


export default Notifications;
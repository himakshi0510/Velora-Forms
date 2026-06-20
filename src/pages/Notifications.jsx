function Notifications()
{

const forms =

JSON.parse(

localStorage.getItem(

"forms"

)

)

||

[];


let notifications = [];


forms.forEach(

form=>{

form.responses?.forEach(

response=>{


notifications.push(

{

title:

form.title,


time:

response.submittedAt

}

);


}


);


}


);



notifications.reverse();


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


key={index}

>



<h3>

{

notification.title

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
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {

auth

}

from "../firebase/firebase";

import {

GoogleAuthProvider,

signInWithPopup,

signOut

}

from "firebase/auth";

import {

useState

}

from "react";


function Profile()
{

const [

user,

setUser

]

=

useState(

auth.currentUser

);


useEffect(()=>{

const unsubscribe = onAuthStateChanged(

auth,

(currentUser)=>{

setUser(

currentUser

);

}

);


return ()=>unsubscribe();

},[]);



const handleLogin = async()=>{


const provider =

new GoogleAuthProvider();



try{


const result =

await signInWithPopup(

auth,

provider

);



setUser(

result.user

);


}


catch(error){


console.log(

error

);


}


};



const handleLogout = ()=>{


signOut(

auth

);



setUser(

null

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

Profile

</h1>



<div

className="formCard"

style={{

textAlign:"center"

}}

>


{

user


?


(



<>



<img

src={

user.photoURL

}


style={{

width:"120px",

height:"120px",

borderRadius:"50%",

marginBottom:"20px"

}}

/>



<h2>

{

user.displayName

}

</h2>



<p

style={{

color:"#64748b",

marginTop:"10px",

marginBottom:"25px"

}}

>

{

user.email

}

</p>




<button

className="deleteBtn"

onClick={

handleLogout

}

>


Logout


</button>



</>



)



:


(



<>



<h2>

Welcome

</h2>


<p

style={{

marginBottom:"25px"

}}

>

Sign in to continue

</p>



<button

className="saveBtn"

onClick={

handleLogin

}

>

Sign in with Google

</button>



</>



)



}



</div>


</div>

)



}


export default Profile;
import { useEffect, useState } from "react";
import { supabase } from "../supabase/supabase";

function Profile() {

const [user,setUser] = useState(null);

const [loading,setLoading] = useState(true);



useEffect(()=>{

checkUser();


const {

data:{subscription}

}

=

supabase.auth.onAuthStateChange(

(event,session)=>{

setUser(

session?.user

||

null

);

}

);


return ()=>subscription.unsubscribe();


},[]);



const checkUser = async()=>{


const {

data:{user}

}

=

await supabase.auth.getUser();



setUser(

user

||

null

);



setLoading(false);


};




const handleLogin = async()=>{


await supabase.auth.signInWithOAuth(

{

provider:"google"

}

);


};




const handleLogout = async()=>{


await supabase.auth.signOut();



setUser(null);


};



if(loading)
{

return(

<h2>

Loading...

</h2>

);

}



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

user.user_metadata?.picture

||

user.user_metadata?.avatar_url

}


alt="Profile"


style={{

width:"120px",

height:"120px",

borderRadius:"50%",

marginBottom:"20px"

}}


/>



<h2>

{

user.user_metadata?.full_name

||

user.user_metadata?.name

||

"User"

}

</h2>



<p

style={{

marginTop:"10px",

marginBottom:"25px",

color:"#64748b"

}}

>

{

user.email

}

</p>



<button

className="deleteBtn"

onClick={handleLogout}

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

onClick={handleLogin}

>

Sign in with Google

</button>


</>


)


}



</div>


</div>

);


}


export default Profile;
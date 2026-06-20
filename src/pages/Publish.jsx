import { useParams, useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";

function Publish()
{

const {id} = useParams();

const navigate = useNavigate();

const link =

window.location.origin+

"/fill/"+

id;


return(

<div className="publishPage">


<div className="formCard">


<h1

style={{

textAlign:"center",

marginBottom:"30px"

}}

>

Form Published Successfully

</h1>



<div

style={{

display:"flex",

justifyContent:"center",

marginBottom:"25px"

}}

>

<QRCode

value={link}

size={180}

/>

</div>



<p

style={{

fontWeight:"600",

marginBottom:"10px"

}}

>

Share this link

</p>



<input

value={link}

readOnly

style={{

width:"100%",

padding:"14px",

borderRadius:"10px",

border:"1px solid #cbd5e1"

}}

>



</input>


<br/>
<br/>



<div

style={{

display:"flex",

gap:"15px",

flexWrap:"wrap"

}}

>


<button

className="primaryBtn"

onClick={()=>{

navigator.clipboard.writeText(link);

alert("Copied!");

}}

>

Copy Link

</button>




<button

className="primaryBtn"

onClick={()=>window.open(link)}

>

Open Form

</button>




<button

className="secondaryBtn"

onClick={()=>navigate("/myforms")}

>

My Forms

</button>




<button

className="secondaryBtn"

onClick={()=>navigate("/")}

>

Dashboard

</button>


</div>



</div>


</div>

);


}


export default Publish;
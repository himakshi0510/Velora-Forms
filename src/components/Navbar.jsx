import { Link } from "react-router-dom";

function Navbar()
{

return(

<div>

<Link to="/">

Home

</Link>


&nbsp;&nbsp;


<Link to="/create">

Create Form

</Link>


&nbsp;&nbsp;


<Link to="/myforms">

My Forms

</Link>


</div>

);

}

export default Navbar;
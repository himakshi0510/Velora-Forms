import { Link } from "react-router-dom";
function Home()
{
    return(

        <div>

            <h1>Dynamic Form Builder</h1>

            <p>
                Create custom forms in minutes.
                Share them instantly and collect responses seamlessly.
            </p>

            <Link to="/create">
            <button>Create Form</button>
            </Link>

            <Link to="/myforms">
            <button>My Forms</button>
            </Link>

            <Link to="/responses">
            <button>Responses</button>
            </Link>

        </div>

    );
}

export default Home;
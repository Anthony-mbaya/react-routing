import {useRouteError} from "react-router-dom";

export default function ErrorPage(){
    const error = useRouteError();
    console.error(error);
    return(
        <div id="error-page">
            <h1>Something went wrong</h1>
            <p>mf solve e error</p>
            <p>{error.statusText || error.message}</p>
        </div>
    )
}
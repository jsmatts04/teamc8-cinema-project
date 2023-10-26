import {Link} from 'react-router-dom'
import Button from 'react-bootstrap/Button'

function ErrorPage() {
    return (
        <>
        <h1 style={{color:'white', textAlign:'center'}}>Oops, nothing here!</h1>
        <div style={{textAlign:'center'}}> <Link to='/' style={{textAlign:'center'}}><Button variant='warning'>Return to Home</Button></Link>
        </div>
        </>
    );

}

export default ErrorPage;
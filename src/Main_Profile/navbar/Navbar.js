import './Navbar.css'

export default function Navbar(props) {

    return (
        <nav className="navbar">
            <h1>Profile</h1>
            <button  className='about-page' onClick={() => props.changePage('about')}>About</button>
            <button  className='projects-page'onClick={() => props.changePage('projects')}>Projects</button>
        </nav>
    )
}


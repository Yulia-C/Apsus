import { showSuccessMsg } from '../services/event-bus.service.js'
const { Link, NavLink } = ReactRouterDOM

export function Home() {
    return (

        <section className="home-container ">

            <p className="p-welcome">
                Welcome to APSUS <br />
                Your all-in-one personal productivity space. <br />
                Stay organized, focused, and connected with <br />
                two powerful tools:<br />
            </p>

            <div className="box-container">

                <section className="mail-card flex column align-center">
                    <h1> APSUS Mail</h1>
                    <p>
                        Manage your emails with ease.
                        Compose, read, and organize your messages.
                        Enjoy a simple, fast, and intuitive interface.
                    </p>
                    <img className="mail-logo" src="assets/img/gmail.svg" title="mail" />
                    <NavLink to="/mail">
                        <button>Go</button>
                    </NavLink>
                </section>

                <section className="note-card flex column align-center">
                    <h1>APSUS Keep</h1>
                    <p>
                        Create text notes with colors and tags.
                        Pin important notes to keep on top.
                        Easily search and manage your thoughts
                    </p>
                    <img className="note-logo" src="assets/img/keep.svg" title="keep" />
                    <NavLink to="/note">
                        <button>Go</button>
                    </NavLink>
                </section>
            </div>

        
            {/* {/* <button onClick={() => showSuccessMsg('Yep, that works')}>Show Msg</button> */}
        </section >
    )
}

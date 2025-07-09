
export function About() {
    return <section className="about-container">
        {/* <section className="flex  column align-center"> */}

        <h1> Our Team </h1>
        <div className="about-box flex space-between">

            <div className="about-card">
                <h1>Yulia Chernyak</h1>
                <img src="assets/img/yulia.png" alt="Yulia Chernyak" title="Yulia Chernyak" />
                <p>
                    Fullstack development student in Coding Academy with a keen eye for detail
                    and user experience.
                </p>
                <p> - Apsus Mail app -</p>
                <a
                    href="https://github.com/Yulia-C"
                    target="_blank"
                    title="go to github"
                >
                    <img className="git-logo" src="assets/img/github.png" title="git link" alt="git logo" />
                </a>
            </div>

            <div className="about-card">
                <h1>Andrei Yakerson</h1>
                <img src="assets/img/andrey.png" alt="Andrei Yakerson" title="Andrei Yakerson" />
                <p>
                    I am a full stack development student who enjoys solving
                    problems through clean and
                    efficient code.
                </p>
                <p> - Apsus Keep app -</p>

                <a
                    href="https://github.com/AndreiYakerson"
                    target="_blank"
                    title="go to github"
                >
                    <img className="git-logo" src="assets/img/github.png" title="git link" alt="git logo" />
                </a>
            </div>
        </div>
    </section>
    // </section>
}

const { Route, Routes } = ReactRouterDOM
const { Fragment } = React
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from './cmps/AppHeader.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'
import { About } from './pages/About.jsx'
import { Home } from './pages/Home.jsx'
import { MailIndex } from './apps/mail/pages/MailIndex.jsx'
import { NoteIndex } from './apps/note/pages/NoteIndex.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'

export function RootCmp() {
    return <Router>
        <section className="root-cmp">
            <AppHeader />
            <Fragment>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/mail" element={<MailIndex />} />
                    <Route path="/mail/:mailId" element={<MailIndex />} />
                    <Route path="/note" element={<NoteIndex />} />
                </Routes>
            </Fragment>
            <AppFooter />
            <UserMsg />
        </section>
    </Router>
}

import { MailPreview } from "./MailPreview.jsx"
const { useState, useEffect, Fragment } = React
const { Link, useLocation } = ReactRouterDOM

export function MailList({ mails }) {

    return (
        <table key={mails.length}className="mail-list">
            <tbody>
                {mails.map((mail) => (
                    <MailPreview key={mail.id} mail={mail}/>
                ))}
            </tbody>
        </table>)
}

import { MailPreview } from "./MailPreview.jsx"

export function MailList({ mails }) {
    return (<section className="mail-list">Mail list
        <MailPreview />
    </section>)
}

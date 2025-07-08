import { mailService } from "../services/mail.service.js"
import { showSuccessMsg, showErrorMsg } from "../../../services/event-bus.service.js"
const { useState, useEffect } = React

export function MailEdit({ isModalOpen, onCloseModal }) {

    const [mailToEdit, setMailToEdit] = useState(mailService.getEmptyMail())

    useEffect(() => {
        if (isModalOpen) {
            setMailToEdit(mailService.getEmptyMail())
        }
    }, [isModalOpen])

    function onSendMail(ev) {
        ev.preventDefault()
        const { id, ...mailWithoutId } = mailToEdit
        const timedMail = {
            ...mailWithoutId,
            sentAt: Date.now(),
            status: ['sent'],
            isRead: null,
        }

        mailService.save(timedMail)
            .then(() => {
                showSuccessMsg('Mail sent successfully!')
                onCloseModal()
            })
            .catch(err => {
                console.error('Error:', err)
                showErrorMsg('Had problem sending mail...')
            })
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        if (target.type === 'checkbox') value = target.checked
        else if (target.type === 'range') value = +value

        setMailToEdit(prevMail => ({ ...prevMail, [field]: value }))
    }

    const { to, subject, body } = mailToEdit
    if (!isModalOpen) return null

    return (
              <div className={`${isModalOpen ? 'open' : ''} compose-modal`}>

         <form onSubmit={onSendMail}>
             <div className="compose-header flex space-between align-center">
                 <p>New Message</p>
             </div>
             <button onClick={onCloseModal} type="button" className="close-btn">X</button>
             <label className="label-to" htmlFor="to">To:</label>
             <input onChange={handleChange} className="input-to" value={to} type="text" id="to" name="to" required />

             <label className="label-sub" htmlFor="subject">Subject</label>
             <input onChange={handleChange} className="input-sub flex align-center" value={subject} type="text" id="subject" name="subject" required/>
             <textarea onChange={handleChange} className="compose-body" value={body} type="text" id="body" name="body" required/>

             <button type="submit" className="send-btn">Send</button>
         </form>
     </div>
       
    )
}
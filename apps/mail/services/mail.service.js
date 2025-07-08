// mail service
import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'
import { makeId } from '../../../services/util.service.js'

const MAIL_KEY = 'mailDB'
_createMails()
// console.log('mails:', mails)

export const mailService = {
    query,
    get,
    remove,
    save,
    getEmptyMail,
    getLoggedInUser,
    getDefaultFilter,
    getFilterFromSearchParams,
    moveToTrash,
    moveToDraft,
    getMailCategories,

}

function query(filterBy = {}) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                mails = mails.filter(mail =>
                    regExp.test(mail.subject)
                    || regExp.test(mail.body)
                    || regExp.test(mail.from))
            }

            if (filterBy.sentAt) {
                mails = mails.sort((mailA, mailB) => {
                    return mailB.sentAt - mailA.sentAt
                })
            }

            if (typeof filterBy.isRead === 'boolean') {
                mails = mails.filter(mail => mail.isRead === filterBy.isRead)
            }

            if (typeof filterBy.isStarred === 'boolean') {
                mails = mails.filter(mail => mail.isStarred === filterBy.isStarred)
            }
            return mails
        })
}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId).then(mail => {
        mail = _setNextPrevMailId(mail)
        return mail
    })
}

function remove(mailId) {
    // return Promise.reject('Oh No!')
    return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    } else {
        return storageService.post(MAIL_KEY, mail)
    }
}

function getEmptyMail() {
    const mail = {
        id: utilService.makeId(),
        createdAt: Date.now(),
        subject: '',
        body: '',
        isRead: Math.random() > 0.7,
        isStarred: Math.random() > 0.7,
        status: [],
        isChecked: false,
        sentAt: null,
        removedAt: null,
        from: 'user@appsus.com',
        to: ''
    }
    return mail
}

function getMailCategories() {
   return storageService.query(MAIL_KEY)
        .then(mails =>{
            return [...new Set(mails.flatMap(mail => mail.status))]
        })
        
}

function getDefaultFilter() {
    return {
        txt: '', isStarred: null, isRead: null, isChecked: null, sentAt: null,
        status: [],
        // 'inbox/sent/trash/draft'
    }
}

function moveToTrash(mailId) {
    return storageService.get(MAIL_KEY, mailId).then(mail => {
        mail = { ...mail, status: ['trash'] }
        return mail
    })
}

function moveToDraft(mailId) {
    return storageService.get(MAIL_KEY, mailId).then(mail => {
        mail = { ...mail, status: ['draft'] }
        return mail
    })
}

function getFilterFromSearchParams(searchParams) {

    const txt = searchParams.get('txt') || ''
    const sentAt = searchParams.get('sentAt') || ''
    const isStarred = searchParams.get('isStarred') || ''
    const isRead = searchParams.get('isRead') || ''
    const isChecked = searchParams.get('isChecked') || ''
    const status = searchParams.getAll("status") || ''

    return {
        txt,
        sentAt,
        isStarred,
        isRead,
        isChecked,
        status
    }
}

function getLoggedInUser() {
    return {
        email: 'user@appsus.com',
        fullname: 'Yulia Appsus'
    }
}

function _createMails() {
    let mails = utilService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = [
            {
                id: 'e101',
                createdAt: 1717332000000, // 2024-06-02 12:00:00
                subject: 'Miss you!',
                body: `Would love to catch up sometime. It’s 
                been too long since we last spoke. 
                Let’s find a time that works for both of us. 
                Hope all is well on your end.`,
                isRead: Math.random() > 0.7,
                isStarred: Math.random() > 0.7,
                status: ['inbox'],
                isChecked: false,
                sentAt: 1717332180000, // 2024-06-02 12:03:00
                removedAt: null,
                from: 'momo@momo.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e102',
                createdAt: 1715436000000, // 2024-05-11 10:00:00
                subject: 'Project Update',
                body: `The project is on track for next week.
                All major milestones have been completed, and final QA is underway.
                I’ll send out a progress report tomorrow.
                Let me know if you have any last-minute concerns.`,
                isRead: Math.random() > 0.7,
                isStarred: Math.random() > 0.7,
                status: ['inbox'],
                isChecked: false,
                sentAt: 1715436240000, // 2024-05-11 10:04:00
                removedAt: null,
                from: 'alice@work.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e103',
                createdAt: 1713705600000, // 2024-04-21 00:00:00
                subject: 'Invitation',
                body: `You are invited to our annual event. We’re excited to bring everyone 
                together for an evening of networking and celebration. Formal invitations will follow soon.
                 Please mark your calendar and save the date.`,
                isRead: Math.random() > 0.7,
                isStarred: Math.random() > 0.7,
                status: ['inbox'],
                isChecked: false,
                sentAt: 1713705780000, // 2024-04-21 00:03:00
                removedAt: null,
                from: 'events@company.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e104',
                createdAt: 1719484800000, // 2024-07-28 00:00:00
                subject: 'Sale Alert!',
                body: `Don\'t miss our summer sale. Exclusive discounts are available 
                this week only, both online and in-store. Shop now to grab your favorites 
                before they’re gone. Offer ends Sunday at midnight.`,
                isRead: Math.random() > 0.7,
                isStarred: Math.random() > 0.7,
                status: ['inbox'],
                isChecked: false,
                sentAt: 1719485100000, // 2024-07-28 00:05:00
                removedAt: null,
                from: 'sales@shop.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e105',
                createdAt: 1718284800000, // 2024-06-13 00:00:00
                subject: 'Your Invoice',
                body: `Please find attached your invoice. It includes a breakdown of all
                 recent charges and payment details. Let us know if you have any questions 
                 or need assistance. Thank you for your continued business.`,
                isRead: Math.random() > 0.7,
                isStarred: Math.random() > 0.7,
                status: ['inbox'],
                isChecked: false,
                sentAt: 1718284980000, // 2024-06-13 00:03:00
                removedAt: null,
                from: 'billing@service.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e106',
                createdAt: 1715954400000, // 2024-05-17 12:00:00
                subject: 'Weekly Newsletter',
                body: `Here is your weekly newsletter. We’ve rounded up the latest updates, 
                tips, and highlights just for you. Be sure to check out our featured article 
                of the week. As always, we love hearing your feedback.`,
                isRead: Math.random() > 0.7,
                isStarred: Math.random() > 0.7,
                status: ['inbox'],
                isChecked: false,
                sentAt: 1715954700000, // 2024-05-17 12:05:00
                removedAt: null,
                from: 'newsletter@news.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e107',
                createdAt: 1714579200000, // 2024-05-01 00:00:00
                subject: 'Appointment Reminder',
                body: `Your appointment is scheduled for tomorrow. Please arrive 10 
                minutes early and bring any relevant documents. If you need to reschedule,
                 contact us today. We look forward to seeing you.`,
                isRead: Math.random() > 0.7,
                isStarred: Math.random() > 0.7,
                status: ['inbox'],
                isChecked: false,
                sentAt: 1714579500000, // 2024-05-01 00:05:00
                removedAt: null,
                from: 'appointments@clinic.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e108',
                createdAt: 1717843200000, // 2024-06-08 00:00:00
                subject: 'Flight Confirmation',
                body: `Your flight has been booked. You’ll receive your itinerary and 
                boarding pass shortly via email. Please review the travel details to ensure
                 accuracy. Safe travels and let us know if you need assistance.`,
                isRead: Math.random() > 0.7,
                isStarred: Math.random() > 0.7,
                status: ['inbox'],
                isChecked: false,
                sentAt: 1717843440000, // 2024-06-08 00:04:00
                removedAt: null,
                from: 'flights@airline.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e109',
                createdAt: 1716643200000, // 2024-05-25 00:00:00
                subject: 'Password Reset',
                body: `Click here to reset your password. This link will expire in 15 minutes for 
                your security. If you didn’t request a password reset, please ignore this message. 
                Need help? Contact support any time.`,
                isRead: Math.random() > 0.7,
                isStarred: Math.random() > 0.7,
                status: ['inbox'],
                isChecked: false,
                sentAt: 1716643500000, // 2024-05-25 00:05:00
                removedAt: null,
                from: 'support@web.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e110',
                createdAt: 1719062400000, // 2024-07-23 00:00:00
                subject: 'Welcome!',
                body: `Thanks for signing up! You’re now part of our community and will start 
                receiving updates and exclusive offers. Be sure to check your inbox for a welcome 
                message. We’re glad to have you with us.`,
                isRead: Math.random() > 0.7,
                isStarred: Math.random() > 0.7,
                status: ['inbox'],
                isChecked: false,
                sentAt: 1719062580000, // 2024-07-23 00:03:00
                removedAt: null,
                from: 'welcome@service.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e111',
                createdAt: 1714915200000, // 2024-05-05 00:00:00
                subject: 'Job Application',
                body: `We have received your application. Our team is currently reviewing 
                it and will reach out with next steps soon. Thank you for your interest in 
                joining us. We appreciate the time you took to apply.`,
                isRead: Math.random() > 0.7,
                isStarred: Math.random() > 0.7,
                status: ['inbox'],
                isChecked: false,
                sentAt: 1714915500000, // 2024-05-05 00:05:00
                removedAt: null,
                from: 'hr@company.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e112',
                createdAt: 1718198400000, // 2024-06-12 00:00:00
                subject: 'Order Shipped',
                body: `Your order is on its way. You can track its progress using the
                 link below. Delivery is expected within 3–5 business days. We hope you 
                 enjoy your purchase!`,
                isRead: Math.random() > 0.7,
                isStarred: Math.random() > 0.7,
                status: ['inbox'],
                isChecked: false,
                sentAt: 1718198580000, // 2024-06-12 00:03:00
                removedAt: null,
                from: 'orders@shop.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e113',
                createdAt: 1717335600000, // 2024-06-02 13:00:00
                subject: 'Feedback Request',
                body: `Please let us know how we did. Your feedback helps us improve 
                and provide better service. It only takes a minute to complete our short survey. 
                Thank you for your time and support.`,
                isRead: Math.random() > 0.7,
                isStarred: Math.random() > 0.7,
                status: ['inbox'],
                isChecked: false,
                sentAt: 1717335900000, // 2024-06-02 13:05:00
                removedAt: null,
                from: 'feedback@service.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e114',
                createdAt: 1715958000000, // 2024-05-17 13:00:00
                subject: 'Subscription Expiring',
                body: `Your subscription will expire soon. Renew now to continue 
                enjoying uninterrupted access. We’ve included a few renewal options 
                for your convenience. Don’t miss out on your benefits.`,
                isRead: Math.random() > 0.7,
                isStarred: Math.random() > 0.7,
                status: ['inbox'],
                isChecked: false,
                sentAt: 1715958180000, // 2024-05-17 13:03:00
                removedAt: null,
                from: 'subscriptions@service.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e115',
                createdAt: 1713709200000, // 2024-04-21 01:00:00
                subject: 'Event Reminder',
                body: `Don\'t forget the event tomorrow. We’ve got a great agenda 
                planned and can’t wait to see you there. Please bring your confirmation 
                email for check-in. Let us know if you have any questions beforehand.`,
                isRead: Math.random() > 0.7,
                isStarred: Math.random() > 0.7,
                status: ['inbox'],
                isChecked: false,
                sentAt: 1713709500000, // 2024-04-21 01:05:00
                removedAt: null,
                from: 'events@calendar.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e116',
                createdAt: 1719488400000, // 2024-07-28 01:00:00
                subject: 'Security Alert',
                body: `A new login to your account was detected. If this was you, no 
                further action is needed. If not, please change your password immediately.
                 Security is our top priority.`,
                isRead: Math.random() > 0.7,
                isStarred: Math.random() > 0.7,
                status: ['inbox'],
                isChecked: false,
                sentAt: 1719488580000, // 2024-07-28 01:03:00
                removedAt: null,
                from: 'security@web.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e117',
                createdAt: 1718288400000, // 2024-06-13 01:00:00
                subject: 'Payment Received',
                body: `Your payment has been processed. You will receive a confirmation 
                receipt shortly via email. If you have any billing concerns, feel free to 
                reach out. Thank you for your prompt payment.`,
                isRead: Math.random() > 0.7,
                isStarred: Math.random() > 0.7,
                status: ['inbox'],
                isChecked: false,
                sentAt: 1718288700000, // 2024-06-13 01:05:00
                removedAt: null,
                from: 'payments@service.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e118',
                createdAt: 1715950800000, // 2024-05-17 10:00:00
                subject: 'Account Update',
                body: `Your account information has been updated. Please review 
                the changes to ensure everything is correct. If anything looks off,
                 contact support immediately. We’re here to help.`,
                isRead: Math.random() > 0.7,
                isStarred: Math.random() > 0.7,
                status: ['inbox'],
                isChecked: false,
                sentAt: 1715951040000, // 2024-05-17 10:04:00
                removedAt: null,
                from: 'accounts@web.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e119',
                createdAt: 1714575600000, // 2024-04-30 23:00:00
                subject: 'Holiday Greetings',
                body: `Wishing you a wonderful holiday season! May this time be 
                filled with joy, rest, and good company. We appreciate your continued 
                support throughout the year. Stay safe and warm.`,
                isRead: Math.random() > 0.7,
                isStarred: Math.random() > 0.7,
                status: ['inbox'],
                isChecked: false,
                sentAt: 1714575900000, // 2024-04-30 23:05:00
                removedAt: null,
                from: 'greetings@company.com',
                to: 'user@appsus.com'
            },
            {
                id: 'e120',
                createdAt: 1717846800000, // 2024-06-08 01:00:00
                subject: 'Survey Invitation',
                body: `Please participate in our survey. Your input is incredibly 
                valuable and helps us tailor our services. It won’t take more than a couple 
                of minutes. Thank you for helping us grow.`,
                isRead: Math.random() > 0.7,
                isStarred: Math.random() > 0.7,
                status: ['inbox'],
                isChecked: false,
                sentAt: 1717846980000, // 2024-06-08 01:03:00
                removedAt: null,
                from: 'survey@service.com',
                to: 'user@appsus.com'
            },
        ]
        utilService.saveToStorage(MAIL_KEY, mails)

    }
    return mails
}


function getFilterFromSearchParams(searchParams) {
    const txt = searchParams.get('txt') || ''
    // const minSpeed = searchParams.get('minSpeed') || ''

    return {
        txt,
    }
}


function _setNextPrevMailId(mail) {
    return query().then((mails) => {
        const mailIdx = mails.findIndex((currMail) => currMail.id === mail.id)
        const nextMail = mails[mailIdx + 1] ? mails[mailIdx + 1] : mails[0]
        const prevMail = mails[mailIdx - 1] ? mails[mailIdx - 1] : mails[mails.length - 1]
        mail.nextMailId = nextMail.id
        mail.prevMailId = prevMail.id
        return mail
    })
}




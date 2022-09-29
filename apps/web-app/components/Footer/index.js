import { useEffect, useState } from 'react'

const footerMessages = [
  'who am I?',
  'incognito mode 4eva',
  'making your identity safu',
  'activate anon mode',
  'your identity is burnt',
  'private since [REDACTED]',
  'anonymity lets you be you',
  'thanks for checking us out :)',
  'the password is 🤝🏽🔭🧑🏽‍🚀✨🤌🏽',
  'tell us what you really think'
]

const Footer = () => {
  const [message, setMessage] = useState(footerMessages[0])
  const randomMessage = footerMessages[Math.floor(Math.random() * footerMessages.length)]

  useEffect(() => setMessage(randomMessage), [])

  return (
    <div className="relative flex items-center flex-col">
      <p className="text-[12px] text-brand-beige py-6">
        &#8220;{message}&#8221;&nbsp;&ndash;&nbsp;
        <a href="https://twitter.com/PrivacyScaling" target="_blank" className="underline mt-3" rel="noreferrer">
          @PrivacyScaling
        </a>
      </p>
    </div>
  )
}

export default Footer

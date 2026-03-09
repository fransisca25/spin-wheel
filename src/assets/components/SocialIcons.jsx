import { Instagram, Facebook, Kakaotalk, Whatsapp } from "../utils/index"
import "../styles/icons.css"


export default function SocialIcons(){

  const socials = [
    {
      icon: Instagram,
      link: "https://instagram.com"
    },
    {
      icon: Facebook,
      link: "https://facebook.com"
    },
    {
      icon: Kakaotalk,
      link: "https://kakaotalk.com"
    },
    {
      icon: Whatsapp,
      link: "https://whatsapp.com"
    }
  ]

  return(
    <div className="social-icons">
      {socials.map((social, i) => {
        const Icon = social.icon

        return(
          <a key={i} href={social.link} target="_blank" rel="noopener noreferrer">
            <Icon className="icon"/>
          </a>
        )
      })}
    </div>
  )
}
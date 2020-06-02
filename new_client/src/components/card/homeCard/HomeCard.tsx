import React from 'react'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardMedia from '@material-ui/core/CardMedia'
import WhatsAppIcon from '@material-ui/icons/WhatsApp'
import { IconButton } from '@material-ui/core'
import { useStyles } from './styles'

interface CardProps {
    name?: string
    image?: string
    location?: string
    phone?: Number
    onClick: () => void
}

export default function SmallCard(props: CardProps) {
    const classes = useStyles()
    const whatsappMessage = (number: Number) => {
        var url = `https://api.whatsapp.com/send?phone=${number}&text=Hola!%20Vi%20su%20anuncio%20en%20Kinesya,%20estoy%20interesado%20en%20su%20servicio.`
        var win = window.open(url, "_blank")
        win!.focus()
    }

    return (
        <React.Fragment>
            <div className={classes.container}>
                <CardActionArea className={classes.img}>
                    <CardMedia
                        component="img"
                        onClick={props.onClick}
                        alt={props.name}
                        image={props.image}
                    />
                </CardActionArea>

                <div className={classes.info}>
                    <div className={classes.description}>
                        <div className={classes.title}>{props.name}</div>
                        <div className={classes.subtitle}>{props.location}</div>
                    </div>
                    <IconButton
                        style={{ color: "#25D366" }}
                        onClick={() => {
                            whatsappMessage(props.phone!)
                        }}
                    >
                        <WhatsAppIcon className={classes.icon}></WhatsAppIcon>
                    </IconButton>
                </div>
            </div>
        </React.Fragment>
    )
}

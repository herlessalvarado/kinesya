import React from "react"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import Button from "@material-ui/core/Button"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import CardActions from "@material-ui/core/CardActions"
import Typography from "@material-ui/core/Typography"
import WhatsAppIcon from "@material-ui/icons/WhatsApp"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        media: {
            objectFit: "contain",
            width: "100%",
            height: "100%",
        },
        button: {
            flex: 1,
            color: "#25D366",
            transition: ".5s background-color",
            "&:hover": {
                backgroundColor: "#25D366",
                color: "white",
            },
        },
    })
)

interface CardProps {
    name?: string
    image?: string
    location?: string
    phone?: Number
}

export default function SmallCard(props: CardProps) {
    const classes = useStyles()
    const whatsappMessage = (number: Number) => {
        var url = `https://api.whatsapp.com/send?phone=${number}&text=Hola!%20Vi%20su%20anuncio%20en%20Kinesya,%20estoy%20interesado%20en%20su%20servicio.`
        var win = window.open(url, "_blank")
        win!.focus()
    }

    return (
        <Card>
            <CardActionArea>
                <CardMedia
                    component="img"
                    loading="lazy"
                    className={classes.media}
                    image={props.image}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.location}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button
                    size="large"
                    className={classes.button}
                    onClick={() => whatsappMessage(props.phone!)}
                >
                    <WhatsAppIcon></WhatsAppIcon>
                </Button>
            </CardActions>
        </Card>
    )
}

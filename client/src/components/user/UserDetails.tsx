import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import CardMedia from '@material-ui/core/CardMedia';
import Container from '@material-ui/core/Container';
import Header from '../header/Header';
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Fab from '@material-ui/core/Fab'
import WhatsAppIcon from '@material-ui/icons/WhatsApp'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { UserViewModel } from '../../models/user';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        toolbar: {
            flexGrow: 1,
        },
        cover: {
            display: "block",
            position: "relative",
            height: "250px",
            overflow: "hidden",
            zIndex: 1,
        },
        coverPhoto: {
            objectFit: "cover",
            width: "100%",
            height: "100%",
        },
        profile: {
            display: "block",
            position: "relative",
            border: `#DF6F7F solid 3px`,
            borderRadius: "5px",
            width: "200px",
            height: "200px",
            objectFit: "contain",
            margin: `-150px 0 10px 20px`,
            zIndex: 999,
            marginLeft: "auto",
            marginRight: "auto",
        },
        profilePhoto: {
            objectFit: "cover",
            width: "100%",
            height: "100%",
        },
        name: {
            textAlign: "center",
        },
        container: {
            textAlign: "center",
        },
        grid: {
            "&.MuiGrid-spacing-xs-3": {
                width: "100%",
            },
        },
        container3: {
            width: "100%",
            columns: "4",
            columnGap: "2vw",
            [theme.breakpoints.down("sm")]: {
                columns: "1",
            },
        },
        box: {
            width: "100%",
            padding: "10px",
            overflow: "hidden",
            breakInside: "avoid",
            "& img": {
                objectFit: "contain",
                height: "100%",
                width: "100%",
                border: "1px solid rgba(0, 0, 0, 0.12)",
                borderRadius: "4px",
                padding: "5px",
            },
        },
        root: {
            "& > *": {
                margin: theme.spacing(1),
            },
        },
        margin: {
            margin: theme.spacing(1),
        },
        extendedIcon: {
            marginRight: theme.spacing(1),
        },
    })
)

interface UserByUsernameProps {
    user: UserViewModel
}

export default function UserDetails(props: UserByUsernameProps) {
  const classes = useStyles();
  const { t } = useTranslation("common")

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header />
        <Toolbar className={classes.toolbar} />
        <main>
            <div className={classes.cover}>
                <CardMedia
                    component="img"
                    image={props.user.bannerPhoto[0].srcUrl}
                    className={classes.coverPhoto}
                />
            </div>
            <div className={classes.profile}>
                <CardMedia
                    component="img"
                    image={props.user.profilePhoto[0].srcUrl}
                    className={classes.profilePhoto}
                />
            </div>
            <div className={classes.name}>
                <Typography variant="h5" gutterBottom>
                    {props.user.name}
                </Typography>
            </div>
            <Grid container spacing={3} className={classes.grid}>
                <Grid item xs={12} sm={6} md={4} >
                    <Card>
                        <CardContent>
                            <Typography
                                style={{ color: "black", textAlign: "justify" }}
                                gutterBottom
                            >
                                {props.user.description}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4} >
                    <Card>
                    <CardContent>
                        <div>
                            <Typography
                                style={{
                                    display: "inline-block",
                                    marginRight: "10px",
                                    color: "black",
                                }}
                            >
                                {t("user.orientation")}
                            </Typography>
                            <Typography
                                style={{
                                    display: "inline-block",
                                    color: "darkGray",
                                }}
                            >
                                {props.user.orientation}
                            </Typography>
                        </div>
                        <div>
                            <Typography
                                style={{
                                    display: "inline-block",
                                    marginRight: "10px",
                                    color: "black",
                                }}
                            >
                                {t("user.district")}
                            </Typography>
                            <Typography
                                style={{
                                    display: "inline-block",
                                    color: "darkGray",
                                }}
                            >
                                {props.user.location}
                            </Typography>
                        </div>
                        <div>
                            <Typography
                                style={{
                                    display: "inline-block",
                                    marginRight: "10px",
                                    color: "black",
                                }}
                            >
                                {t("user.gender")}
                            </Typography>
                            <Typography
                                style={{
                                    display: "inline-block",
                                    color: "darkGray",
                                }}
                            >
                                {t("user.female")}
                            </Typography>
                        </div>
                        <div>
                            <Typography
                                style={{
                                    display: "inline-block",
                                    marginRight: "10px",
                                    color: "black",
                                }}
                            >
                                {t("user.birthplace")}
                            </Typography>
                            <Typography
                                style={{
                                    display: "inline-block",
                                    color: "darkGray",
                                }}
                            >
                                {props.user.birthPlace}
                            </Typography>
                        </div>
                        <div>
                            <Typography
                                style={{
                                    display: "inline-block",
                                    marginRight: "10px",
                                    color: "black",
                                }}
                            >
                                {t("user.age")}
                            </Typography>
                            <Typography
                                style={{
                                    display: "inline-block",
                                    color: "darkGray",
                                }}
                            >
                                {props.user.age}
                            </Typography>
                        </div>
                        <div>
                            <Typography
                                style={{
                                    display: "inline-block",
                                    marginRight: "10px",
                                    color: "black",
                                }}
                            >
                                {t("user.zodiacSign")}
                            </Typography>
                            <Typography
                                style={{
                                    display: "inline-block",
                                    color: "darkGray",
                                }}
                            >
                                {props.user.zodiac}
                            </Typography>
                        </div>
                        <div>
                            <Typography
                                style={{
                                    display: "inline-block",
                                    marginRight: "10px",
                                    color: "black",
                                }}
                            >
                                {t("user.eyes")}
                            </Typography>
                            <Typography
                                style={{
                                    display: "inline-block",
                                    color: "darkGray",
                                }}
                            >
                                {props.user.eyes}
                            </Typography>
                        </div>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4} >
                    <Card>
                        <CardContent>
                        <div>
                            <Typography
                                style={{
                                    display: "inline-block",
                                    marginRight: "10px",
                                    color: "black",
                                }}
                            >
                                {t("user.measurements")}
                            </Typography>
                            <Typography
                                style={{
                                    display: "inline-block",
                                    color: "darkGray",
                                }}
                            >
                                {props.user.measurements}
                            </Typography>
                        </div>
                        <div>
                            <Typography
                                style={{
                                    display: "inline-block",
                                    marginRight: "10px",
                                    color: "black",
                                }}
                            >
                                {t("user.height")}
                            </Typography>
                            <Typography
                                style={{
                                    display: "inline-block",
                                    color: "darkGray",
                                }}
                            >
                                {props.user.height + "cm"}
                            </Typography>
                        </div>
                        <div>
                            <Typography
                                style={{
                                    display: "inline-block",
                                    marginRight: "10px",
                                    color: "black",
                                }}
                            >
                                {t("user.weight")}
                            </Typography>
                            <Typography
                                style={{
                                    display: "inline-block",
                                    color: "darkGray",
                                }}
                            >
                                {props.user.weight + "kg"}
                            </Typography>
                        </div>
                        <div>
                            <Typography
                                style={{
                                    display: "inline-block",
                                    marginRight: "10px",
                                    color: "black",
                                }}
                            >
                                {t("user.ethnicity")}
                            </Typography>
                            <Typography
                                style={{
                                    display: "inline-block",
                                    color: "darkGray",
                                }}
                            >
                                {props.user.ethnicity}
                            </Typography>
                        </div>
                        <div>
                            <Typography
                                style={{
                                    display: "inline-block",
                                    marginRight: "10px",
                                    color: "black",
                                }}
                            >
                                {t("user.hair")}
                            </Typography>
                            <Typography
                                style={{
                                    display: "inline-block",
                                    color: "darkGray",
                                }}
                            >
                                {props.user.hair}
                            </Typography>
                        </div>
                        <div>
                            <Typography
                                style={{
                                    display: "inline-block",
                                    marginRight: "10px",
                                    color: "black",
                                }}
                            >
                                {t("user.fakeTits")}
                            </Typography>
                            <Typography
                                style={{
                                    display: "inline-block",
                                    color: "darkGray",
                                }}
                            >
                                {props.user.fakeBoobs ? t("user.yes") : t("user.no")}
                            </Typography>
                        </div>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <div className={classes.container}>
            <Grid container spacing={3} className={classes.grid}>
                <Grid item xs={12} sm={6}>
                    <Fab variant="extended" color="primary" aria-label="add" className={classes.margin}>
                        <AttachMoneyIcon className={classes.extendedIcon} />
                        {t("user.price")} {props.user.price}
                    </Fab>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Fab variant="extended" color="primary" aria-label="add" className={classes.margin}>
                        <WhatsAppIcon className={classes.extendedIcon} />
                        {t("user.phone")} {props.user.phone}
                    </Fab>
                </Grid>
            </Grid>
            <Grid container spacing={3} className={classes.grid}>
                <Grid item xs={12}>
                    <Typography
                        style={{ display: "inline-block", color: "black" }}
                        variant="h6"
                    >
                        {t("user.services")}
                    </Typography>
                    <div className={classes.root}>
                        {props.user.tags?.map((reference, index) => (
                            <Button key={index} color="secondary">
                                {reference}
                            </Button>
                        ))}
                    </div>
                </Grid>
            </Grid>
            </div>
            <div className={classes.container3}>
                {props.user.referencePhotos?.map((reference, index) => (
                    <div key={index} className={classes.box}>
                        <img alt="complex" src={reference.srcUrl} />
                    </div>
                ))}
            </div>
        </main>
      </Container>
    </React.Fragment>
  );
}
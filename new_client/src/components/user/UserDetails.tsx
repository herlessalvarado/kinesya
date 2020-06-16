import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import CardMedia from '@material-ui/core/CardMedia';
import Container from '@material-ui/core/Container';
import Header from '../header/Header';
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
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
            border: `#BF953F solid 3px`,
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
        box: {
            width: "100%",
            overflow: "hidden",
            breakInside: "avoid",
            paddingLeft: "2vw",
            wordWrap: "break-word",
        },
        info: {
            textAlign: "left",
        },
        container3: {
            width: "100%",
            columns: "4",
            columnGap: "2vw",
            [theme.breakpoints.down("sm")]: {
                columns: "1",
            },
        },
        box2: {
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
        button: {
            margin: theme.spacing(1),
            border: `1px solid #BF953F`,
            backgroundColor: "black",
            color: "#BF953F",
            "&:hover": {
                backgroundColor: "#BF953F",
                color: "black",
            },
        },
        root: {
            "& > *": {
                margin: theme.spacing(1),
            },
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
                    image={props.user.bannerPhoto[0].url}
                    className={classes.coverPhoto}
                />
            </div>
            <div className={classes.profile}>
                <CardMedia
                    component="img"
                    image={props.user.profilePhoto[0].url}
                    className={classes.profilePhoto}
                />
            </div>
            <div className={classes.name}>
                <Typography variant="h5" gutterBottom>
                    {props.user.name}
                </Typography>
            </div>
            <Grid container spacing={3} className={classes.grid}>
                <Grid item xs={12} sm={6} md={4}>
                    <div className={classes.box}>
                        <Typography
                            style={{ color: "black", textAlign: "justify" }}
                            gutterBottom
                        >
                            {props.user.description}
                        </Typography>
                    </div>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <div className={classes.info}>
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
                    </div>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <div className={classes.info}>
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
                    </div>
                </Grid>
            </Grid>
            <div className={classes.container}>
            <Grid container spacing={3} className={classes.grid}>
                <Grid item xs={6}>
                    <Button className={classes.button}>
                        {t("user.price")} {props.user.price}
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button className={classes.button}>
                        {t("user.phone")} {props.user.phone}
                    </Button>
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
                    <div key={reference.url} className={classes.box2}>
                        <img key={index} alt="complex" src={reference.url} />
                    </div>
                ))}
            </div>
        </main>
      </Container>
    </React.Fragment>
  );
}
import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme, ThemeProvider, CardMedia, makeStyles, createStyles, Theme } from '@material-ui/core';
import UploadImage from './UploadImage';

interface Photo {
    url?: string
    file?: any
}

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#BF953F",
        },
    },
})

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        media: {
            objectFit: "contain",
        },
        grid: {
            marginTop: theme.spacing(1),
        },
    })
)

export default function Photos() {
    const classes = useStyles()
    const [banner, setBanner] = useState<Photo | undefined>()
    const [profile, setProfile] = useState<Photo | undefined>()
    const [references, setReferences] = useState(Array<Photo>())

    const handleProfile = (event: any) => {
        setProfile({
            file: event.target.files[0],
            url: window.URL.createObjectURL(event.target.files[0]),
        })
    }
    const handleBanner = (event: any) => {
        setBanner({
            file: event.target.files[0],
            url: window.URL.createObjectURL(event.target.files[0]),
        })
    }

    const handleChange = (event: any) => {
        let _references = Array.from(event.target.files).map(
            (photo): Photo => ({
                file: photo,
                url: window.URL.createObjectURL(photo),
            })
        )

        setReferences(references?.concat(_references))
    }

  return (
    <React.Fragment>
        <ThemeProvider theme={theme}>
      <Typography variant="h6" gutterBottom>
        Fotos
      </Typography>
      <Grid container spacing={3} className={classes.grid} justify="center">
                                <Grid item xs={12} sm={6}>
                                    <UploadImage text="Foto de Portada" onChange={handleBanner} />
                                </Grid>
                                {!!banner && (
                                    <Grid item xs={12}>
                                        <CardMedia
                                            component="img"
                                            height="200"
                                            className={classes.media}
                                            image={banner.url}
                                        />
                                    </Grid>
                                )}
                            </Grid>
                            <Grid container spacing={3} className={classes.grid} justify="center">
                                <Grid item xs={12} sm={6}>
                                    <UploadImage text="Foto de Perfil" onChange={handleProfile} />
                                </Grid>
                                {!!profile && (
                                    <Grid item xs={12}>
                                        <CardMedia
                                            component="img"
                                            height="200"
                                            className={classes.media}
                                            image={profile.url}
                                        />
                                    </Grid>
                                )}
                            </Grid>

                            <Grid container spacing={3} className={classes.grid} justify="center">
                                <Grid item xs={12} sm={6}>
                                    <UploadImage
                                        text="Fotos Secundarias"
                                        onChange={handleChange}
                                        multiple={true}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={3}>
                                {references?.map((photo: Photo, index: number) => (
                                    <Grid key={index} item xs={12} sm={3}>
                                        <CardMedia
                                            component="img"
                                            height="200"
                                            className={classes.media}
                                            image={photo.url}
                                        />
                                    </Grid>
                                ))}
      </Grid>
      </ThemeProvider>
    </React.Fragment>
  );
}
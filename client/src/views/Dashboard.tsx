import React, { useState, ChangeEvent, useEffect, useRef } from "react"
import {
    createStyles,
    makeStyles,
    Theme,
    createMuiTheme,
    ThemeProvider,
} from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import InputLabel from "@material-ui/core/InputLabel"
import FormControl from "@material-ui/core/FormControl"
import InputAdornment from "@material-ui/core/InputAdornment"
import Input from "@material-ui/core/Input"
import CardMedia from "@material-ui/core/CardMedia"
import { AxiosError } from "axios"
import { Button, Checkbox, FormControlLabel, Chip } from "@material-ui/core"
import FormData from "form-data"
import Header from "../components/Header"
import Copyright from "../components/Copyright"
import { getUserByToken, updateUser } from "../network/UserService"
import { ToastSuccessful } from "../components/Toast"
import { useHistory } from "react-router-dom"
import {
    DISTRICTS,
    MIN_AGE,
    MIN_PRICE,
    MAX_AGE,
    SERVICES,
    Zodiac,
    Orientations,
    Ethnicities,
} from "../utils/constants"
import Autocomplete from "@material-ui/lab/Autocomplete"
import DateFnsUtils from "@date-io/date-fns"
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers"
import  validateDecimal from "../helpers/validators/field_validators"
interface UserCharacteristics{
    height?: string
    weight?: string
    eyes?: string
    hair?: string
    fakeBoobs?: boolean
    birthday?: string
    birthPlace?: string
    zodiac?: string
    measurements?: string
    orientation?: string
    ethnicity?: string
}
interface User {
    characteristics?: UserCharacteristics
    name?: string
    age?: number
    description?: string
    price?: number
    phone?: number
    location?: string
    profilePhoto: string
    referencePhotos: Array<string>
    tags?: Array<string>
}

interface ValidateFields {
    value:string,
    valid:boolean
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
        appBar: {
            position: "relative",
        },
        layout: {
            width: "auto",
            marginLeft: theme.spacing(2),
            marginRight: theme.spacing(2),
            [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
                width: 600,
                marginLeft: "auto",
                marginRight: "auto",
            },
        },
        paper: {
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(3),
            padding: theme.spacing(2),
            [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
                marginTop: theme.spacing(6),
                marginBottom: theme.spacing(6),
                padding: theme.spacing(3),
            },
        },
        media: {
            objectFit: "contain",
        },
        button: {
            marginTop: theme.spacing(4),
            background: "linear-gradient(90deg,#e8d3af,#cda777)!important",
        },
        grid: {
            marginTop: theme.spacing(1),
        },
    })
)

interface Photo {
    url?: string
    file?: any
}

export default function Dashboard() {
    const classes = useStyles()
    const [height,setHeight] = useState<ValidateFields>({valid:true,value:""})
    const [weight,setWeight] = useState<ValidateFields>({valid:true,value:""})
    const [openToast, setOpenToast] = useState(false)
    const [toastMessage, setToastMessage] = useState("")
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [age, setAge] = useState(MIN_AGE)
    const [price, setPrice] = useState(MIN_PRICE)
    const [phone, setPhone] = useState<number>(51)
    const mountedRef = useRef(true)
    const [location, setLocation] = useState("")
    const [profile, setProfile] = useState<Photo | undefined>()
    const [references, setReferences] = useState(Array<Photo>())
    const [tags, setTags] = useState(Array<string>())
    const [eyes, setEyes] = useState("")
    const [hair, setHair] = useState("")
    const [fakeBoobs, setFakeBoobs] = useState(false)
    const [birthday, setBirthday] = useState(new Date())
    const [birthPlace, setBirthPlace] = useState("")
    const [zodiac, setZodiac] = useState("")
    const [measurements, setMeasurements] = useState("")
    const [orientation, setOrientation] = useState("")
    const [etnia, setEtnia] = useState("")
    const history = useHistory()

    const setUsersFields = (res: User) => {
        if (!!res.characteristics){
            setHeight({valid:true,value:res.characteristics.height || ""})
            setFakeBoobs(res.characteristics.fakeBoobs || false)
            setWeight({valid:true,value:res.characteristics.weight || ""})
            setEyes(res.characteristics.eyes || "")
            setHair(res.characteristics.hair || "")
            setFakeBoobs(res.characteristics.fakeBoobs || false)
            setBirthday(!!res.characteristics.birthday ? new Date(res.characteristics.birthday) : new Date())
            setBirthPlace(res.characteristics.birthPlace || "")
            setZodiac(res.characteristics.zodiac || "")
            setMeasurements(res.characteristics.measurements || "")
            setOrientation(res.characteristics.orientation || "")
            setEtnia(res.characteristics.ethnicity || "")
        }
        setTags(res.tags || [])
        setAge(res.age || MIN_AGE)
        setPrice(res.price || MIN_PRICE)
        setPhone(res.phone || 51)
        setLocation(res.location || "")
        if (!!res.profilePhoto)
            setProfile({ url: process.env.REACT_APP_API_URL! + res.profilePhoto })
        if (res.referencePhotos.length > 0)
            setReferences(
                res.referencePhotos?.map(
                    (photo?: string): Photo => ({
                        url: process.env.REACT_APP_API_URL! + photo,
                    })
                )
            )
        setDescription(res.description || "")
        setName(res.name || "")
    }
    const handCloseToast = () => {
        setOpenToast(false)
    }

    function validateHeight(){
        if(!validateDecimal(height.value))
            setHeight({...height,valid:false})
    }
    function validateWeight(){
        if(!validateDecimal(weight.value))
            setWeight({...weight,valid:false})
    }

    useEffect(() => {
        if (mountedRef.current) {
            getUserByToken()
                .then((res) => {
                    setUsersFields(res as User)
                })
                .catch(() => {
                    history.push("/login")
                })
        }
        mountedRef.current = false
    }, [history])

    const handleName = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    }

    const handleTags = (newValue: Array<string>) => {
        setTags(newValue)
    }

    const handleDescription = (event: ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value)
    }

    const handleAge = (event: ChangeEvent<HTMLInputElement>) => {

        setAge(parseInt(event.target.value, 10) || age)
    }

    const handlePrice = (event: ChangeEvent<HTMLInputElement>) => {
        setPrice(parseInt(event.target.value, 10) || price)
    }

    const handlePhone = (event: ChangeEvent<HTMLInputElement>) => {
        setPhone(parseInt(event.target.value, 10) || phone)
    }

    const handleLocation = (value: string) => {
        setLocation(value)
    }

    const handleProfile = (event: any) => {
        setProfile({
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
    const handleHeight = (event: ChangeEvent<HTMLInputElement>) => {
        setHeight({...height,value:event.target.value})
    }
    const handleWeight = (event: ChangeEvent<HTMLInputElement>) => {
        setWeight({...weight,value:event.target.value})

    }
    const handleEyes = (event: ChangeEvent<HTMLInputElement>) => {
        setEyes(event.target.value)
    }
    const handleHair = (event: ChangeEvent<HTMLInputElement>) => {
        setHair(event.target.value)
    }
    const handleFakeBoobs = (value: boolean) => {
        setFakeBoobs(value)
    }

    const handleBirthPlace = (event: ChangeEvent<HTMLInputElement>) => {
        setBirthPlace(event.target.value)
    }
    const handleZodiac = (value:string) => {
        setZodiac(value)
    }
    const handleMeasurements = (event: ChangeEvent<HTMLInputElement>) => {
        setMeasurements(event.target.value)
    }
    const handleOrientation = (value:string) => {
        setOrientation(value)
    }
    const handleEthnicity = (value:string) => {
        setEtnia(value)
    }
    const handleBirthday = (date: Date) => {
        setBirthday(date)
    }

    const update = () => {
        let formData = new FormData()
        formData.append("profile", profile?.file)
        references?.forEach((photo) => {
            formData.append("references", photo.file)
        })
        formData.append("name", name)
        formData.append("description", description)
        formData.append("age", age)
        formData.append("price", price)
        formData.append("phone", phone)
        formData.append("location", location)
        formData.append("isPublic", true)
        tags?.forEach((tag) => {
            formData.append("tags", tag)
        })
        updateUser(formData)
            .then((message) => {
                setToastMessage(message)
                setOpenToast(true)
            })
            .catch((err: AxiosError) => {
                history.push("/login")
            })
        const characteristics = {height:height.value,weight:weight.value,eyes,hair,fakeBoobs,zodiac,orientation,birthPlace,measurements,ethnicity:etnia,birthday: birthday }
        formData.append("characteristics",JSON.stringify(characteristics));
        
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <Header title="Kinesya"></Header>
            <ThemeProvider theme={theme}>
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Typography variant="h4" gutterBottom>
                            Completar perfil
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    id="name"
                                    name="Name"
                                    label="Nombre"
                                    fullWidth
                                    value={name}
                                    autoComplete="fname"
                                    onChange={handleName}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="description"
                                    label="Descripción"
                                    multiline
                                    rows="4"
                                    variant="outlined"
                                    fullWidth
                                    value={description}
                                    onChange={handleDescription}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="age"
                                    label="Edad"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    InputProps={{
                                        inputProps: {
                                            max: MAX_AGE,
                                            min: MIN_AGE,
                                        },
                                    }}
                                    fullWidth
                                    value={age}
                                    variant="outlined"
                                    onChange={handleAge}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel htmlFor="standard-adornment-amount">
                                        Precio
                                    </InputLabel>
                                    <Input
                                        id="standard-adornment-amount"
                                        type="number"
                                        value={price}
                                        onChange={handlePrice}
                                        startAdornment={
                                            <InputAdornment position="start">S/.</InputAdornment>
                                        }
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="phone"
                                    name="Phone"
                                    label="Teléfono"
                                    fullWidth
                                    value={phone}
                                    autoComplete="fphone"
                                    onChange={handlePhone}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Autocomplete
                                    id="districts"
                                    selectOnFocus
                                    value={location}
                                    onChange={(event: any, value: any) => {
                                        if (value !== null) handleLocation(value)
                                    }}
                                    options={DISTRICTS}
                                    getOptionLabel={(options) => options}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="standard"
                                            label="Distrito"
                                            placeholder="Distrito"
                                            helperText="Selecciona tu distrito"
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Autocomplete
                                    limitTags={3}
                                    multiple
                                    id="tags-services"
                                    value={tags}
                                    onChange={(event, value) => {
                                        handleTags(value)
                                    }}
                                    renderTags={(value: string[], getTagProps) =>
                                        value.map((option: string, index: number) => (
                                          <Chip variant="outlined" color="primary" label={option} {...getTagProps({ index })} />
                                        ))
                                      }
                                    options={SERVICES}
                                    getOptionLabel={(option) => option}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Servicios"
                                            placeholder="Servicios"
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                <TextField 
                                    error={!height.valid}
                                    value={height.value}
                                    onFocus={()=>{setHeight({...height,valid:true})}}
                                    onBlur={()=>{validateHeight()}}
                                    onChange={handleHeight}
                                    fullWidth
                                    label="Altura"
                                    placeholder="Altura"
                                    helperText={(!height.valid) ?"Altura invalida" : "" }
                                    InputProps={
                                        {
                                            endAdornment:<InputAdornment position="end">m</InputAdornment>,
                                        }
                                    }
                                />
                                </FormControl>

                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    error={!weight.valid}
                                    value={weight.value}
                                    onFocus={()=>{setWeight({...weight,valid:true})}}
                                    onChange={handleWeight}
                                    onBlur={()=>{validateWeight()}}
                                    fullWidth
                                    label="Peso"
                                    placeholder="Peso"
                                    helperText={(!weight.valid) ?"Peso invalido" : "" }
                                    InputProps={
                                        {
                                            endAdornment:<InputAdornment position="end">Kg</InputAdornment>,
                                        }
                                    }
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    value={hair}
                                    onChange={handleHair}
                                    fullWidth
                                    label="Cabello"
                                    placeholder="Cabello"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    value={eyes}
                                    onChange={handleEyes}
                                    fullWidth
                                    label="Ojos"
                                    placeholder="Ojos"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            color="primary"
                                            checked={fakeBoobs}
                                            onChange={(event, value) => {
                                                handleFakeBoobs(value)
                                            }}
                                            name="checkedFakeBoobs"
                                        />
                                    }
                                    label="Tetas Falsas"
                                />
                            </Grid>
                            
                            <Grid item sm={6} xs={12}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <DatePicker
                                        disableToolbar
                                        label="Fecha de Nacimiento"
                                        variant="inline"
                                        value={birthday}
                                        placeholder="Fecha de Nacimiento"
                                        onChange={(date) => {
                                            if (date !== null) handleBirthday(date)
                                        }}
                                        format="MM/dd/yyyy"
                                    />
                                </MuiPickersUtilsProvider>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    value={birthPlace}
                                    onChange={handleBirthPlace}
                                    fullWidth
                                    label="Lugar de Nacimiento"
                                    placeholder="Lugar de Nacimiento"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Autocomplete
                                    
                                    id="zodiac"
                                    selectOnFocus
                                    value={zodiac}
                                    onChange={(event: any, value: any) => {
                                        if (value !== null) handleZodiac(value)
                                    }}
                                    options={Zodiac}
                                    getOptionLabel={(options) => options}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="standard"
                                            label="Zodiaco"
                                            placeholder="Zodiaco"
                                        />
                                    )}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="measurements"
                                    fullWidth
                                    value={measurements}
                                    onChange={handleMeasurements}
                                    label="Medidas"
                                    placeholder="Medidas"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Autocomplete
                                    id="orientation"
                                    selectOnFocus
                                    value={orientation}
                                    onChange={(event: any, value: any) => {
                                        if (value !== null) handleOrientation(value)
                                    }}
                                    options={Orientations}
                                    getOptionLabel={(options) => options}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="standard"
                                            label="Orientacion Sexual"
                                            placeholder="Orientacion"
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Autocomplete
                                    id="etnia"
                                    selectOnFocus
                                    value={etnia}
                                    onChange={(event: any, value: any) => {
                                        if (value !== null) handleEthnicity(value)
                                    }}
                                    options={Ethnicities}
                                    getOptionLabel={(options) => options}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="standard"
                                            label="Etnia"
                                            placeholder="Etnia"
                                        />
                                    )}
                                />
                            </Grid>

                            <Grid container spacing={3} className={classes.grid}>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="h6" color="inherit" noWrap>
                                        Foto de perfil
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Input
                                        id="assets"
                                        name="assets"
                                        type="file"
                                        onChange={handleProfile}
                                    />
                                </Grid>
                                {!!profile ? (
                                    <Grid item xs={12}>
                                        <CardMedia
                                            component="img"
                                            height="200"
                                            className={classes.media}
                                            image={profile.url}
                                        />
                                    </Grid>
                                ) : null}
                            </Grid>

                            <Grid container spacing={3} className={classes.grid}>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="h6" color="inherit" noWrap>
                                        Fotos secundarias
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Input
                                        id="assets2"
                                        name="assets2"
                                        type="file"
                                        inputProps={{ multiple: true }}
                                        onChange={handleChange}
                                    />
                                </Grid>
                            </Grid>
                            <ToastSuccessful
                                key="alert"
                                open={openToast}
                                handleClose={handCloseToast}
                                message={toastMessage}
                            ></ToastSuccessful>
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
                        </Grid>
                        <Grid item xs={12}>
                            <Button fullWidth className={classes.button} onClick={update}>
                                Publicar
                            </Button>
                        </Grid>
                    </Paper>
                    <Copyright />
                </main>
            </ThemeProvider>
        </React.Fragment>
    )
}

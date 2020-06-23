import React, { ChangeEvent } from 'react'
import { CssBaseline, Container, Grid, Button } from '@material-ui/core'
import { useStyles } from './styles'
import Header from '../../../components/header/Header'
import Toolbar from '@material-ui/core/Toolbar'
import SearchIcon from '@material-ui/icons/Search'
import { Profile } from './schema'
import InfiniteScroll from 'react-infinite-scroller'
import HomeCard from '../../../components/card/homeCard/HomeCard'
import { getUsersByPaginator, getUsersByDistrict, getUsersByFilter } from '../../../network/UserService'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Box from '@material-ui/core/Box'
import Footer from '../../../components/footer/Footer'
import { FormControlLabel, Checkbox, InputAdornment, Chip } from '@material-ui/core'
import { DISTRICTS, SERVICES, Orientations, Ethnicities } from '../../../commons/constants'
import { priceValidatorResult } from "../../../commons/field_validators"

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Home() {
  const classes = useStyles()
  const history = useHistory()
  const { t } = useTranslation('common')
  const [users, setUsers] = React.useState(new Array<Profile>())
  const [hasMore, setHasMore] = React.useState(true)
  const [open, setOpen] = React.useState(false)
  const [hair, setHair] = React.useState("")
  const [orientation, setOrientation] = React.useState("")
  const [eyes, setEyes] = React.useState("")
  const [birthPlace, setBirthPlace] = React.useState("")
  const [ethnicity, setEthnicity] = React.useState("")
  const [boobs, setBoobs] = React.useState(false)
  const [lowerPrice, setLowerPrice] = React.useState("")
  const [upperPrice, setUpperPrice] = React.useState("")
  const [tags, setTags] = React.useState(new Array<string>())
  const [validLowerPrice, setValidLowerPrice] = React.useState(priceValidatorResult.validator(""))
  const [validUpperPrice, setValidUpperPrice] = React.useState(priceValidatorResult.validator(""))
  const limit = 4

  const path = process.env.REACT_APP_PHOTO_URL!

  const handleEyes = (event: ChangeEvent<HTMLInputElement>) => {
    setEyes(event.target.value)
  }
  const handleHair = (event: ChangeEvent<HTMLInputElement>) => {
      setHair(event.target.value)
  }
  const handleFakeBoobs = (value: boolean) => {
      setBoobs(value)
  }
  const handleBirthPlace = (event: ChangeEvent<HTMLInputElement>) => {
      setBirthPlace(event.target.value)
  }
  const handleOrientation = (value: string) => {
      setOrientation(value)
  }
  const handleEthnicity = (value: string) => {
      setEthnicity(value)
  }
  const handleLowerPrice = (event: ChangeEvent<HTMLInputElement>) => {
    setLowerPrice(event.target.value)
    setValidLowerPrice(priceValidatorResult.validator(event.target.value))
  }
  const handleUpperPrice = (event: ChangeEvent<HTMLInputElement>) => {
    setUpperPrice(event.target.value)
    setValidUpperPrice(priceValidatorResult.validator(event.target.value))
  }
  const handleTags = (newValue: Array<string>) => {
    setTags(newValue)
  }

  const handleOpen = (username: string) => {
    history.push("/user/" + username)
  }
  const handleSelected = (event: any) => {
    getByDistrict(event.target.textContent)
  }
  const getByDistrict = (district: any) => {
    getUsersByDistrict(district).then((res: Profile[]) => {
        setUsers(res)
    })
  }
  function handleFilter() {
    getUsersByFilter(eyes, hair, birthPlace, orientation, ethnicity, lowerPrice, upperPrice, tags).then((res: Profile[]) => {
      setUsers(res)
    })
    handleCloseDialog()
  }
  function loadItems(page: Number) {
    getUsersByPaginator(page, limit).then((res: Profile[]) => {
      if (res.length === 0) setHasMore(false)
      else {
        setUsers(users.concat(res))
      }
    })
  }

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };
  
    return (
        <React.Fragment>
          <CssBaseline />
          <Container maxWidth="lg">
            <Header />
            <Toolbar className={classes.root}>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <Autocomplete
                  id="search"
                  freeSolo
                  size="small"
                  options={DISTRICTS}
                  getOptionLabel={(option) => option}
                  fullWidth
                  onChange={handleSelected}
                  renderInput={(params) => (     
                      <TextField {...params} className={classes.inputInput} variant="standard" />
                  )}
                />
              </div>
              <Button onClick={handleOpenDialog}>
                {t("home.filter")}
              </Button>
              <Dialog fullScreen open={open} onClose={handleCloseDialog} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                  <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleCloseDialog} aria-label="close">
                      <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                      {t("home.filter")}
                    </Typography>
                    <Button autoFocus color="inherit" onClick={handleFilter}>
                      {t("home.filterSearch")}
                    </Button>
                  </Toolbar>
                </AppBar>
                <Container component="main" maxWidth="md">
                  <div className={classes.paper}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                            value={lowerPrice}
                            fullWidth
                            onChange={handleLowerPrice}
                            label={t("dashboard.profile.contact.price")} 
                            placeholder={t("dashboard.profile.contact.min")} 
                            helperText={!validLowerPrice ? priceValidatorResult.message : ""}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">S/.</InputAdornment>
                                ),
                            }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                            value={upperPrice}
                            fullWidth
                            onChange={handleUpperPrice}
                            label={t("dashboard.profile.contact.price")} 
                            placeholder={t("dashboard.profile.contact.max")} 
                            helperText={!validUpperPrice ? priceValidatorResult.message : ""}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">S/.</InputAdornment>
                                ),
                            }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Autocomplete
                            id="orientation"
                            selectOnFocus
                            value={orientation}
                            onChange={(event: any) => {
                                handleOrientation(event.target.textContent)
                            }}
                            options={Orientations}
                            getOptionLabel={(options) => options}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="standard"
                                    label={t("dashboard.profile.physics.sexualOrientation")}
                                />
                            )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                          <Autocomplete
                              id="etnia"
                              selectOnFocus
                              value={ethnicity}
                              onChange={(event: any) => {
                                  handleEthnicity(event.target.textContent)
                              }}
                              options={Ethnicities}
                              getOptionLabel={(options) => options}
                              renderInput={(params) => (
                                  <TextField
                                      {...params}
                                      variant="standard"
                                      label={t("dashboard.profile.physics.ethnicity")}
                                  />
                              )}
                          />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                            value={hair}
                            onChange={handleHair}
                            fullWidth
                            label={t("dashboard.profile.physics.hair")}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                          <TextField
                              value={eyes}
                              onChange={handleEyes}
                              fullWidth
                              label={t("dashboard.profile.physics.eyes")}
                          />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    color="primary"
                                    checked={boobs}
                                    onChange={(event, checked) => {
                                        handleFakeBoobs(checked)
                                    }}
                                    name="checkedFakeBoobs"
                                />
                            }
                            label={t("dashboard.profile.physics.fakeTits")}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                          <TextField
                              value={birthPlace}
                              onChange={handleBirthPlace}
                              fullWidth
                              label={t("dashboard.profile.physics.birthplace")}
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
                                    <Chip
                                        variant="outlined"
                                        color="primary"
                                        label={option}
                                        {...getTagProps({ index })}
                                    />
                                ))
                            }
                            options={SERVICES}
                            getOptionLabel={(option) => option}
                            renderInput={(params) => (
                                <TextField {...params} label={t("dashboard.profile.contact.services")}  placeholder={t("dashboard.profile.contact.services")}  />
                            )}
                        />
                      </Grid>
                      <Button fullWidth variant="outlined" color="primary" className={classes.submit} onClick={handleFilter}>
                        {t("home.filterSearch")}
                      </Button>
                    </Grid>
                  </div>
                  <Box mt={5}>
                      <Footer />
                  </Box>
                </Container>
              </Dialog>
            </Toolbar>
            <main>
            <Container maxWidth="lg">
                <InfiniteScroll pageStart={0} loadMore={loadItems} hasMore={hasMore}>
                  <Grid container spacing={4}>
                        {users?.map((user) => (
                          <Grid item key={user.username} xs={12} sm={6} md={4} lg={3}>
                            <HomeCard
                                onClick={() => {
                                    handleOpen(user.username)
                                }}
                                name={user.name}
                                location={user.location}
                                image={path + user.profilePhoto}
                                phone={user.phone}
                            ></HomeCard>
                          </Grid>
                        ))}
                  </Grid>
                </InfiniteScroll>
            </Container>
            </main>
          </Container>
        </React.Fragment>
      );
}

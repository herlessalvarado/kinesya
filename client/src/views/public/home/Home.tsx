import React from 'react'
import { CssBaseline, Container, Grid } from '@material-ui/core'
import { useStyles } from './styles'
import Header from '../../../components/header/Header'
import Toolbar from '@material-ui/core/Toolbar'
import SearchIcon from '@material-ui/icons/Search'
import { Profile } from './schema'
import InfiniteScroll from 'react-infinite-scroller'
import HomeCard from '../../../components/card/homeCard/HomeCard'
import { getUsersByPaginator, getUsersByDistrict } from '../../../network/UserService'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import { DISTRICTS } from '../../../commons/constants'

export default function Home() {
  const classes = useStyles()
  const history = useHistory()
  const { t } = useTranslation('common')
  const [users, setUsers] = React.useState(new Array<Profile>())
  const [hasMore, setHasMore] = React.useState(true)
  const limit = 4

  const path = process.env.REACT_APP_API_URL!

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
  function loadItems(page: Number) {
    getUsersByPaginator(page, limit).then((res: Profile[]) => {
      if (res.length === 0) setHasMore(false)
      else {
        setUsers(users.concat(res))
      }
    })
  }
  
    return (
        <React.Fragment>
          <CssBaseline />
          <Container maxWidth="lg">
            <Header />
            <Toolbar className={classes.root}>
              <Autocomplete
                id="search"
                freeSolo
                size="small"
                options={DISTRICTS}
                getOptionLabel={(option) => option}
                fullWidth
                onChange={handleSelected}
                renderInput={(params) => (
                  <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <TextField {...params} className={classes.inputInput} variant="standard" />
                  </div>
                )}
              />
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
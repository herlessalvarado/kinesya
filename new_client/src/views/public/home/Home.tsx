import React from 'react'
import { CssBaseline, Container, Grid } from '@material-ui/core'
import { useStyles } from './styles'
import Header from '../../../components/header/Header'
import Toolbar from '@material-ui/core/Toolbar'
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import { Profile } from './schema'
import InfiniteScroll from 'react-infinite-scroller'
import HomeCard from '../../../components/card/homeCard/HomeCard'
import { getUsersByPaginator } from '../../../network/userService'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

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
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder={ t('home.search') }
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ "aria-label": "search" }}
                />
                </div>
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
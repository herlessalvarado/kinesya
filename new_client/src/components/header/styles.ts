import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
        borderBottom: `1px solid ${theme.palette.divider}`,        
    },
    toolbarTitle: {
        flex: 1,
    },
    toolbarTitleXs: {
        textAlign: 'center',
    },
    logoXs: {
          width: "25%",
    },
    logoSm: {
        width: "20%",
    },
    logoMd: {
        width: "15%",
    },
    logoLg: {
        width: "10%",
    },
    buttons: {
        margin: "0.8vw",
    }
  })
)
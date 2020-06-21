import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        footer: {
            padding: theme.spacing(6, 0),
        },
    })
)
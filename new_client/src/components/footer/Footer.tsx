import React from 'react'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import { useStyles } from './styles'
import { useTranslation } from 'react-i18next';

export default function Copyright() {
    const classes = useStyles();
    const { t } = useTranslation('common');

    return (
        <footer className={classes.footer}>
            <Typography variant="body2" color="textSecondary" align="center">
                { t('footer.copyright') }
                <Link color="inherit" href="/">
                    { t('footer.brand') }
                </Link>{" "}
                {new Date().getFullYear()}
                {"."}
            </Typography>
        </footer>
    )
}

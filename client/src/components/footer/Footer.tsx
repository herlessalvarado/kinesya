import React from 'react';
import Typography from '@material-ui/core/Typography';
import { useStyles } from './styles';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Copyright() {
    const classes = useStyles();
    const { t } = useTranslation('common');

    return (
        <footer className={classes.footer}>
            <Typography variant="body2" color="textSecondary" align="center">
                { t('footer.copyright') }
                <Link to= '/' style={{ color: "inherit", textDecoration: "inherit" }}>
                    { t('footer.brand') }
                </Link>{" "}
                {new Date().getFullYear()}
                {"."}
            </Typography>
        </footer>
    )
}

import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useStyles } from './styles';
import { useTranslation } from 'react-i18next';

export default function Pricing() {
  const classes = useStyles();
  const { t } = useTranslation('common');

  const tiers = [
    {
      title: t('dashboard.pricing.weekly.title'),
      price: t('dashboard.pricing.weekly.price'),
      description: [t('dashboard.pricing.weekly.info'),],
      buttonText: t('dashboard.pricing.button'),
      buttonVariant: 'outlined',
    },
    {
      title: t('dashboard.pricing.monthly.title'),
      subheader: t('dashboard.pricing.monthly.subheader'),
      price: t('dashboard.pricing.monthly.price'),
      description: [t('dashboard.pricing.monthly.info'),],
      buttonText: t('dashboard.pricing.button'),
      buttonVariant: 'outlined',
    },
    {
      title: t('dashboard.pricing.biweekly.title'),
      price: t('dashboard.pricing.biweekly.price'),
      description: [t('dashboard.pricing.biweekly.info'),],
      buttonText: t('dashboard.pricing.button'),
      buttonVariant: 'outlined',
    },
  ];

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          { t('dashboard.pricing.title') }
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" component="p">
          { t('dashboard.pricing.description') }
        </Typography>
      </Container>
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            <Grid item key={tier.title} xs={12} sm={tier.title === t('dashboard.pricing.biweekly.title') ? 12 : 6} md={4}>
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  className={classes.cardHeader}
                />
                <CardContent>
                  <div className={classes.cardPricing}>
                    <Typography component="h2" variant="h3" color="textPrimary">
                      {tier.price}
                    </Typography>
                  </div>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography component="li" variant="subtitle1" align="center" key={line}>
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant={tier.title === t('dashboard.pricing.monthly.title') ? "contained" : "outlined"} color="primary">
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
}
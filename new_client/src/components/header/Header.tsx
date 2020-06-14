import React, { useState } from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { useStyles } from "./styles";
import Spanish from "../../assets/flags/spanish.jpg"
import English from "../../assets/flags/uk.png"
import LanguageIcon from '@material-ui/icons/Language';
import Hidden from "@material-ui/core/Hidden";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import DashboardIcon from "@material-ui/icons/Dashboard";
import RegisterIcon from "@material-ui/icons/HowToReg";
import LoginIcon from "@material-ui/icons/AccountCircle";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MenuIcon from "@material-ui/icons/Menu";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getJWT, AuthOff } from "../../cache/cookies/cookieManager";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { ReactComponent as Logo } from "../../assets/logo/kinesya.svg";
import {
	ListItem,
	ListItemIcon,
	List,
	ListItemText,
	ListSubheader,
	Divider,
  Collapse,
} from "@material-ui/core";

export default function Header() {
	const classes = useStyles();
	const { t, i18n } = useTranslation("common");
	const [open, setOpen] = useState(false);
	const [openLanguage, setOpenLanguage] = useState(false);
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

	const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleCloseMenu = () => {
		setAnchorEl(null);
	};

	const handleOpen = () => {
		setOpen(true);
	};

  function actualFlag(){
    let flag; 
    switch (i18n.language) {
      case "en":
        flag = 
          (
          <img
          style={{ width: "2rem", height: "1.5rem" }}
          src={English}
          alt=""
        />)
        break;
      case "es":
       flag =  (<img
        style={{ width: "2rem", height: "1.5rem" }}
        src={Spanish}
        alt=""
      />)
      break;
    }
    return flag
  }
	const handleClose = () => {
		setOpen(false);
	};

	function logOut() {
		AuthOff();
	}

	function DrawerUserLinks() {
		let result;
		if (getJWT()) {
			result = (
				<React.Fragment>
					<Link
						to="/dashboard"
						style={{ color: "inherit", textDecoration: "inherit" }}
					>
						<ListItem button>
							<ListItemIcon>
								<DashboardIcon />
							</ListItemIcon>
							<ListItemText primary={t("header.dashboard")} />
						</ListItem>
					</Link>
					<Link
						to="/login"
						style={{ color: "inherit", textDecoration: "inherit" }}
					>
						<ListItem button onClick={logOut}>
							<ListItemIcon>
								<ExitToAppIcon />
							</ListItemIcon>
							<ListItemText primary={t("header.logout")} />
						</ListItem>
					</Link>
				</React.Fragment>
			);
		} else {
			result = (
				<React.Fragment>
					<Link
						to="/register"
						style={{ color: "inherit", textDecoration: "inherit" }}
					>
						<ListItem button>
							<ListItemIcon>
								<RegisterIcon />
							</ListItemIcon>
							<ListItemText primary={t("header.register")} />
						</ListItem>
					</Link>
					<Link
						to="/login"
						style={{ color: "inherit", textDecoration: "inherit" }}
					>
						<ListItem button>
							<ListItemIcon>
								<LoginIcon />
							</ListItemIcon>
							<ListItemText primary={t("header.login")} />
						</ListItem>
					</Link>
				</React.Fragment>
			);
		}
		return result;
	}

	function headerLinks() {
		let result;
		if (getJWT()) {
			result = (
				<React.Fragment>
					<Link
						to="/dashboard"
						style={{ color: "inherit", textDecoration: "inherit" }}
					>
						<Button className={classes.buttons} variant="outlined" size="small">
							{" "}
							{t("header.dashboard")}{" "}
						</Button>
					</Link>
					<Link
						to="/login"
						style={{ color: "inherit", textDecoration: "inherit" }}
					>
						<Button
							className={classes.buttons}
							onClick={() => {
								AuthOff();
							}}
							variant="outlined"
							size="small"
						>
							{t("header.logout")}
						</Button>
					</Link>
				</React.Fragment>
			);
		} else {
			result = (
				<React.Fragment>
					<Link
						to="/register"
						style={{ color: "inherit", textDecoration: "inherit" }}
					>
						<Button className={classes.buttons} variant="outlined" size="small">
							{" "}
							{t("header.register")}{" "}
						</Button>
					</Link>
					<Link
						to="/login"
						style={{ color: "inherit", textDecoration: "inherit" }}
					>
						<Button className={classes.buttons} variant="outlined" size="small">
							{t("header.login")}
						</Button>
					</Link>
				</React.Fragment>
			);
		}

		return result;
	}

	return (
		<React.Fragment>
			<Toolbar className={classes.toolbar}>
				{/* HEADER NORMAL PARA SM, MD AND UP */}
				<Hidden xsDown>
					<div className={classes.logo}>
						<Logo />
					</div>
					{headerLinks()}

					<Button
						className={classes.buttons}
						aria-controls="simple-menu"
						aria-haspopup="true"
						onClick={handleOpenMenu}
					>
						{
              actualFlag()
            }
            
					</Button>
					<Menu
						id="lang-menu"
						anchorEl={anchorEl}
						keepMounted
						open={Boolean(anchorEl)}
						onClose={handleCloseMenu}
					>
						<MenuItem
							onClick={() => i18n.changeLanguage("en") && setAnchorEl(null)}
						>
							<img
											style={{ width: "2rem", height: "1.5rem" }}
											src={English}
											alt=""
										/>
						</MenuItem>
						<MenuItem
							onClick={() => i18n.changeLanguage("es") && setAnchorEl(null)}
						>
							<img
											style={{ width: "2rem", height: "1.5rem" }}
											src={Spanish}
											alt=""
										/>
						</MenuItem>
					</Menu>
				</Hidden>
				{/* HEADER SOLO PARA XS */}
				<Hidden smUp>
					<div className={classes.logoXs}>
						<Logo />
					</div>
					<IconButton
						onClick={handleOpen}
						edge="end"
						color="inherit"
						aria-label="menu"
					>
						<MenuIcon />
					</IconButton>
					<SwipeableDrawer
						anchor="right"
						open={open}
						onClose={handleClose}
						onOpen={handleOpen}
					>
						<List
							component="nav"
							aria-labelledby="nested-list-subheader"
							subheader={
								<ListSubheader component="div" id="nested-list-subheader">
									Profile
								</ListSubheader>
							}
						>
							{DrawerUserLinks()}
						</List>
						<Divider />
            <ListItem button onClick={()=>{
              setOpenLanguage(!openLanguage)
            }}>
              <ListItemIcon>
                <LanguageIcon/>
              </ListItemIcon>
              <ListItemText primary="Language" />
              {openLanguage ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
						<Collapse in={openLanguage} timeout="auto" unmountOnExit>
							<List component="div" disablePadding>
								<ListItem button onClick={() => i18n.changeLanguage("en")}>
									<ListItemIcon>
										<img
											style={{ width: "2rem", height: "1.5rem" }}
											src={English}
											alt=""
										/>
									</ListItemIcon>
									<ListItemText primary="EN" />
								</ListItem>
								<ListItem button onClick={() => i18n.changeLanguage("es")}>
									<ListItemIcon>
										<img
											style={{ width: "2rem", height: "1.5rem" }}
											src={Spanish}
											alt=""
										/>
									</ListItemIcon>
									<ListItemText primary="ES" />
								</ListItem>
							</List>
						</Collapse>
					</SwipeableDrawer>
				</Hidden>
			</Toolbar>
		</React.Fragment>
	);
}

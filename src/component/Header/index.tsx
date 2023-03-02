import { useEffect, useState } from "react";
import { Box, Divider, Button } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
// import { useNavigate } from "react-router-dom";

import useStyles from "./style";
import Typography from "@mui/material/Typography";
import LogoImage from "../../assets/images/logo.png";
function Header() {
    const classes = useStyles();

    // const navigate = useNavigate();

    return (
        <Box className={classes.root}>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <img src={LogoImage} className={classes.logoHeader} />
                <Typography variant="h5" sx={{ ml: 0.5 }} className="primary" >
                    Shoora Technology
                </Typography>
            </Box>
            <Box className={classes.userBar}>
                <Box className={classes.greetingView}>
                    <Box component="span" >{`Welcome User `}</Box>
                </Box>
            </Box>
        </Box>
    );
}

export default Header;

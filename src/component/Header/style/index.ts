import { makeStyles } from "@mui/styles";
import COLORS from "../../../constants/colors";

export default makeStyles({
    root: {
        padding: "12px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: COLORS.PRIMARY_COLOR,
        boxShadow: "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)",
        position: "fixed",
        top: "0",
        width: "100%",
        backgroundColor: "#ffffff",
        zIndex: 100000
    },
    logoHeader: {
        height: "40px"
    },
    numberOfRows: {
        display: "flex",
        alignItems: "center",
    },
    greetingView: {
        display: "flex",
        flexDirection: "column",
        "& .MuiTypography-root": {
            color: COLORS.PRIMARY_COLOR,
        },
    },
    notificationIcon: {
        color: COLORS.SECONDARY_FONT,
        marginRight: 12,
    },
    userBar: {
        display: "flex",
        alignItems: "center",
    },
    separator: {
        "&.MuiDivider-root": {
            height: 36,
        },
    },
});

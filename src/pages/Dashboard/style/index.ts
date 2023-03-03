import { makeStyles } from "@mui/styles";
import COLORS from "../../../constants/colors";

export default makeStyles({
    dashboardContainer: {
        paddingTop: "60px"
    },
    stackHorizontal: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    lastRefreshLabel: {
        fontSize: "12px !important",
        fontWeight: "bold",
        marginRight: 2
    },
    timingLabel: {
        fontSize: "18px !important",
        fontWeight: "bold",
        color: "#4caf50"
    },
    tableHeadingContainer: {
        background: "#ECEBF1",
    },
    stickyLeftHeader: {
        position: "sticky",
        left: 0,
        background: "#ECEBF1",
    },
    stickyLeftCell: {
        position: "sticky",
        left: 0,
        background: "#ffffff",
    },
    tableHeading: {
        "&.MuiTableCell-root": {
            padding: "12px 12px 12px 16px",
            whiteSpace: "nowrap",
            color: COLORS.PRIMARY_COLOR,
            fontWeight: "bold"
        },
    },
    noWrapclass: {
        whiteSpace: "nowrap",
    },
    tableBodyContainer: {
        height: "300px",
    },
    multiColumnTableHeading: {
        "&.MuiTableCell-root": {
            padding: "12px 0 12px 16px",
            borderRight: "1px solid #e0e0e0",

        },
    },
    noTableComponent: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "18px",
        color: "#6c757d",
    },
    multiColumnTableChildHeading: {
        "&.MuiTableCell-root": {
            padding: "8px 0px 8px 16px",
            whiteSpace: "nowrap",
            borderRight: "1px solid #e0e0e0"
        },
    }
})

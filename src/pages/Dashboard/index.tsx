import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Typography from "@mui/material/Typography";
import TableContainer from '@mui/material/TableContainer';
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import ClearIcon from '@mui/icons-material/Clear';
import CircularProgress from '@mui/material/CircularProgress';

import Box from '@mui/material/Box';
import InputLabel from "@mui/material/InputLabel";
import RefreshIcon from '@mui/icons-material/Refresh';
import Tooltip from '@mui/material/Tooltip';
import { useMutation, useQuery } from "react-query";
import useStyles from "./style";
import Header from "../../component/Header";
import { getData } from "../../api/apiurl";

import { vehicleData } from "../../utility/datautility";
import Grid from '@mui/material/Grid';
import { formateTimeAMPM, getEpochTime, getCurrentDateFormatYYYYMMDD } from "../../utility/calendarutility";

import { headerTimeKeys, generateTableData } from "./helper";

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
) {
    return { name, calories, fat, carbs, protein };
}


export default function Dashboard() {
    const classes = useStyles();
    const [filterState, setFilterState] = useState({
        vehicleName: "",
        filterDate: getCurrentDateFormatYYYYMMDD()
    });
    const [showClearFilter, setShowClearFilter] = useState(false);
    const [lastRefreshTime, setLastRefreshTime] = useState<any>(() => formateTimeAMPM(new Date()));
    const [vehicleTableData, setVehicleTableData] = useState<Array<any>>([]);
    const [snackbar, setSnackbar] = useState<any>({ open: false, variant: "info", message: "" });


    // const { data: vehicleDetails, isLoading } = useQuery(["vehiclesList"], () => getVehicleApiCall());

    // async function getVehicleApiCall() {
    //     console.log("How many times i am calling");
    //     let getApiUrl = `/api/v1/analytics/live`;
    //     const response = await getData(getApiUrl);
    //     console.log(response);
    //     console.log(vehicleData);
    //     const { vehicles } = vehicleData || {};
    //     let vehicleDataUpdated: Array<any> = [];
    //     if (Array.isArray(vehicles)) {
    //         vehicles.forEach((item, index) => {
    //             vehicleDataUpdated.push({
    //                 vehicleId: item.vehicleId,
    //                 vehicleNumber: item.vehicleNumber || "-",
    //                 driverName: item.driverName || "-",
    //                 location: `${item.latitude}-${item.longitude}`,
    //                 lastUpdatedAt: item.lastUpdatedAt,
    //             });
    //         })
    //     }
    //     setVehicleTableData(vehicleDataUpdated);

    //     return response;
    // }

    useEffect(() => {
        mutateVehicleHistory(undefined);
    }, []);
    async function getHistoryApiCall(filterProps?: any) {
        // let historyList: any = [];
        // if (startDate && endDate) {
        //     const dateList = getDatesInRange(new Date(startDate), new Date(endDate)),
        //         min = 10;
        //     historyList = dateList.map((item: any) => {
        //         const randDutyHours = Math.floor(Math.random() * (24 - 10 + 1)) + 10;
        //         const drivingHours = Math.floor(Math.random() * (randDutyHours - min + 1)) + min;
        //         return ({ date: getDateDisplayFormat(item), driving_hours: `${drivingHours} h`, duty_hours: `${randDutyHours} h` })
        //     })
        // }
        // return Promise.resolve(historyList);
        // return new Promise((resolve, reject) => {
        //     setTimeout(() => { resolve(40) }, 5000);
        // });
        const { vehicleName, filterDate } = filterProps || {},
            params = {
                vehicle_number: vehicleName,
                date: filterDate || getCurrentDateFormatYYYYMMDD(),
                page_no: 1,
                page_size: 200,
            };
        const response = await getData('monitor/api/v1/meru-vehicle-stats/', params);
        return response?.data;
    }

    const vehicleHistoryMutation = useMutation(getHistoryApiCall, {
        onSuccess: (data: any) => {
            const time = formateTimeAMPM(new Date());
            const { results } = data || {};
            console.log(results);
            if (Array.isArray(results)) {
                const tableData = generateTableData(results);
                setVehicleTableData(tableData);
            }
            setLastRefreshTime(time);
        },
        onError: () =>
            setSnackbar({
                open: true,
                variant: "error",
                message: "Something went wrong.",
            }),
    });
    const { mutate: mutateVehicleHistory, isLoading, data: historyDetails } = vehicleHistoryMutation;

    function onChangeHndlr(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target,
            payload = { ...filterState, [name]: value };
        setFilterState(prevState => ({ ...prevState, [name]: value }));
        mutateVehicleHistory(payload);
        if (!value) {
            if (name === "vehicleName" && !filterState.filterDate) {
                setShowClearFilter(false);
            } else if (name === "filterDate" && !filterState.vehicleName) {
                setShowClearFilter(false);
            }
        } else {
            setShowClearFilter(true);
        }
    }

    function refreshHndlr() {
        const payload = { ...filterState };
        mutateVehicleHistory(payload);
    }

    function clearFilterHndlr() {
        setFilterState((prevState: any) => ({ ...prevState, filterDate: getCurrentDateFormatYYYYMMDD(), vehicleName: "" }))
        mutateVehicleHistory(undefined);
        setShowClearFilter(false);
    }

    return (
        <Box className={classes.dashboardContainer}>
            <Header />
            <Paper sx={{ mx: 2, my: 2 }} elevation={1}>
                {/* <Box sx={{ p: 4 }}> */}
                <Box sx={{
                    display: "flex", alignItems: "center", px: 2,
                    py: 2,
                    borderBottom: "1px solid #e9ebec",
                    justifyContent: "space-between"
                }}>
                    <Typography component="h1" color="primary" sx={{ fontSize: "1.25rem", fontWeight: "bold", mb: 0 }}>Vehicle Report</Typography>
                    <Box className={classes.stackHorizontal}>
                        <InputLabel className={classes.lastRefreshLabel} >
                            Last Refresh Time:
                        </InputLabel>
                        <InputLabel className={classes.timingLabel} >
                            {lastRefreshTime}
                        </InputLabel>
                    </Box>
                </Box>
                <Box sx={{
                    py: 2,
                    px: 2, borderBottom: "1px solid #e9ebec",
                    display: "flex",
                    justifyContent: "space-between"
                }}>
                    <Grid container columnSpacing={2}>
                        <Grid item xs={3}>
                            <TextField
                                id="vehicleName"
                                name="vehicleName"
                                size="small"
                                type="text"
                                placeholder="Search by vehicle name"
                                sx={{ mr: 2, width: "100%" }}
                                value={filterState.vehicleName}
                                onChange={onChangeHndlr}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField
                                id="filterDate"
                                name="filterDate"
                                size="small"
                                type="date"
                                // defaultValue="2017-05-24"
                                // placeholder="Select Date"
                                sx={{ width: "100%" }}
                                value={filterState.filterDate}
                                onChange={onChangeHndlr}
                                InputLabelProps={{
                                    shrink: true,
                                    // max: new Date()
                                }}
                            />
                        </Grid>
                        <Grid item xs={1} >
                            {showClearFilter && <Tooltip title="Clear Filter">
                                <IconButton onClick={clearFilterHndlr} color="error" aria-label="refresh">
                                    <ClearIcon />
                                </IconButton>
                            </Tooltip>}
                        </Grid>

                        <Grid item xs={6} sx={{ display: "flex", justifyContent: "end" }}>
                            <Tooltip title="Refresh">
                                <IconButton onClick={refreshHndlr} aria-label="refresh" color="primary">
                                    <RefreshIcon />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{ position: "relative" }}>
                    <TableContainer>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead className={classes.tableHeadingContainer}>
                                <TableRow>
                                    <TableCell className={`${classes.tableHeading} ${classes.stickyLeftHeader}`}>Vehicle Number</TableCell>
                                    <TableCell className={classes.tableHeading} align="left">Driver Name</TableCell>
                                    <TableCell className={classes.tableHeading} align="left">Location</TableCell>
                                    <TableCell className={`${classes.tableHeading}`} align="left">Last Update</TableCell>
                                    {
                                        headerTimeKeys.map(item => (
                                            <TableCell key={item.keyName} className={classes.tableHeading} align="left">{item.labelName}</TableCell>
                                        ))
                                    }
                                    {/* <TableCell className={classes.tableHeading} align="left">5:00 to 6:00 AM</TableCell>
                                    <TableCell className={classes.tableHeading} align="left">6:00 to 7:00 AM</TableCell>
                                    <TableCell className={classes.tableHeading} align="left">7:00 to 8:00 AM</TableCell>
                                    <TableCell className={classes.tableHeading} align="left">8:00 to 9:00 AM</TableCell>
                                    <TableCell className={classes.tableHeading} align="left">9:00 to 10:00 AM</TableCell>
                                    <TableCell className={classes.tableHeading} align="left">10:00 to 11:00 AM</TableCell>
                                    <TableCell className={classes.tableHeading} align="left">11:00 to 12:00 PM</TableCell>
                                    <TableCell className={classes.tableHeading} align="left">5:00 to 6:00 AM</TableCell>
                                    <TableCell className={classes.tableHeading} align="left">11:00 to 12:00 PM</TableCell>
                                    <TableCell className={classes.tableHeading} align="left">5:00 to 6:00 AM</TableCell> */}
                                </TableRow>
                            </TableHead>
                            <TableBody className={classes.tableBodyContainer}>
                                {Array.isArray(vehicleTableData) && vehicleTableData.map((row: any) => (
                                    <TableRow
                                        key={row.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}

                                    >
                                        {/* <TableCell component="th" scope="row">
                                            {row.vehicleNumber}
                                        </TableCell> */}
                                        <TableCell className={classes.stickyLeftCell} align="left">{row?.vehicle_number || "-"}</TableCell>
                                        <TableCell className={classes.noWrapclass} align="left">{row?.latest_info?.driver_name || "-"}</TableCell>
                                        <TableCell align="left">{row?.latest_info?.location || "-"}</TableCell>
                                        <TableCell className={classes.noWrapclass} align="left">{getEpochTime(row?.latest_info?.latest_status_time)}</TableCell>
                                        {
                                            headerTimeKeys.map((item: any) => {
                                                return (<TableCell key={`${item.keyName}-test`} align="left">{row[item.keyName] || "-"}</TableCell>
                                                )
                                            })
                                        }
                                    </TableRow>
                                ))}
                                {
                                    Array.isArray(vehicleTableData) && vehicleTableData.length === 0 &&
                                    <TableRow>
                                        <TableCell colSpan={12}>
                                            <div className={classes.noTableComponent} >
                                                Sorry No Data Found!
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {isLoading && <Box sx={{
                        position: "absolute", top: 0, left: 0,
                        display: "flex", justifyContent: "center",
                        paddingTop: 5,
                        width: "100%", height: "100%",
                        backgroundColor: "#f2f2f2",
                        opacity: 0.5
                    }}>
                        <CircularProgress sx={{ mt: 5 }} />
                    </Box>}
                </Box>
                {/* </Box> */}
            </Paper >
        </Box >
    )
}
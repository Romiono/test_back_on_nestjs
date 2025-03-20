import classes from "./ReportByUser.module.scss";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {Dayjs} from "dayjs";
import {
  Button,
  IconButton,
  MenuItem, Paper,
  Select,
  Table, TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { useEffect, useState } from 'react';
import {User} from "@renderer/types/UserType";
import {Date} from "@renderer/types/DateType";
import LogoutIcon from "@mui/icons-material/Logout";
import {useCustomNavigate} from "@renderer/helpers/navigateHandler";
import { UserApi } from '@renderer/api/UserApi';
import {ReportApi} from "@renderer/api/ReportApi";
import {Download} from "@mui/icons-material";

interface ReportByUser {
  paidOrders: string;
  deliveredOrders: string;
  canceledOrders: string;
}


const ReportByUserPage = () => {
  const [report, setReport] = useState<ReportByUser | null>(null);
  const [dateRange, setDateRange] = useState<Date[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const navigate = useCustomNavigate();
  useEffect(() => {
    fetchUsers().then((res) => console.log(res));
  }, []);

  const fetchUsers = async (): Promise<void> => {
    const clients = await UserApi.getAll();
    setUsers(clients);
  }

  const fetchReport = async (): Promise<void> => {
    if(!selectedUserId) return;
    const data = await ReportApi.GetReportByUser([dateRange[0].formatedDate, dateRange[1].formatedDate], selectedUserId);
    setReport(data);
  }

  const fetchReportXlsx = async () => {
    if (!selectedUserId || !dateRange) return;
    try {
      await ReportApi.GetReportByUserXlsx([dateRange[0].formatedDate, dateRange[1].formatedDate], selectedUserId);
    } catch (error) {
      console.error("Ошибка при получении отчета:", error);
    }
  }
  return (
    <div className={classes.main}>
      <div className={classes.main__content}>
        {!report ?
          <div className={classes.main__content__recordByRange}>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="От даты"
                value={dateRange[0]?.date}
                onChange={(value: Dayjs | null) => {
                  if(value === null) return;
                  const formatedDate = value.format('YYYY-MM-DD');
                  setDateRange([{date: value, formatedDate}, dateRange[1]]);
                  console.log(dateRange);
                }}
              />
              <DatePicker
                label="До даты"
                value={dateRange[1]?.date}
                onChange={(value: Dayjs | null) => {
                  if(value === null) return;
                  const formatedDate = value.format('YYYY-MM-DD');
                  setDateRange([ dateRange[0], dateRange[1] = {date: value, formatedDate}]);
                  console.log(dateRange);
                }}
              />
            </LocalizationProvider>
            <Select
              value={selectedUserId}
              onChange={(e) => {
                const value = e.target.value;
                setSelectedUserId(value ? Number(value) : null); // Проверяем перед преобразованием
              }}
            >
              {users.map((user) => (
                <MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>
              ))}
            </Select>
            <div className={classes.main__content__recordByRange__buttonGroup}>
              <IconButton sx={{borderRadius:'5px', height: "100%", aspectRatio: '1/1'}} onClick={(e) => navigate(e)} name={''}>
                <LogoutIcon/>
              </IconButton>
              <Button variant={'contained'} sx={{ height: '100%', width: '100%' }} onClick={fetchReport}>
                Получить отчет
              </Button>
            </div>

          </div> :
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  {Object.keys(report).map((column) => (
                    <TableCell key={column} style={{ fontWeight: 'bold' }}>
                      {column}
                    </TableCell>
                  ))}
                  <TableCell sx={{display: 'flex', gap: '10px'}}>
                    <IconButton sx={{borderRadius: '5px'}} onClick={fetchReportXlsx}>
                      <Download/>
                    </IconButton>
                    <Button variant={'contained'} onClick={() => setReport(null)}>Отчистить</Button>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  {Object.values(report).map((rowItem) => (
                    <TableCell key={rowItem}>{rowItem}</TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        }

      </div>
    </div>
  );
};

export default ReportByUserPage;

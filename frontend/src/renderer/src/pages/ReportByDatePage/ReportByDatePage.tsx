import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {Dayjs} from "dayjs";
import { Button, IconButton} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import {useState} from "react";
import {Date} from "../../types/DateType";
import classes from "./ReportByDate.module.scss";
import {useCustomNavigate} from "@renderer/helpers/navigateHandler";

const ReportByDatePage = () => {
  const [date, setDate] = useState<Date | null>(null);
  const navigate = useCustomNavigate();
  return (
    <div className={classes.main}>
      <div className={classes.main__content}>
        <div className={classes.main__content__recordByDate}>
          <IconButton sx={{borderRadius:'5px', height: "100%", aspectRatio: '1/1'}} onClick={(e) => navigate(e)} name={''}>
            <LogoutIcon/>
          </IconButton>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Выберите дату"
              format={'DD/MM/YYYY'}
              value={date?.date}
              onChange={(value: Dayjs | null) => {
                if(value === null) return;
                const formatedDate = value.format('YYYY-MM-DD');
                setDate({ date: value, formatedDate });
                console.log(date);
              }}
            />
          </LocalizationProvider>
          <Button variant={'contained'} sx={{ height: '100%' }}>
            Получить отчет
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReportByDatePage;

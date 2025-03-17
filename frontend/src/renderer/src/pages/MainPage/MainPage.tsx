import { ReactElement, useState } from 'react';
import classes from './MainPage.module.scss';
import { Button } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';

interface Date {
  formatedDate: string;
  date: Dayjs;
}

const MainPage = (): ReactElement => {
const [date, setDate] = useState<Date | null>(null);

  return (
    <div className={classes.main}>
      <div className={classes.main__content}>
        <div className={classes.main__content__recordByDate}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Выберите дату"
              value={null}
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
        <div className={classes.main__content__recordByDate}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Выберите дату"
              value={null}
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

export default MainPage;

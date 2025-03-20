import { ReactElement } from 'react';
import classes from './MainPage.module.scss';
import { Button } from '@mui/material';
import { useCustomNavigate } from '@renderer/helpers/navigateHandler';

const MainPage = (): ReactElement => {
  const navigate = useCustomNavigate();
  return (
    <div className={classes.main}>
      <div className={classes.main__content}>
        <Button
          variant={'contained'}
          size={'large'}
          name={'reportByDate'}
          onClick={(e) => navigate(e)}
        >
          Получить отчет по дате
        </Button>
        <Button
          variant={'contained'}
          size={'large'}
          name={'reportByUser'}
          onClick={(e) => navigate(e)}
        >
          Получить отчет по пользователю
        </Button>
      </div>
    </div>
  );
};

export default MainPage;

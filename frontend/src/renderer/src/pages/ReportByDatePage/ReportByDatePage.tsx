import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import {
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState } from "react";
import { Date } from "../../types/DateType";
import classes from "./ReportByDate.module.scss";
import { useCustomNavigate } from "@renderer/helpers/navigateHandler";
import { ReportApi } from "@renderer/api/ReportApi";
import {Download} from "@mui/icons-material";

interface Product {
  productId: number;
  productName: string;
  price: string;
  quantity: number;
}

interface Report {
  orderId: number;
  clientName: string;
  totalAmount: string;
  products: Product[];
}


const ReportByDatePage = () => {
  const [date, setDate] = useState<Date | null>(null);
  const [report, setReport] = useState<Report[]>([]);

  const navigate = useCustomNavigate();

  const fetchReport = async () => {
    if (!date) return;
    try {
      const data = await ReportApi.GetReportByDate(date.formatedDate);
      setReport(data);
    } catch (error) {
      console.error("Ошибка при получении отчета:", error);
    }
  };

  const fetchReportXlsx = async () => {
    if (!date) return;
    try {
      await ReportApi.GetReportByDateXlsx(date.formatedDate);
    } catch (error) {
      console.error("Ошибка при получении отчета:", error);
    }
  }

  // Получаем все возможные ключи из данных
  const getColumnNames = () => {
    if (report.length === 0) return [];
    const baseKeys = Object.keys(report[0]).filter((key) => key !== "products");
    const productKeys = report[0].products?.length > 0 ? Object.keys(report[0].products[0]).filter((key) => key !== "productId") : [];
    return [...baseKeys, ...productKeys];
  };

  const columnNames = getColumnNames();

  return (
    <div className={classes.main}>
      <div className={classes.main__content}>
        {report.length === 0 ? (
          <div className={classes.main__content__recordByDate}>
            <IconButton
              sx={{ borderRadius: "5px", height: "100%", aspectRatio: "1/1" }}
              onClick={(e) => navigate(e)}
              name={""}
            >
              <LogoutIcon />
            </IconButton>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Выберите дату"
                format={"DD/MM/YYYY"}
                value={date?.date || null}
                onChange={(value: Dayjs | null) => {
                  if (value === null) return;
                  const formatedDate = value.format("YYYY-MM-DD");
                  setDate({ date: value, formatedDate });
                }}
              />
            </LocalizationProvider>
            <Button variant={"contained"} sx={{ height: "100%" }} onClick={fetchReport}>
              Получить отчет
            </Button>
          </div>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  {columnNames.map((key) => (
                    <TableCell key={key} style={{ fontWeight: "bold" }}>
                      {parseColumnName(key)}
                    </TableCell>
                  ))}
                    <TableCell sx={{display: 'flex', gap: '10px'}}>
                      <IconButton sx={{borderRadius: '5px'}} onClick={fetchReportXlsx}>
                        <Download/>
                      </IconButton>
                      <Button variant={'contained'} onClick={() => setReport([])}>Отчистить</Button>
                    </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {report.flatMap((order, index) =>
                  order.products.map((product, pIndex) => (
                    <TableRow key={`${index}-${pIndex}`}>
                      {Object.keys(order)
                        .filter((key) => key !== "products")
                        .map((key) =>
                          pIndex === 0 ? (
                            <TableCell key={key} rowSpan={order.products.length}>
                              {order[key]}
                            </TableCell>
                          ) : null
                        )}
                      {Object.keys(product).filter((item) => item !== 'productId').map((key) => (
                        <TableCell key={key}>{product[key]}</TableCell>
                      ))}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </div>
  );
};

// Функция для парсинга названий столбцов
const parseColumnName = (key: string) => {
  const dictionary: Record<string, string> = {
    orderId: "№ заказа",
    clientName: "Клиент",
    totalAmount: "Сумма заказа",
    productName: "Товар",
    price: "Цена",
    quantity: "Количество",
  };

  return dictionary[key] || key;
};

export default ReportByDatePage;

import axios from 'axios';
import fileDownload from 'js-file-download';

export class ReportApi {
  static async GetReportByDate(date: string) {
    try {
      const { data } = await axios.get('http://localhost:5000/reports/deliverable-orders', {
        params: {
          date: date
        }
      });
      return data;
    } catch (e) {
      console.log('$', e);
      return [];
    }
  }

  static async GetReportByDateXlsx(date: string) {
    try {
      const { data } = await axios.get(`http://localhost:5000/reports/deliverable-orders-xlsx`, {
        params: { date },
        responseType: 'blob'
      });
      fileDownload(data, `report-${date}.xlsx`);
    } catch (error) {
      console.error('$:', error);
    }
  }

  static async GetReportByUser(dateRange: string[], clientId: number) {
    const [startDate, endDate] = dateRange;
    try {
      const { data } = await axios.get('http://localhost:5000/reports/client-orders', {
        params: {
          startDate,
          endDate,
          clientId
        }
      });
      return data;
    } catch (e) {
      console.log('$', e);
      return [];
    }
  }

  static async GetReportByUserXlsx(dateRange: string[], clientId: number) {
    const [startDate, endDate] = dateRange;
    try {
      const { data } = await axios.get('http://localhost:5000/reports/client-orders', {
        params: {
          startDate,
          endDate,
          clientId
        },
        responseType: 'blob'
      });
      fileDownload(data, `report-client-${clientId}.xlsx`);
    } catch (e) {
      console.log('$', e);
    }
  }
}

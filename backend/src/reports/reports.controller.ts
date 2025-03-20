import {Controller, Get, Query, Res} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportFilterDto } from './dto/report-filter.dto/report-filter.dto';
import { ClientOrdersReportDto } from './dto/client-orders-report.dto/client-orders-report.dto';
import { Response } from "express";

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('deliverable-orders')
  getDeliverableOrders(@Query() dto: ReportFilterDto) {
    return this.reportsService.getDeliverableOrdersReport(dto);
  }

  @Get('deliverable-orders-xlsx')
  getDeliverableOrdersXlsx(@Query() dto: ReportFilterDto, @Res() res: Response) {
    return this.reportsService.getDeliverableOrdersXlsx(dto, res);
  }

  @Get('client-orders')
  getClientOrders(@Query() dto: ClientOrdersReportDto) {
    return this.reportsService.getClientOrdersReport(dto);
  }

  @Get('client-orders-xlsx')
  getClientOrdersXlsx(@Query() dto: ClientOrdersReportDto, @Res() res: Response) {
    return this.reportsService.getClientOrdersXlsx(dto, res);
  }
}

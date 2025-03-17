import { Controller, Get, Query } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportFilterDto } from './dto/report-filter.dto/report-filter.dto';
import { ClientOrdersReportDto } from './dto/client-orders-report.dto/client-orders-report.dto';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('deliverable-orders')
  getDeliverableOrders(@Query() dto: ReportFilterDto) {
    return this.reportsService.getDeliverableOrdersReport(dto);
  }

  @Get('client-orders')
  getClientOrders(@Query() dto: ClientOrdersReportDto) {
    return this.reportsService.getClientOrdersReport(dto);
  }
}

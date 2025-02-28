import { Controller, Post, Body, UseFilters, Put, Get, Query, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { CreateBillingDto, UpdateBillingDto } from '../../Models/dto/billing.dto';
import { Billing } from '../../Models/billing.model';
import { HttpErrorFilter } from '../../common/filters/http-error.filter';
import { BillingsService } from 'server/src/services/billing.service';

@ApiTags('billings')
@Controller('billings')
@UseFilters(HttpErrorFilter)
export class BillingController {
    constructor(private readonly billingsService: BillingsService) { }

    @Post('create')
    @ApiOperation({ summary: 'Create a new billing' })
    @ApiBody({ type: CreateBillingDto })
    async create(@Body() createBillingDto: CreateBillingDto): Promise<Billing> {
        return await this.billingsService.createBilling(createBillingDto);
    }

    @Get('All')
    @ApiOperation({ summary: 'Get all billings' })
    @ApiResponse({ status: 200, description: 'Return all billings.' })
    async getAllBillings(): Promise<Billing[]> {
        return await this.billingsService.getAllBillings();
    }

    @Put('update')
    @ApiOperation({ summary: 'Update a billing by ID' })
    @ApiBody({ type: UpdateBillingDto })
    async update(@Body() updateBillingDto: UpdateBillingDto): Promise<Billing> {
        return await this.billingsService.updateBilling(updateBillingDto.id, updateBillingDto);
    }

    @Delete('delete')
    @ApiOperation({ summary: 'Delete a billing by ID' })
    @ApiQuery({ name: 'id', required: true, description: 'The ID of the billing to find' })
    async delete(@Query('id') id: string): Promise<Billing> {
        return await this.billingsService.deleteBilling(id);
    }
}

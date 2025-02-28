import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBillingDto, UpdateBillingDto } from '../Models/dto/billing.dto';
import { Billing } from '../Models/billing.model';

@Injectable()

export class BillingsService {
  billingIfRreturn:UpdateBillingDto;
  constructor(@InjectModel('Billing') private readonly BillingModel: Model<Billing>) { }

  async createBilling(createBillingDto: CreateBillingDto): Promise<Billing> {
    const createdBilling = new this.BillingModel(createBillingDto);
    return createdBilling.save();
  }

  async updateBilling(id: string, updateBillingDto: UpdateBillingDto): Promise<Billing> {
    const updatedBilling = await this.BillingModel.findByIdAndUpdate(
      id,
      updateBillingDto,
      { new: true }
    ).exec();
    if (!updatedBilling) {
      throw new NotFoundException('Billing not found');
    }
    return updatedBilling;
  }

  async deleteBilling(id: string): Promise<Billing> {
    const deletedBilling = await this.BillingModel.findByIdAndDelete(id).exec();
    if (!deletedBilling) {
      throw new NotFoundException('Billing not found');
    }
    return deletedBilling;
  }

  async getAllBillings(): Promise<Billing[]> {
    return this.BillingModel.find().exec();
  }

  async getBillingById(id: string): Promise<Billing> {
    try {
      const Billing = await this.BillingModel.findById(id).exec();
      if (!Billing) {
        throw new NotFoundException('Billing not found');
      }
      return Billing;
    } catch (err) {
      console.log(err);
    }
  }
  async updateBillingStatus(id: string, status: boolean): Promise<Billing> {
    console.log("start change billing status in billing service front ");
    const billing = await this.BillingModel.findById(id).exec();
    billing.ifRreturn = status;
    return billing.save();
  }
}
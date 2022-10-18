import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { NewCustomerDto } from 'src/customers/dtos/AddCustomer';
import { CustomersService } from 'src/customers/services/customers/customers.service';
@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}
  @Get('')
  getCustomer() {
    // return {
    //   id: 1,
    //   email: 'ankit.kumar@creolestudios.com',
    //   createdAt: new Date(),
    // };
    return this.customersService.customerDetail();
  }
  @Get(':id')
  getCustomerById(
    //ParseIntPipe tranform datatype, id is string transform to number
    @Param('id', ParseIntPipe) id: number,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    console.log(typeof id);

    let customer = this.customersService.customerById(id);

    if (customer) {
      res.send(customer);
    } else {
      res.status(400).send('customer doesnot available');
    }
  }
  @Get('/search/:id')
  searchById(@Param('id', ParseIntPipe) id: number) {
    let customer = this.customersService.customerById(id);
    if (customer) {
      return customer;
    } else {
      throw new HttpException(
        'customer doesnot available',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  @Get('new')
  getNewCustomer() {
    return this.customersService.getNewCustomer();
  }
  @Post('new')
  newCustomer(@Body() newCustomerDto: NewCustomerDto) {
    console.log(newCustomerDto);
    this.customersService.newcustomer(newCustomerDto);
  }
}

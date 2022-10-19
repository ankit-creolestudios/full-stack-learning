import { Injectable } from '@nestjs/common';
import { NewCustomerDto } from 'src/customers/dtos/AddCustomer';
import { Customer } from 'src/customers/types/customer';
@Injectable()
export class CustomersService {
  // array create

  private users: Customer[] = [
    {
      id: 1,
      name: 'ankit kumar',
      email: 'ankit.kumar@creolestudios.com',
      createdAt: new Date(),
    },
    {
      id: 2,
      name: 'john doe',
      email: 'john.doe@creolestudios.com',
      createdAt: new Date(),
    },
  ];
  customerDetail() {
    return this.users;
  }
  customerById(id: number) {
    return this.users.find((user) => user.id === id);
  }

  newcustomer(newcustomerDto: NewCustomerDto) {
    this.users.push(newcustomerDto);
  }
  getNewCustomer() {
    return this.users;
  }
}

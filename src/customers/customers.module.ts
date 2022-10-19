import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CustomersController } from './controllers/customers/customers.controller';
import { ValidateCustomerAcountMiddleware } from './middlewares/validate-customer-account.middleware';
import { ValidateCustomerMiddleware } from './middlewares/validate-customer.middleware';

import { CustomersService } from './services/customers/customers.service';

@Module({
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidateCustomerMiddleware, ValidateCustomerAcountMiddleware)

      //exclude() is use for remove path in which we dont want middleware , exclud route explicitly mention
      .exclude(
        {
          path: 'customers/create',
          method: RequestMethod.POST,
        },
        {
          path: 'customers',
          method: RequestMethod.GET,
        },
      )
      .forRoutes(
        // {
        //   path: 'customers/search/:id',
        //   method: RequestMethod.GET,
        // },
        // //we use multiple path to apply middleware
        // {
        //   path: 'customers/:id',
        //   method: RequestMethod.GET,
        // },

        CustomersController,
      );
    //forRoutes() use for apply middleware to specific routes
  }
}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeusersModule } from './typeusers/typeusers.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'server_rest',
      entities: ['dist/**/**.entity{.ts,.js}'],
      synchronize: true,
    }),
    ProductsModule,
    TypeusersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

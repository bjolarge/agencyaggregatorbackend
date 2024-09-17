import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as Joi from 'joi';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule as PinoLogger} from 'nestjs-pino';
import { UsersModule } from './users/users.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { EmailModule } from './email/email.module';
import { EmailConfirmationModule } from './email-confirmation/email-confirmation.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
       //PORT
       PORT: Joi.number().required(),
       //...SECRETS
       JWT_SECRET: Joi.string().required(),
       JWT_EXPIRATION_TIME: Joi.string().required(),
       // Refresh token part
       JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
       JWT_ACCESS_TOKEN_EXPIRATION_TIME: Joi.string().required(),
       JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
       JWT_REFRESH_TOKEN_EXPIRATION_TIME: Joi.string().required(),
       //google Oauth
       GOOGLE_ID: Joi.string().required(),
       GOOGLE_SECRET: Joi.string().required(),
       //Email Service
       EMAIL_SERVICE: Joi.string().required(),
       EMAIL_USER: Joi.string().required(),
       EMAIL_PASSWORD: Joi.string().required(),
       EMAIL_CONFIRMATION_URL: Joi.string().required(),
       JWT_VERIFICATION_TOKEN_SECRET:Joi.string().required(),
       JWT_VERIFICATION_TOKEN_EXPIRATION_TIME:Joi.string().required(),
     })
     }),

     TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
     useFactory: (configService: ConfigService) => ({
      type: 'postgres',
      host: configService.get('DB_HOST'),
      port: +configService.get<number>('DB_PORT'),
      username: configService.get('DB_USERNAME'), 
      password: configService.get('DB_PASSWORD'),
      database: configService.get('DB_NAME'),
      autoLoadEntities: true,
     //change this whilst going live in AgencyAgregatorApp production server to synchronise false
        synchronize:true,
      }),
      inject: [ConfigService],
    }),
    PinoLogger.forRoot({
      pinoHttp:{
        transport:{
          targets:[
        {
              target: 'pino/file',
              options: { destination:`C:/Logging/apps.log`},
        },
        ]
        }
      }
    }),
    UsersModule,
    AuthenticationModule,
    EmailModule,
    EmailConfirmationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

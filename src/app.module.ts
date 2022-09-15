import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Controllers
import { AuthController } from '@/auth/auth.controller';
import { UsersController } from '@/users/users.controller';
import { BlockchainAccountsController } from '@/blockchain-accounts/blockchain-accounts.controller';
import { TokensController } from '@/tokens/tokens.controller';
// Modules
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BlockchainAccountsModule } from './blockchain-accounts/blockchain-accounts.module';
import { TokensModule } from './tokens/tokens.module';
import { Web3Module } from './web3/web3.module';
// Services
import { AppService } from './app.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/blockchain'),
    AuthModule,
    UsersModule,
    BlockchainAccountsModule,
    TokensModule,
    Web3Module,
  ],
  controllers: [
    AuthController,
    UsersController,
    BlockchainAccountsController,
    TokensController,
  ],
  providers: [AppService],
})
export class AppModule {}

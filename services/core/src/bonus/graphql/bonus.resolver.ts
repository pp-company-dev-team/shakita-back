import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { UniqueArgs } from 'src/graphql/args/UniqueArgs';
import { Bonus } from './entities/bonus.enity';
import { BonusService } from '../bonus.service';
import { BonusTicket } from './entities/bonusTicket.entity';
import { ActiveBonusTicketArgs } from './args/ActiveBonusTicketArgs';
import { CreateOneBonusArgs } from './args/CreateOneBonusArgs';
import { CreateOneBonusTicketArgs } from './args/CreateOneBonusTicketArgs';
import { SuccessOutput } from 'src/graphql/dto/SuccessOutput';

@Resolver()
export class BonusResolver {
  constructor(private readonly bonusService: BonusService) {}

  @Mutation(() => Bonus, { nullable: true })
  async createBonus(@Args() args: CreateOneBonusArgs): Promise<Bonus> {
    return await this.bonusService.createBonus(args);
  }

  @Mutation(() => SuccessOutput, { nullable: true })
  async deleteBonus(@Args() args: UniqueArgs): Promise<SuccessOutput> {
    await this.bonusService.deleteBonus(args);
    return { success: true };
  }

  @Mutation(() => BonusTicket, { nullable: true })
  async createBonusTicket(
    @Args() args: CreateOneBonusTicketArgs,
  ): Promise<BonusTicket> {
    return await this.bonusService.createBonusTicket(args);
  }

  @Mutation(() => SuccessOutput, { nullable: true })
  async deleteBonusTicket(@Args() args: UniqueArgs): Promise<SuccessOutput> {
    await this.bonusService.deleteBonusTicket(args);
    return { success: true };
  }

  @Mutation(() => SuccessOutput, { nullable: true })
  async activateBonus(
    @Args() args: ActiveBonusTicketArgs,
  ): Promise<SuccessOutput> {
    await this.bonusService.activateBonus(args);
    return { success: true };
  }
}

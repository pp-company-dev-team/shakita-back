import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bonus } from './graphql/entities/bonus.enity';
import { BonusTicket } from './graphql/entities/bonusTicket.entity';
import { ActivatedBonus } from './graphql/entities/activatedBonus.entity';
import { ActiveBonusTicketArgs } from './graphql/args/ActiveBonusTicketArgs';
import { UniqueArgs } from 'src/graphql/args/UniqueArgs';
import { CreateOneBonusTicketArgs } from './graphql/args/CreateOneBonusTicketArgs';
import { User } from 'src/user/graphql/user.entity';

@Injectable()
export class BonusService {
  constructor(
    @InjectRepository(Bonus)
    private bonusRepository: Repository<Bonus>,
    @InjectRepository(BonusTicket)
    private bonusTicketRepository: Repository<BonusTicket>,
    @InjectRepository(ActivatedBonus)
    private activatedBonusRepository: Repository<ActivatedBonus>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  private async isActiveBonusTicket(ticket: BonusTicket, userId: string) {
    const isAlreadyActivated = Boolean(
      await this.activatedBonusRepository.findOne({
        where: {
          bonusTicketId: ticket.id,
          userId,
        },
      }),
    );
    const isActiveBonus = ticket.bonus.isActive;
    const isActiveBonusTicket =
      !ticket.activeTill || ticket.activeTill < new Date();
    const isUserCanActivate = ticket.user === null ?? ticket.user.id === userId;

    return (
      isActiveBonus &&
      isActiveBonusTicket &&
      isUserCanActivate &&
      !isAlreadyActivated
    );
  }

  async activateBonus(args: ActiveBonusTicketArgs) {
    const ticket = await this.bonusTicketRepository.findOne({
      where: {
        id: args.bonusTicketId,
      },
      relations: ['user', 'bonus'],
    });

    const isValid = await this.isActiveBonusTicket(ticket, args.userId);

    if (!isValid) {
      throw new BadRequestException(`Can't activate`);
    }

    return await this.activatedBonusRepository.save(args);
  }

  async createBonus(args: any) {
    return await this.bonusRepository.save(args);
  }

  async createBonusTicket(args: CreateOneBonusTicketArgs) {
    const queryArgs = args;

    const bonus = await this.bonusRepository.findOne({
      where: {
        id: args.bonusId,
      },
    });

    queryArgs['bonus'] = bonus;

    if (args.userId) {
      const user = await this.userRepository.findOne({
        where: {
          id: args.userId,
        },
      });
      queryArgs['user'] = user;
    }

    return await this.bonusTicketRepository.save(queryArgs);
  }

  async deleteBonus(args: UniqueArgs) {
    const bonus = await this.bonusRepository.findOne({
      where: {
        id: args.id,
      },
      relations: ['tickets'],
    });

    await Promise.all(
      bonus.tickets?.map(async (ticket) => {
        await this.bonusTicketRepository.delete(ticket.id);
      }),
    );

    return await this.bonusRepository.delete(args.id);
  }

  async deleteBonusTicket(args: UniqueArgs) {
    return await this.bonusTicketRepository.delete(args.id);
  }
  // TODO
  // async update(args: any) {
  //   return await this.bonusTicketRepository.update(args.id, args);
  // }

  async findBonusTicketById(id: string) {
    return await this.bonusTicketRepository.findOne({
      where: {
        id,
      },
      relations: ['bonus'],
    });
  }

  async findManyBonusTicketsByUserId(id: string) {
    return await this.bonusTicketRepository.findOne({
      where: {
        user: {
          id,
        },
      },
      relations: ['bonus'],
    });
  }
}

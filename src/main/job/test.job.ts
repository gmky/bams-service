import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class TestJob {
  private readonly log = new Logger(TestJob.name);

  @Cron('30 * * * * *')
  createNextRound() {
    const now = new Date();
    this.log.log(`Create next round info at ${now.toUTCString()}`);
    now.setSeconds(0);
    now.setMinutes(now.getMinutes() + 1);
    this.log.debug(`startTime: ${now.toUTCString()}`);
    now.setMinutes(now.getMinutes() + 1);
    this.log.debug(`endTime: ${now.toUTCString()}`);
  }
}

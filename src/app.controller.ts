import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
    @Get("health")
    health() {
        return "system is running"
    }
}

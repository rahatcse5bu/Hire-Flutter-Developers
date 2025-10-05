import { TestsService } from './tests.service';
export declare class TestsController {
    private readonly testsService;
    constructor(testsService: TestsService);
    findAll(): any[];
}

import { from } from 'rxjs';

export { IndraCoreModule } from './indra-core.module';
export * from './services/logger.service';
export { ElipsisPipe, CapitalizePipe, StripTagsPipe } from './pipes/cadenas.pipe';
export { ToComaDecimalPipe, LocalDecimalPipe } from './pipes/numericos.pipe';

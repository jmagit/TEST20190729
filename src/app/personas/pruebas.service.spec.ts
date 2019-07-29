import { TestBed } from '@angular/core/testing';
import { PersonasDAOService } from './servicios.service';

xdescribe('PersonasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PersonasDAOService = TestBed.get(PersonasDAOService);
    expect(service).toBeTruthy();
  });
});

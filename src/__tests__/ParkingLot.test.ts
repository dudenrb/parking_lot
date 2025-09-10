import { ParkingLot } from '../core/ParkingLot';

describe('ParkingLot core functionality', () => {
  let pl: ParkingLot;

  beforeEach(() => {
    pl = new ParkingLot();
  });

  test('create parking lot', () => {
    expect(pl.createParkingLot(6)).toBe('Created a parking lot with 6 slots');
  });

  test('park and allocation until full', () => {
    pl.createParkingLot(2);
    expect(pl.park('KA-01-HH-1234', 'White')).toBe('Allocated slot number: 1');
    expect(pl.park('KA-01-BB-0001', 'Black')).toBe('Allocated slot number: 2');
    expect(pl.park('KA-01-HH-9999', 'White')).toBe('Sorry, parking lot is full');
  });

  test('leave frees slot and reallocate nearest', () => {
    pl.createParkingLot(2);
    pl.park('A', 'Red');
    pl.park('B', 'Blue');
    expect(pl.leave(1)).toBe('Slot number 1 is free');
    expect(pl.park('C', 'Green')).toBe('Allocated slot number: 1');
  });

  test('queries by colour & registration', () => {
    pl.createParkingLot(5);
    pl.park('R1', 'White');
    pl.park('R2', 'White');
    pl.park('R3', 'Black');

    expect(pl.registrationNumbersForCarsWithColour('White')).toBe('R1, R2');
    expect(pl.slotNumbersForCarsWithColour('White')).toBe('1, 2');
    expect(pl.slotNumberForRegistrationNumber('R3')).toBe('3');
    expect(pl.slotNumberForRegistrationNumber('X')).toBe('Not found');
  });

  test('status exact format', () => {
    pl.createParkingLot(3);
    pl.park('KA-01-HH-1234', 'White');
    pl.park('KA-01-BB-0001', 'Black');

    expect(pl.status()).toBe(
      [
        'Slot No. Registration No Colour',
        '1 KA-01-HH-1234 White',
        '2 KA-01-BB-0001 Black'
      ].join('\n')
    );
  });

  test('edge cases: Not found and invalid slot handling', () => {
    pl.createParkingLot(2);
    pl.park('KA-01-HH-1234', 'White');

    expect(pl.registrationNumbersForCarsWithColour('Black')).toBe('Not found');
    expect(pl.slotNumbersForCarsWithColour('Black')).toBe('Not found');
    expect(pl.slotNumberForRegistrationNumber('MH-04-AY-1111')).toBe('Not found');
    expect(pl.leave(2)).toBe('Slot number 2 is already free');
    expect(pl.leave(5)).toBe('Slot number 5 is invalid');
  });

  test('simulate full sequence (like file_inputs.txt)', () => {
    pl.createParkingLot(6);
    expect(pl.park('KA-01-HH-1234', 'White')).toBe('Allocated slot number: 1');
    expect(pl.park('KA-01-HH-9999', 'White')).toBe('Allocated slot number: 2');
    expect(pl.park('KA-01-BB-0001', 'Black')).toBe('Allocated slot number: 3');
    expect(pl.park('KA-01-HH-7777', 'Red')).toBe('Allocated slot number: 4');
    expect(pl.park('KA-01-HH-2701', 'Blue')).toBe('Allocated slot number: 5');
    expect(pl.park('KA-01-HH-3141', 'Black')).toBe('Allocated slot number: 6');

    expect(pl.leave(4)).toBe('Slot number 4 is free');

    expect(pl.status()).toBe(
      [
        'Slot No. Registration No Colour',
        '1 KA-01-HH-1234 White',
        '2 KA-01-HH-9999 White',
        '3 KA-01-BB-0001 Black',
        '5 KA-01-HH-2701 Blue',
        '6 KA-01-HH-3141 Black'
      ].join('\n')
    );

    expect(pl.registrationNumbersForCarsWithColour('White')).toBe('KA-01-HH-1234, KA-01-HH-9999');
    expect(pl.slotNumbersForCarsWithColour('White')).toBe('1, 2');
    expect(pl.slotNumberForRegistrationNumber('KA-01-HH-3141')).toBe('6');
    expect(pl.slotNumberForRegistrationNumber('MH-04-AY-1111')).toBe('Not found');
  });
});

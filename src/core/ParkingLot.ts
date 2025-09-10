import { MinHeap } from './MinHeap';

export type Car = { registration: string; color: string; };

export class ParkingLot {
    private capacity = 0;
    private slots: Array<Car | null> = [];
    private freeSlots = new MinHeap();
    private initialized = false;

    createParkingLot(n: number): string {
        if (n <= 0) throw new Error('Invalid number of slots');
        this.capacity = n;
        this.slots = new Array(n).fill(null);
        this.freeSlots = new MinHeap();
        for (let i = 1; i <= n; i++) this.freeSlots.insert(i);
        this.initialized = true;
        return `Created a parking lot with ${n} slots`;
    }

    park(registration: string, color: string): string {
        if (!this.initialized) return 'Parking lot has not been created';
        const slot = this.freeSlots.pop();
        if (slot === null) return 'Sorry, parking lot is full';
        this.slots[slot - 1] = { registration, color };
        return `Allocated slot number: ${slot}`;
    }

    leave(slotNumber: number): string {
        if (!this.initialized) return 'Parking lot has not been created';
        if (slotNumber < 1 || slotNumber > this.capacity) return `Slot number ${slotNumber} is invalid`;
        if (this.slots[slotNumber - 1] === null) return `Slot number ${slotNumber} is already free`;
        this.slots[slotNumber - 1] = null;
        this.freeSlots.insert(slotNumber);
        return `Slot number ${slotNumber} is free`;
    }

    status(): string {
        if (!this.initialized) return 'Parking lot has not been created';
        const lines: string[] = [];
        lines.push('Slot No. Registration No Colour');
        for (let i = 0; i < this.capacity; i++) {
            const car = this.slots[i];
            if (car !== null) {
                lines.push(`${i + 1} ${car.registration} ${car.color}`);
            }
        }
        return lines.join('\n');
    }


    registrationNumbersForCarsWithColour(color: string): string {
        if (!this.initialized) return 'Parking lot has not been created';
        const regs = this.slots
            .map((c) => (c && c.color.toLowerCase() === color.toLowerCase() ? c.registration : null))
            .filter(Boolean) as string[];
        return regs.length ? regs.join(', ') : 'Not found';
    }

    slotNumbersForCarsWithColour(color: string): string {
        if (!this.initialized) return 'Parking lot has not been created';
        const slots = this.slots
            .map((c, idx) => (c && c.color.toLowerCase() === color.toLowerCase() ? String(idx + 1) : null))
            .filter(Boolean) as string[];
        return slots.length ? slots.join(', ') : 'Not found';
    }

    slotNumberForRegistrationNumber(registration: string): string {
        if (!this.initialized) return 'Parking lot has not been created';
        for (let i = 0; i < this.capacity; i++) {
            const car = this.slots[i];
            if (car !== null && car.registration === registration) return String(i + 1);
        }
        return 'Not found';
    }
}

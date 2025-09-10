#!/usr/bin/env node
import * as fs from 'fs';
import * as readline from 'readline';
import { ParkingLot } from '../core/ParkingLot';

function handleLine(pl: ParkingLot, rawLine: string) {
    const line = rawLine.trim();
    if (!line) return;
    const parts = line.split(/\s+/);
    const cmd = parts[0];

    switch (cmd) {
        case 'create_parking_lot':
            if (parts.length < 2) console.log('Invalid command');
            else console.log(pl.createParkingLot(parseInt(parts[1], 10)));
            break;
        case 'park':
            if (parts.length < 3) console.log('Invalid command');
            else console.log(pl.park(parts[1], parts[2]));
            break;
        case 'leave':
            if (parts.length < 2) console.log('Invalid command');
            else console.log(pl.leave(parseInt(parts[1], 10)));
            break;
        case 'status':
            console.log(pl.status());
            break;
        case 'registration_numbers_for_cars_with_colour':
            if (parts.length < 2) console.log('Invalid command');
            else console.log(pl.registrationNumbersForCarsWithColour(parts[1]));
            break;
        case 'slot_numbers_for_cars_with_colour':
            if (parts.length < 2) console.log('Invalid command');
            else console.log(pl.slotNumbersForCarsWithColour(parts[1]));
            break;
        case 'slot_number_for_registration_number':
            if (parts.length < 2) console.log('Invalid command');
            else console.log(pl.slotNumberForRegistrationNumber(parts[1]));
            break;
        case 'exit':
            process.exit(0);
        default:
            console.log('Invalid command');
    }
}

async function run() {
    const args = process.argv.slice(2);
    const pl = new ParkingLot();

    if (args.length > 0) {
        const filePath = args[0];
        const content = fs.readFileSync(filePath, 'utf-8');
        const lines = content.split(/\r?\n/);
        for (const l of lines) {
            if (!l.trim()) continue;
            handleLine(pl, l);
        }
    } else {
        const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
        rl.setPrompt('> ');
        rl.prompt();
        rl.on('line', (line) => {
            handleLine(pl, line);
            rl.prompt();
        }).on('close', () => process.exit(0));
    }
}

run();

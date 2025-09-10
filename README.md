### 🅿️ Parking Lot Automation System

This project is a production-grade **Parking Lot Automation System** implemented in **TypeScript**. It's designed as a CLI application that can operate in two modes: **interactive** and **file-based**.

The system manages parking slots, allocating cars to the nearest available slot and providing various queries for car and slot information. The core logic is robust and handles several functional requirements and edge cases.

-----

### 🔧 Functional Commands

The system supports the following commands:

  * **`create_parking_lot <number_of_slots>`**: Creates a new parking lot with a specified number of slots, numbered sequentially from 1.
  * **`park <registration_number> <car_color>`**: Parks a car in the lowest-numbered available slot.
  * **`leave <slot_number>`**: Frees up a specific slot.
  * **`status`**: Displays the current status of the parking lot, showing occupied slots with car details.
  * **`registration_numbers_for_cars_with_colour <color>`**: Lists all registration numbers of cars with a given color.
  * **`slot_numbers_for_cars_with_colour <color>`**: Lists all slot numbers occupied by cars of a given color.
  * **`slot_number_for_registration_number <reg_number>`**: Returns the slot number for a specific car based on its registration number.

-----

### 🎮 Modes of Operation

The application can be run in two ways:

#### 📝 File-based Mode

To process commands from a file, provide the file path as an argument.

```bash
$ bin/parking_lot file_inputs.txt
```

A sample `file_inputs.txt` is included in the project for testing.

#### 💻 Interactive Shell

If no file is provided, the application launches an interactive command-line interface.

```bash
$ bin/parking_lot
```

Type commands directly into the shell and press Enter to execute. Use the `exit` command to quit the session.

-----

### 🧪 Testing

The project is configured with a comprehensive test suite using **Jest** and **ts-jest** to ensure correctness and stability.

Tests cover:

  * All functional requirements.
  * Edge cases (e.g., lot full, slot not found, invalid commands).
  * Full sequence simulations that mimic real-world usage.

To run the tests, use the following command:

```bash
npm test
```

The `bin/setup` script automatically installs dependencies, builds the project, and runs all tests.

-----

### 📂 Project Structure

The project is organized into a logical directory structure to separate concerns and improve maintainability.

```
parking_lot/
├─ bin/
│  ├─ setup                 # Installation and setup script
│  └─ parking_lot           # CLI launcher
├─ src/
│  ├─ bin/
│  │  └─ parking_lot.ts     # Main CLI entrypoint
│  ├─ core/
│  │  ├─ MinHeap.ts         # Logic for finding the nearest available slot
│  │  └─ ParkingLot.ts      # Core parking lot management logic
│  └─ __tests__/
│     └─ ParkingLot.test.ts # Jest unit tests
├─ file_inputs.txt          # Sample input file for file-based mode
├─ package.json
├─ tsconfig.json
├─ jest.config.cjs
├─ .gitignore
└─ README.md
```

-----

### 📦 Installation and Usage

To set up the project and run the application, follow these steps:

1.  Navigate to the `parking_lot` directory.
2.  Run the setup script:

<!-- end list -->

```bash
$ bin/setup
```

This command will install all required npm packages, build the TypeScript code, and run the tests to verify the setup.

3.  Choose your mode of operation:
      * **File-based**: `$ bin/parking_lot file_inputs.txt`
      * **Interactive**: `$ bin/parking_lot`

-----

### 📦 Archiving

To create a distributable zip archive of the project, use the following command from the root directory:

```bash
zip -r parking_lot.zip parking_lot -x "parking_lot/node_modules/*" -x "parking_lot/dist/*"
```

This will exclude the large `node_modules` and `dist` directories, keeping the archive size minimal.

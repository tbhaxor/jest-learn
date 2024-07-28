# Jest Learn

This repository contains test cases and examples created while learning the Jest testing framework. It includes various concepts such as hooks, mocking globals, Jest timers, `it.each`, and Jest coverage.

## Getting Started

To get started with this repository, follow the steps below:

### Prerequisites

Make sure you have Node.js and npm installed on your machine. You can download Node.js from [nodejs.org](https://nodejs.org/).

### Steps to Run

1. Clone the repository

   ```console
   git clone https://github.com/tbhaxor/jest-learn.git
   ```

2. Navigate to the project directory

   ```console
   cd jest-learn
   ```

3. Install node-modules

   ```console
   npm ci
   ```

4. Run the tests

   ```console
   npm test
   ```

## Features

- **Hooks**: Examples of using beforeAll, beforeEach, afterAll, and afterEach hooks in Jest.
- **Mocking Globals**: Demonstrates how to mock global objects and functions.
- **Jest Timers**: Usage of Jest's timer mocks such as jest.useFakeTimers() and jest.runAllTimers().
- **Parameterised Tests**: Examples of using it.each for running parameterised tests.
- **Coverage**: How to generate and view test coverage reports using Jest.

## Coverage

To generate and view the test coverage report, run:

```console
npm test -- --coverage
```

After the tests complete, a coverage report will be generated in the coverage directory. You can open the `index.html` file in a browser to view the detailed coverage report.

```console
python3 -m http.server -d coverage
```

> [!NOTE]
> Open `http://localhost:8000/` in the browser.

## Contributing

If you encounter any bugs or have suggestions for improvements, please feel free to open issues or submit pull requests. Your contributions are highly valued, and I encourage you to explore the project and experiment with its features.

You can add more test cases to the existing source files or create your own to enhance the testing framework. Your participation will help improve the project and ensure its robustness.

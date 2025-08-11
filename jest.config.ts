import { createDefaultPreset } from "ts-jest";
import type { Config } from "jest";

const tsJestTransformCfg = createDefaultPreset().transform;
const jestConfig: Config = {
    moduleNameMapper: {
        '^\#/(.*)$': '<rootDir>/lib/$1'
    },
    testEnvironment: "node",
    transform: {...tsJestTransformCfg},
    verbose: true,
    collectCoverage: true,
    collectCoverageFrom: ["./lib/**"],
    errorOnDeprecated: true,
    randomize: true,
    showSeed: true,
    slowTestThreshold: 10,
    testRegex: "(/tests/.*|(\\.|/)(test|spec))\\.[mc]?[jt]sx?$"
}

export default jestConfig
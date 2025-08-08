import { createDefaultPreset } from "ts-jest";
import type { Config } from "jest";

const tsJestTransformCfg = createDefaultPreset().transform;
const jestConfig: Config = {
    moduleNameMapper: {
        '^\#/(.*)$': '<rootDir>/lib/$1'
    },
    testEnvironment: "node",
    transform: {...tsJestTransformCfg}
}

export default jestConfig
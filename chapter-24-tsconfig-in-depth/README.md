# Chapter 24: tsconfig.json in Depth

## 1. Introduction

`tsconfig.json` is a configuration file used by the TypeScript compiler.

It defines how TypeScript checks and compiles TypeScript files into JavaScript.

It helps developers manage compiler settings, project files, output folders, and type-checking rules.

**Example:**

```json
{
    "compilerOptions": {
        "target": "ES2020",
        "module": "CommonJS",
        "strict": true
    }
}
```

## 2. Creating tsconfig.json

You can create a TypeScript configuration file using the TypeScript compiler.

**Command:**

```bash
tsc --init
```

This command generates a `tsconfig.json` file with many available compiler options.

You can customize the settings according to your project requirements.

## 3. What are compilerOptions?

The `compilerOptions` property contains settings that control TypeScript compilation.

**Example:**

```json
{
    "compilerOptions": {
        "target": "ES2020",
        "module": "CommonJS",
        "strict": true
    }
}
```

Here:
- `target` controls the JavaScript version generated.
- `module` controls the module system.
- `strict` enables strict type checking.

## 4. target

The `target` option specifies the JavaScript version that TypeScript generates.

**Example:**

```json
{
    "compilerOptions": {
        "target": "ES2020"
    }
}
```

Common values:

| Target | Description |
|---|---|
| ES5 | Older JavaScript support |
| ES2015 | ES6 JavaScript |
| ES2017 | ES2017 JavaScript |
| ES2020 | ES2020 JavaScript |
| ESNext | Latest supported JavaScript features |

The selected target affects the JavaScript output.

## 5. module

The `module` option controls the module format used in the generated JavaScript.

**Example:**

```json
{
    "compilerOptions": {
        "module": "CommonJS"
    }
}
```

Common module options:

| Module | Description |
|---|---|
| CommonJS | Commonly used in Node.js projects |
| ESNext | Uses modern ECMAScript modules |
| NodeNext | Supports Node.js module rules |
| AMD | Asynchronous Module Definition |
| UMD | Universal Module Definition |

Choose a module setting that matches your runtime and package configuration.

## 6. rootDir

The `rootDir` option specifies the root folder of source files.

**Example:**

```json
{
    "compilerOptions": {
        "rootDir": "./src"
    }
}
```

This tells TypeScript that the source files are inside the `src` directory.

## 7. outDir

The `outDir` option specifies where compiled JavaScript files are generated.

**Example:**

```json
{
    "compilerOptions": {
        "outDir": "./dist"
    }
}
```

If TypeScript compiles a file from `src`, its JavaScript output is placed in the corresponding location inside `dist`.

## 8. strict

The `strict` option enables a group of strict type-checking options.

**Example:**

```json
{
    "compilerOptions": {
        "strict": true
    }
}
```

It helps detect common programming mistakes.

Important strict options include:

- `noImplicitAny`
- `strictNullChecks`
- `strictFunctionTypes`
- `strictBindCallApply`
- `strictPropertyInitialization`
- `noImplicitThis`
- `useUnknownInCatchVariables`

These options can also be configured individually.

## 9. noImplicitAny

This option prevents TypeScript from automatically assigning the `any` type when a type cannot be inferred.

**Example:**

```typescript
function display(value) {
    console.log(value);
}
```

With `noImplicitAny: true`, TypeScript reports an error because the parameter has an implicit `any` type.

**Correct code:**

```typescript
function display(value: string): void {
    console.log(value);
}
```

## 10. strictNullChecks

This option checks whether a value can be `null` or `undefined`.

**Example:**

```typescript
let username: string = "Rahul";

// Error: null is not assignable to string
// username = null;
```

**Correct code:**

```typescript
let username: string | null = "Rahul";

username = null;
```

## 11. noEmit

The `noEmit` option tells TypeScript to perform type checking without generating JavaScript files.

**Example:**

```json
{
    "compilerOptions": {
        "noEmit": true
    }
}
```

This is useful when another tool handles the actual code transformation.

## 12. sourceMap

The `sourceMap` option generates source map files.

**Example:**

```json
{
    "compilerOptions": {
        "sourceMap": true
    }
}
```

Source maps help developers debug generated JavaScript by connecting it to the original TypeScript source.

When enabled, TypeScript generates `.js.map` files.

## 13. declaration

The `declaration` option generates `.d.ts` declaration files during compilation.

**Example:**

```json
{
    "compilerOptions": {
        "declaration": true
    }
}
```

These files describe the types of exported code and are useful when publishing TypeScript libraries.

## 14. removeComments

The `removeComments` option removes comments from generated JavaScript files.

**Example:**

```json
{
    "compilerOptions": {
        "removeComments": true
    }
}
```

It does not remove comments from your original TypeScript files.

## 15. noUnusedLocals and noUnusedParameters

These options help identify unused variables and function parameters.

**Example:**

```json
{
    "compilerOptions": {
        "noUnusedLocals": true,
        "noUnusedParameters": true
    }
}
```

Example:

```typescript
function greet(name: string, age: number): void {
    console.log(name);
}
```

If `age` is unused, TypeScript reports an error when `noUnusedParameters` is enabled.

## 16. include, exclude, and files

These properties control which files are included in the TypeScript project.

**include:**

Specifies file patterns to include.

```json
{
    "include": ["src/**/*.ts"]
}
```

**exclude:**

Specifies file patterns to exclude from the project.

```json
{
    "exclude": ["node_modules", "dist"]
}
```

**files:**

Specifies individual files to include.

```json
{
    "files": [
        "src/index.ts",
        "src/app.ts"
    ]
}
```

When both `files` and `include` are specified, their selected files are combined.

## 17. lib

The `lib` option specifies which built-in JavaScript and environment type definitions are available.

**Example:**

```json
{
    "compilerOptions": {
        "target": "ES2020",
        "lib": [
            "ES2020",
            "DOM",
            "DOM.Iterable"
        ]
    }
}
```

Common library definitions:

| Library | Purpose |
|---|---|
| ES2020 | JavaScript ES2020 APIs |
| DOM | Browser APIs such as document and window |
| DOM.Iterable | Iterable DOM collections |
| WebWorker | Web Worker APIs |

For browser projects, DOM definitions are useful. For Node.js projects, Node.js types are commonly installed separately.

## 18. moduleResolution

The `moduleResolution` option controls how TypeScript finds imported modules.

Common values include:

- `Node`
- `NodeNext`
- `Bundler`
- `Classic`

For modern Node.js projects, `NodeNext` is commonly used with compatible module settings.

For projects using modern bundlers, `Bundler` may be suitable.

## 19. esModuleInterop

This option improves compatibility between CommonJS and ES module imports.

**Example:**

```json
{
    "compilerOptions": {
        "esModuleInterop": true
    }
}
```

It enables more convenient default imports from certain CommonJS packages.

## 20. skipLibCheck

This option skips type checking of declaration files.

**Example:**

```json
{
    "compilerOptions": {
        "skipLibCheck": true
    }
}
```

It can reduce compilation time in projects with many dependencies.

It does not disable type checking of your own TypeScript files.

## 21. Incremental Compilation

The `incremental` option enables incremental compilation.

**Example:**

```json
{
    "compilerOptions": {
        "incremental": true
    }
}
```

TypeScript stores build information so that later compilations can reuse previous results.

## 22. Professional Project Structure

A common TypeScript project structure looks like this:

```text
my-project/
│
├── src/
│   ├── index.ts
│   ├── app.ts
│   └── utils.ts
│
├── dist/
│
├── package.json
├── tsconfig.json
└── README.md
```

The `src` directory contains source files, while `dist` contains generated JavaScript files.

## 23. Practical tsconfig.json

Example configuration for a simple Node.js TypeScript project using CommonJS:

```json
{
    "compilerOptions": {
        "target": "ES2020",
        "module": "CommonJS",
        "moduleResolution": "Node",
        "rootDir": "./src",
        "outDir": "./dist",
        "strict": true,
        "noImplicitAny": true,
        "strictNullChecks": true,
        "noUnusedLocals": true,
        "noUnusedParameters": true,
        "sourceMap": true,
        "declaration": true,
        "esModuleInterop": true,
        "skipLibCheck": true
    },
    "include": ["src/**/*.ts"],
    "exclude": ["node_modules", "dist"]
}
```

This configuration is suitable for a basic CommonJS project. Module settings should be adjusted for projects using other runtimes or bundlers.

## 24. Important Points

- `tsconfig.json` controls TypeScript compiler settings.
- `tsc --init` creates a configuration file.
- `target` controls the JavaScript output version.
- `module` controls the generated module format.
- `rootDir` specifies the source root.
- `outDir` specifies the output folder.
- `strict` enables strict type checking.
- `include` and `exclude` control project file selection.
- `sourceMap` supports debugging.
- `declaration` generates `.d.ts` files.
- `noEmit` prevents JavaScript generation.
- `moduleResolution` controls how imports are located.

## 25. Practice Tasks

1. Create a `tsconfig.json` file using `tsc --init`.
2. Set the JavaScript target to ES2020.
3. Configure the module system as CommonJS.
4. Set `rootDir` to `src` and `outDir` to `dist`.
5. Enable strict type checking.
6. Enable source maps and declaration file generation.
7. Enable `noUnusedLocals` and `noUnusedParameters`.
8. Create a project that compiles only TypeScript files inside `src`.


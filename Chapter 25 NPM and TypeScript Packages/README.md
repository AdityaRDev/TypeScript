# Chapter 25: NPM and TypeScript Packages

## 1. Introduction

NPM stands for Node Package Manager.

It is the default package manager for Node.js and is used to install, manage, and share JavaScript and TypeScript-related packages.

NPM helps developers use existing libraries instead of writing everything from scratch.

Examples of popular packages:

- Express – Web application framework.
- Lodash – JavaScript utility library.
- Axios – HTTP client.
- TypeScript – TypeScript compiler.
- React – User interface library.

## 2. What is a Package?

A package is a collection of code that can be installed and reused in an application.

For example, instead of creating every utility function yourself, you can install a package that already provides useful functions.

Example:

```bash
npm install lodash
```

This command installs the Lodash package.

## 3. What is package.json?

`package.json` is an important file in an NPM project.

It contains project information, dependencies, scripts, and other configuration details.

Example:

```json
{
    "name": "my-typescript-project",
    "version": "1.0.0",
    "description": "My TypeScript project",
    "main": "dist/index.js",
    "scripts": {
        "build": "tsc",
        "start": "node dist/index.js"
    },
    "dependencies": {},
    "devDependencies": {}
}
```

Important properties:

- `name`: Project name.
- `version`: Project version.
- `description`: Project description.
- `main`: Package entry point.
- `scripts`: Commands that can be executed using NPM.
- `dependencies`: Packages needed by the application at runtime.
- `devDependencies`: Packages used during development and building.

## 4. Creating an NPM Project

Use the following command to initialize an NPM project:

```bash
npm init
```

It asks questions about the project and creates a `package.json` file.

You can also use:

```bash
npm init -y
```

The `-y` option accepts the default answers automatically.

## 5. Installing Packages

Use `npm install` to install a package.

Example:

```bash
npm install lodash
```

This command:

- Downloads Lodash.
- Adds it to `node_modules`.
- Adds it to `dependencies` in `package.json`.
- Updates `package-lock.json`.

You can also use the shorter command:

```bash
npm i lodash
```

## 6. Dependencies

Dependencies are packages required by an application when it runs.

Example:

```bash
npm install express
```

Express is added to the `dependencies` section.

Example:

```json
{
    "dependencies": {
        "express": "^5.1.0"
    }
}
```

The exact version depends on the version available when you install the package.

## 7. Development Dependencies

Development dependencies are packages used during development, testing, or building.

Example:

```bash
npm install --save-dev typescript
```

Short form:

```bash
npm install -D typescript
```

TypeScript is commonly installed as a development dependency because the application generally runs the generated JavaScript.

Other development dependencies include:

- TypeScript compiler.
- Testing tools.
- Code formatters.
- Development tools.

Example:

```json
{
    "devDependencies": {
        "typescript": "^5.0.0"
    }
}
```

## 8. Difference Between dependencies and devDependencies

| dependencies | devDependencies |
|---|---|
| Needed by the application at runtime | Used during development or building |
| Installed using npm install package | Installed using npm install -D package |
| Listed under dependencies | Listed under devDependencies |
| Example: Express | Example: TypeScript |

A package can be a dependency or development dependency depending on how your project uses it.

## 9. Installing TypeScript Locally

Instead of relying only on a globally installed TypeScript compiler, you can install TypeScript inside your project.

Command:

```bash
npm install --save-dev typescript
```

Now you can use the project's local compiler:

```bash
npx tsc
```

`npx` can execute locally installed package commands.

This helps projects use their own configured TypeScript version.

## 10. What is node_modules?

`node_modules` is the directory where NPM installs packages and their dependencies.

Example:

```text
my-project/
│
├── node_modules/
│   ├── typescript/
│   └── lodash/
│
├── package.json
└── package-lock.json
```

Important points:

- It contains installed packages.
- It can become large.
- It is normally excluded from Git.
- It can be recreated using `npm install`.

Do not manually edit installed package files.

## 11. What is package-lock.json?

`package-lock.json` records the exact dependency versions and their resolved dependency information.

It helps different developers install consistent dependency trees.

Example:

```text
package.json
package-lock.json
node_modules/
```

Important differences:

- `package.json` declares the dependencies and acceptable version ranges.
- `package-lock.json` records the resolved dependency versions.

When sharing a project, commit `package-lock.json` to Git.

## 12. What is Semantic Versioning?

Semantic Versioning is a version-numbering system.

A version commonly follows this format:

```text
MAJOR.MINOR.PATCH
```

Example:

```text
5.4.2
```

Here:

- `5` is the major version.
- `4` is the minor version.
- `2` is the patch version.

Meaning:

- MAJOR: Introduces incompatible changes.
- MINOR: Adds backward-compatible functionality.
- PATCH: Fixes backward-compatible bugs.

## 13. Version Symbols in NPM

NPM supports version ranges.

| Symbol | Meaning |
|---|---|
| `^` | Allows compatible updates without changing the major version |
| `~` | Allows patch updates within the specified minor version |
| `*` | Allows any version |
| Exact version | Uses the specified version |

Examples:

```json
{
    "dependencies": {
        "lodash": "^4.17.21",
        "example": "~1.2.3"
    }
}
```

`^4.17.21` allows compatible updates below version 5.0.0.

`~1.2.3` allows patch updates within the 1.2 release line.

Always review dependency changes before updating production applications.

## 14. NPM Scripts

NPM scripts allow developers to create reusable commands inside `package.json`.

Example:

```json
{
    "scripts": {
        "build": "tsc",
        "start": "node dist/index.js",
        "dev": "tsc --watch"
    }
}
```

Run these scripts using:

```bash
npm run build
npm start
npm run dev
```

The `start` and `test` scripts can also be run without writing `run`.

## 15. Using External Packages in TypeScript

After installing a package, you can import it into a TypeScript file.

Example using Lodash:

```bash
npm install lodash
npm install -D @types/lodash
```

TypeScript code:

```typescript
import _ from "lodash";

const numbers = [10, 20, 30, 40, 50];

const result = _.chunk(numbers, 2);

console.log(result);
```

Output:

```text
[ [ 10, 20 ], [ 30, 40 ], [ 50 ] ]
```

Lodash provides reusable utility functions.

Its `@types/lodash` package provides TypeScript declarations.

## 16. What is .gitignore?

`.gitignore` specifies files and folders that Git should not track.

Example:

```text
node_modules/
dist/
.env
```

This prevents unnecessary generated files, installed dependencies, and environment files from being committed.

Important: Do not ignore `package.json` or `package-lock.json` in a normal NPM project.

## 17. Important NPM Commands

| Command | Purpose |
|---|---|
| `npm init -y` | Initialize an NPM project |
| `npm install` | Install dependencies from package.json |
| `npm install lodash` | Install a package |
| `npm install -D typescript` | Install a development dependency |
| `npm uninstall lodash` | Remove a package |
| `npm update` | Update dependencies within allowed version ranges |
| `npm list` | Display installed packages |
| `npm list --depth=0` | Display top-level installed packages |
| `npm outdated` | Check for outdated packages |
| `npm audit` | Check dependencies for known security vulnerabilities |
| `npx tsc` | Run the local TypeScript compiler |

## 18. Practical Project Structure

A typical TypeScript project can look like this:

```text
my-typescript-project/
│
├── src/
│   ├── index.ts
│   ├── app.ts
│   └── utils.ts
│
├── dist/
│
├── node_modules/
│
├── package.json
├── package-lock.json
├── tsconfig.json
├── .gitignore
└── README.md
```

The `src` directory contains TypeScript source code.

The `dist` directory contains generated JavaScript.

The `node_modules` directory contains installed packages.

## 19. Important Points

- NPM manages JavaScript and TypeScript project packages.
- `package.json` stores project information and dependency declarations.
- `package-lock.json` records the resolved dependency tree.
- `dependencies` are used by the application at runtime.
- `devDependencies` are used for development and building.
- `node_modules` stores installed packages.
- `npx` can execute locally installed package commands.
- NPM scripts simplify common project commands.
- Semantic Versioning uses MAJOR.MINOR.PATCH.
- `.gitignore` prevents selected files from being tracked by Git.

## 20. Practice Tasks

1. Create a new NPM project using `npm init -y`.
2. Install TypeScript as a development dependency.
3. Install Lodash as a dependency.
4. Install `@types/lodash` as a development dependency.
5. Create a TypeScript file and import Lodash.
6. Create `build`, `start`, and `dev` scripts.
7. Create a `.gitignore` file.
8. Explore `package.json` and `package-lock.json`.
9. Run `npm list --depth=0`.
10. Run `npm audit` and understand its output.

8806614661 7498005667
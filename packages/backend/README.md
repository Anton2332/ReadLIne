## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```

## Hooks Installation

1. Ask your teammates for `git-hooks` folder.
2. Copy that folder inside project folder.
3.

```bash

$ ./git-hooks/setup-hooks

```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run dev

# production mode
$ yarn run prod

# debug mode
$ yarn debug
```

## Project structure

### Constants

```

-- constants
---- index.ts
---- example.const.ts

```

There is a place to store your constants. To create a new constant you should create a file inside a `constants` folder with the following name `<file-name>.constant.ts`.

### Decorators

```

-- decorators
---- index.ts
---- example.decorator.ts

```

In case if you need to create a param/class/arg decorator you should place that into `decorators` dir.

### Dtos

```

-- dtos
---- index.ts
---- example.dto.ts

```

DTO - this is object with validation decorators (`class-transform`). All body validations and api documentation are performed due to that DTOs. In case if you need to create encapsulated DTOs you can do it directly in a `module/<module-name>/dtos`

### Entities

```

-- entities
---- index.ts
---- example.entity.ts

```

You should store a shared entities in the `entities` dir. But it will be much common situation for you to create `entities` folder inside yours `module/<module-name>`

### Guards

```

-- guards
---- index.ts
---- example.guard.ts

```

There are a bunch of useful guards have been created in `guards` directory. But you can add any others here to. Guard - perfect way to validate and manage access of your `controllers`.

### Helpers

```

-- helpers
---- index.ts
---- example.helper.ts

```

All helpers should be placed here. Much better to create a helpers as a class and group similar logic into the class. Do not create any helpers inside `modules` move them at global level

### Modules

```

-- modules
---- example-module
-------- controllers
-------- dtos
-------- entities
-------- services
-------- types

```

Modules is the core of application. Each feature should be created as a separate module (Example: `modules/users` or `modules/auth`).

### Types

```

-- types
---- index.ts
---- example.type.ts

```

In case if you have any shard `interfaces`, `types`, `enums` you should move it to `types` dir.


### Development convention

`@ApiColumn` - should be applied for fields in `entity`

`@ApiController` - should be used as default controller in every module

`@ApiGet/@ApiPost/@ApiPut/@ApiPatch/@ApiDelete` - should be used for all public accessible methods of controller

`@ApiAuthGet/@ApiAuthPost/@ApiAuthPut/@ApiAuthPatch/@ApiAuthDelete` - should be used for all private controller methods

## License

Nest is [MIT licensed](LICENSE).

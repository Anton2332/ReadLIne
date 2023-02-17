## CGS-team React boilerplate


## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run dev

# production mode
$ yarn run prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Project structure

### Constants

```

-- consts
---- index.ts
---- example.const.ts

```

There is a place to store your constants. To create a new constant you should create a file inside a `const` folder with the following name `<file-name>.const.ts`.

### Decorators

```

-- decorators
---- index.ts
---- example.decorator.ts

```

In case if you need to create a param/class/arg decorator you should place that into `decorators` dir.


### Utils

```

-- utils
---- index.ts
---- example.helper.ts

```

All helpers should be placed here. Much better to create a helpers as a class and group similar logic into the class. Do not create any helpers inside `modules` move them at global level

### Modules

```

-- modules
---- example-module
-------- components
-------- hooks
-------- utils
-------- services
-------- types

```

Modules is the core of application. Each feature should be created as a separate module (Example: `modules/users` or `modules/auth`).

### Hooks

```

-- hooks
---- index.ts
---- example.hook.ts

```

Use hooks to incapsulate some logic related to component state, logic, rendering. If you want to create generic hook which will be used all around the app - place it in common module.

### Types

```

-- types
---- index.ts
---- example.type.ts

```

In case if you have any shard `interfaces`, `types`, `enums` you should move it to `types` dir.

### Components

Components should consists from 3 main parts.

index.ts - file which used for comfortable importing of the component
example.styled.tsx - all styles related to the component should be handled by that
example.component.tsx - component itself it imports styles and services from other modules


```
-- example
---- index.ts
---- example.styled.tsx
---- example.component.tsx

```

## Development convention

### REST Api calls

To make a calls to external API or to backend API you should use `common/services/http-factory.service.ts`. Use DI and classes composition in Featured service.

For non auth service use:

```

class ExampleHttpService {
    constructor(private httpService: IHttpClient) {}
}

const instance = new ExampleHttpService(new HttpFactory().createHttpService());

```

For auth service use:

```

class ExampleHttpService {
    constructor(private httpService: IHttpClient) {}
}

const instance = new ExampleHttpService(new HttpFactory().createAuthHttpService())

```

### Multy language support

All apps by default should be handled with i18n.

## Typography

For all text component use `GlobalTypography.Text` define a proper `colorVariants`, `variant` and `fontWeight` in config file.
```
<GlobalTypography.Text
    variant="subtitle1"
    colorVariant="primary"
    fontWeight="medium"
>
	Your Personal Trusted List
</GlobalTypography.Text>

```


### Adaptivity

For adaptive design you should use [Material UI layout system](https://mui.com/material-ui/getting-started/overview/) also try to reuse Material UI components or create extended components based on MUI.

```
<Grid container>
    <Grid item xs={6} lg={12}>
        <GlobalTypography.Text
            variant="subtitle1"
            colorVariant="primary"
            fontWeight="medium"
        >
            Your Personal Trusted List
        </GlobalTypography.Text>
    </Grid>
    <Grid item xs={6} lg={12}>
        ////
    </Grid>
</Grid>
```
### Themes

App color pallet theme should be done via [MUI THEME](https://mui.com/material-ui/experimental-api/css-theme-variables/overview/#main-content). All colors should be handled by that.

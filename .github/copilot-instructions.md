# acme-ui Copilot instructions

## Commands

- `npm start` runs the Angular dev server (`ng serve`) on `http://localhost:4200/`.
- `npm run build` runs the production build (`ng build`). Angular budgets from `angular.json` are enforced, including `initial` bundle budgets and `anyComponentStyle` budgets.
- `npm run watch` runs `ng build --watch --configuration development`.
- `npm test` runs the Karma test runner (`ng test`).
- `npx ng test --watch=false --browsers=ChromeHeadless --include="src/app/path/to/file.spec.ts"` runs a single spec file. There are currently no committed `src/**/*.spec.ts` files, so create the spec first.
- There is no lint script or ESLint configuration in this repository today.

## Architecture

- `src/main.ts` bootstraps the standalone `AppComponent` with `appConfig`.
- `src/app/app.config.ts` is the runtime wiring point for the router, `provideHttpClient()`, theme initialization, and the custom `Platform` provider from `src/services/platform`.
- `src/app/app.routes.ts` maps the app to standalone route components in `src/app/views/*`. The root route currently points to `SettingsComponent`.
- `AppComponent` does not render page content directly; it only mounts `<main-container>`. The actual shell lives in `src/lib/layout`, where `MainContainer` composes the toolbar, side menu, and `<router-outlet>`.
- Shared UI lives under `src/lib/widgets` and `src/lib/layout`. Route views are standalone components, but the reusable widget and layout layers still use `WidgetsModule` and `LayoutModule`.
- `src/lib/styles/theme.ts` is the main source of visual state. `ThemeService` owns the active palette and chart theme through `BehaviorSubject`s, and many components subscribe to it to restyle themselves.
- Charts are built on AmCharts 3. The vendor scripts are loaded globally from `angular.json`, and chart widgets in `src/lib/widgets/charts` use `@amcharts/amcharts3-angular`.
- `src/services/api` contains Swagger Codegen output for customer, product, and purchase endpoints. Those services default to `http://localhost:8080` unless `BASE_PATH` or `Configuration.basePath` overrides it.
- `src/services/platform` is a custom, Ionic-style platform abstraction used for orientation, device/platform detection, and shared platform config.

## Conventions

- Add new screen-level pages as standalone components under `src/app/views`, then register them in `src/app/app.routes.ts`.
- Put reusable UI in `src/lib/widgets` or `src/lib/layout`, not in `src/app/views`.
- Theme-aware components usually subscribe to `ThemeService.activeTheme` and apply colors/styles imperatively with `ViewChild` + `nativeElement`, often in `AfterViewInit`. Follow that pattern when changing existing widgets.
- Keep chart changes compatible with the current AmCharts 3 setup instead of switching individual widgets to a different chart library.
- Treat `src/services/api/api/*.service.ts` and `src/services/api/model/*` as generated files. Prefer wrappers/adapters or regeneration over hand-editing generated output.
- Angular CLI schematics are configured for SCSS and `skipTests: true` in `angular.json`, so generated components/services will follow that shape unless you override it.
- TypeScript is only partially strict here: `strict` is enabled, but `strictNullChecks` and `strictPropertyInitialization` are disabled in `tsconfig.json`. Match the existing type-safety level when editing older code.

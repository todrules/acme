# AGENTS.md

## Project Snapshot
- Angular 17 standalone app bootstrapped in `src/main.ts` with `appConfig` from `src/app/app.config.ts`.
- `AppComponent` (`src/app/app.component.ts`) is a shell mount point only; template renders `<main-container>` from `src/lib/layout/main-container/main-container.ts`.
- Route views are standalone components under `src/app/views/*`, wired in `src/app/app.routes.ts` (default route currently `SettingsComponent`).
- Reusable UI is module-based (`src/lib/widgets/widgets.module.ts`, `src/lib/layout/layout.module.ts`) even though route pages are standalone.

## Core Architecture And Data Flow
- Runtime providers are centralized in `src/app/app.config.ts`: router, `provideHttpClient()`, `ThemeService` init token (`INIT_THEME`), and custom `Platform` setup.
- Theme state lives in `src/lib/styles/theme.ts` (`ThemeService.activeTheme` and `allThemes` are `BehaviorSubject`s).
- Theme changes propagate by subscription in components, often in `AfterViewInit`, then styles are applied imperatively via `nativeElement` (example: `src/lib/layout/main-container/main-container.ts`).
- Chart widgets in `src/lib/widgets/charts/*` use `@amcharts/amcharts3-angular`; chart config is instantiated in component TS (example: `src/lib/widgets/charts/bar/bar-chart.ts`).
- Backend access is Swagger-generated client code in `src/services/api`; services default to `http://localhost:8080` (example: `src/services/api/api/customerController.service.ts`).
- Platform/device/orientation behavior comes from the custom Ionic-style abstraction in `src/services/platform/platform.ts` plus registry rules in `src/services/platform/platform-registry.ts`.

## Developer Workflows
- Dev server: `npm start` (`ng serve`, default `http://localhost:4200/`).
- Production build: `npm run build` (enforces `angular.json` budgets including `initial` and `anyComponentStyle`).
- Watch build: `npm run watch` (`ng build --watch --configuration development`).
- Unit tests: `npm test` (Karma).
- Single spec run: `npx ng test --watch=false --browsers=ChromeHeadless --include="src/app/path/to/file.spec.ts"`.
- There is currently no lint script / ESLint config in this repo.

## Conventions For AI Agents
- Add new screen/page components under `src/app/views` as standalone components, then register them in `src/app/app.routes.ts`.
- Put reusable presentation logic in `src/lib/widgets` or `src/lib/layout`, not in `src/app/views`.
- Keep chart work compatible with AmCharts 3; do not swap chart libraries per-widget.
- Treat `src/services/api/api/*.service.ts` and `src/services/api/model/*` as generated artifacts; prefer wrappers/adapters or regeneration.
- Angular schematics default to SCSS and `skipTests: true` (`angular.json`), so generated files follow that baseline unless explicitly overridden.
- TypeScript is partially strict (`strict: true`, but `strictNullChecks` and `strictPropertyInitialization` are false in `tsconfig.json`); match local style when editing older code.

## Integration Notes
- AmCharts vendor scripts are globally injected by `angular.json` (`build.options.scripts`); chart widgets assume those globals exist.
- API base URL can be overridden via DI `BASE_PATH` (`src/services/api/variables.ts`) or `Configuration.basePath`.
- The app shell (`main-container`) combines toolbar, sidemenu, and `<router-outlet>`, so route components should focus on page content, not frame layout.


# lobola-calculator
Questionnaire game developed over the weekend for fun and jokes ;-) 

http://www.lobolo.co.za

Lobola is property in cash or kind, which a prospective husband or head of his family undertakes to give to the head of a prospective wife’s family in consideration of a customary marriage.[1] Historically, this property was in cattle, but over time it has moved to being mostly in cash. Some people still practice the tradition of offering cattle, or even a combination of cattle and money.

https://en.wikipedia.org/wiki/Lobolo

## Frontend Dependencies

The site is a static HTML/CSS/JS app and now depends on:

- local Bootstrap 4.6.2 assets in `bootstrap/`
- local `bs-stepper` 1.7.0 assets in `vendor/bs-stepper/`
- local jQuery 3.5.1 in `vendor/jquery/`
- local show fonts in `vendor/fonts/`

The wizard migration intentionally stopped at Bootstrap 4.x. Do not mix old Bootstrap 3 assets/classes back into the page.

## Compatibility Notes

`calculations.js` and `messages.js` were intentionally left functionally unchanged during the migration and hardening pass. The current questionnaire still relies on the existing selector contract:

- answer groups keep their existing IDs such as `#eduGroup`
- scoring reads the active choice through `label.active input`
- some radio inputs still share the original `name` values

That behavior is intentionally preserved to avoid changing questionnaire flow, scoring, and generated results. If you ever refactor the answer markup, update all dependent selectors safely before changing this contract.

## Run Locally

Because this is a static site, a simple local server is enough:

```bash
python -m http.server 8000
```

Then open [http://localhost:8000/index.html](http://localhost:8000/index.html).

On Windows, `py -m http.server 8000` works as well.

## Smoke Testing

A lightweight manual smoke checklist lives in [docs/SMOKE_TEST.md](docs/SMOKE_TEST.md).

## Quiz-Show UI Notes

The current UI pushes the stable Bootstrap 4 + `bs-stepper` migration into a stronger quiz-show presentation while keeping the app static and lightweight:

- a stage-like hero and round banner to make each step feel like a show segment
- richer step states for current, completed, and upcoming rounds
- smoother progress-bar movement and step-panel reveal motion
- larger answer buttons with stronger hover, focus, and locked-in selected states
- a more dramatic finish board and result reveal for the final quote and cow output
- subtle status and validation feedback that still stays fast on mobile

Motion stays CSS-first and respects `prefers-reduced-motion`, which disables non-essential animation and hover movement while keeping every state change readable and usable.

Important selector constraint: the questionnaire still intentionally preserves the `label.active input` contract because `calculations.js` depends on it. Shared radio naming, answer group IDs, and inline answer handlers are also intentionally left in place for compatibility.

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

`messages.js` still only drives the per-answer info dialogue, while `calculations.js` now remaps the final questionnaire score into the current Rand display range. The questionnaire still relies on the existing selector contract:

- answer groups keep their existing IDs such as `#eduGroup`
- scoring reads the active choice through `label.active input`
- some radio inputs still share the original `name` values

That behavior is intentionally preserved to avoid changing questionnaire flow, scoring, and generated results. If you ever refactor the answer markup, update all dependent selectors safely before changing this contract.

## Step Behavior Notes

- each question step now auto-advances once every required answer group in the current step has a selected option
- the auto-advance delay is `320ms` so the move feels intentional instead of abrupt
- the `Next` button still remains available as a manual fallback
- existing validation rules still block incomplete manual `Next` attempts

## Run Locally

Because this is a static site, a simple local server is enough:

```bash
python -m http.server 8000
```

Then open [http://localhost:8000/index.html](http://localhost:8000/index.html).

On Windows, `py -m http.server 8000` works as well.

## Smoke Testing

A lightweight manual smoke checklist lives in [docs/SMOKE_TEST.md](docs/SMOKE_TEST.md).

## Game-Show UI Notes

The current UI is a presentation-only redesign inspired by a dramatic prime-time quiz show atmosphere while keeping the app static and lightweight:

- a dark stage backdrop with spotlight gradients and marquee accents around the main card
- a stronger round banner and step rail so the flow feels like advancing through televised rounds
- larger answer buttons styled like “final answer” choices with a more obvious locked-in state
- a more cinematic reveal board for the final amount, cow meter, quote, and fairness feedback section
- short CSS-first motion for panel entry, answer lock-in, progress emphasis, and the final reveal moment

Motion still respects `prefers-reduced-motion`, which disables non-essential animation and hover movement while keeping every state change readable and usable.

Important compatibility note: this redesign does not change questionnaire logic. The app still intentionally preserves the `label.active input` scoring contract, the existing answer group IDs, shared radio naming, and the inline answer handlers because `calculations.js` and `messages.js` still depend on those hooks.

## Result Range Notes

The current scoring model keeps the existing questionnaire inputs but remaps the verified raw score range of `12` to `69` into a displayed lobola estimate range of `R10,000` to `R100,000`.

- higher raw score still means a higher estimate
- the displayed amount is linearly normalized across the raw range
- the displayed amount is rounded to the nearest `R1,000` for readability
- cow icons now scale separately from `1` to `11` based on the displayed Rand estimate instead of the older raw-score tiers
- clicking `#resultCalc` now triggers a replayable reveal animation for the button, result board, and cow display

Legacy contracts intentionally preserved:

- `label.active input` remains the scoring selector contract
- answer group IDs such as `#eduGroup` remain stable
- the existing questions, answers, flow, and inline answer handlers remain in place

## Fairness Feedback Notes

The reveal screen now includes a lightweight fairness feedback section:

- “Was this calculation fair?” with `👍 Yes` and `👎 No` selection buttons
- an optional “Tell us why” comment area styled into the existing reveal board
- lazy-loaded Cusdis embed support so the widget is only requested when the user engages with the feedback section

Cusdis configuration lives in one place in [index.html](./index.html):

```html
window.LOBOLA_CONFIG = Object.assign({
  cusdisHost: 'https://cusdis.com',
  cusdisAppId: ''
}, window.LOBOLA_CONFIG || {});
```

- set `cusdisAppId` to your Cusdis website/app ID to enable comments
- leave `cusdisAppId` blank to keep the fairness vote UI without loading Cusdis
- set `cusdisHost` only if you are using a self-hosted Cusdis instance

Comment length note: this project only gives a best-effort “Keep it under 500 characters” prompt. Cusdis’s official SDK attributes do not expose a `maxlength` option, and the current official widget source does not set a `maxlength` on its textarea, so this repo does not claim a hard 500-character cap.

Sources used for that limitation check:

- [Cusdis JS SDK attributes](https://github.com/djyde/cusdis/blob/master/public/doc/advanced/sdk.md)
- [Cusdis reply form source](https://github.com/djyde/cusdis/blob/master/widget/components/Reply.svelte)

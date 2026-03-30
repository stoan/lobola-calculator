# Smoke Test Checklist

Use this checklist after changing `index.html`, Bootstrap assets, or stepper wiring.

## Start The Site

Run a simple static server from the repository root:

```bash
python -m http.server 8000
```

Open `http://localhost:8000/index.html`.

## Desktop Check

Use a desktop width around `1280px`.

- The page loads without console errors.
- The step header shows all 6 stages and remains readable.
- The progress bar starts at `17%`.
- Clicking `Next` on Step 1 without answering shows the Step 1 validation alert.
- Answer all questions in Step 1 and `Next` advances to Step 2.
- `Previous` returns to Step 1 without losing the visible active selections.
- Complete all steps and confirm the Finish step shows `100%`.
- Clicking `Generate Quote!` updates the score, quote text, info message, and cow images.

## Tablet Check

Use a tablet width around `768px`.

- Step headers wrap cleanly and remain tappable.
- Previous and Next buttons stay visible and easy to press.
- Question button groups wrap without clipping or horizontal scrolling.

## Mobile Check

Use a mobile width around `390px`.

- Step headers wrap into multiple rows without overlapping.
- The page does not introduce horizontal scrolling.
- Answer buttons remain readable and easy to tap.
- Previous and Next buttons stack cleanly.
- Validation messages remain visible near the top of the active step.

## Regression Guardrails

- With `prefers-reduced-motion` enabled, the UI should stay readable and usable without relying on animation.
- Do not change the `label.active input` scoring selector contract unless all dependent logic is updated safely.
- Do not rename the answer group IDs without updating every selector in the existing JS.
- Do not change questionnaire flow, scoring rules, or result text as part of UI-only cleanup.

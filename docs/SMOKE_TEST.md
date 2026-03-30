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
- The hero, round banner, and step header show the quiz-show framing clearly and remain readable.
- The progress bar starts at `17%`.
- Clicking `Next` on Step 1 without answering shows the Step 1 validation alert.
- Answer the final required question in Step 1 and confirm the app auto-advances to Step 2 after a short pause.
- Answer only part of a step and confirm it does not auto-advance early.
- The round banner updates when the active step changes.
- `Previous` returns to Step 1 without losing the visible active selections.
- Manual `Next` still works as a fallback on completed steps.
- Complete all steps and confirm the Finish step shows `100%`.
- Clicking `Reveal Final Quote` updates the Rand estimate, score summary, quote text, info message, and cow images.
- The final estimate stays between `R10,000` and `R100,000`.
- Clicking `Reveal Final Quote` again replays the reveal cleanly without breaking the result state.
- The fairness section appears only on the reveal screen.
- Clicking `👍 Yes` or `👎 No` shows a clear selected state and reveals the optional comment area.
- If `window.LOBOLA_CONFIG.cusdisAppId` is blank, the reveal screen shows the configuration hint instead of trying to mount Cusdis.
- If `window.LOBOLA_CONFIG.cusdisAppId` is set correctly, the Cusdis iframe loads in the reveal screen after feedback is selected.

## Tablet Check

Use a tablet width around `768px`.

- Step headers wrap cleanly and remain tappable.
- Previous and Next buttons stay visible and easy to press.
- Question button groups wrap without clipping or horizontal scrolling.
- The fairness buttons and comment area stay readable on the reveal screen.

## Mobile Check

Use a mobile width around `390px`.

- Step headers wrap into multiple rows without overlapping.
- The round banner and progress chip stay readable without clipping.
- The page does not introduce horizontal scrolling.
- Answer buttons remain readable and easy to tap.
- Previous and Next buttons stack cleanly.
- Validation messages remain visible near the top of the active step.
- Cow icons remain readable and do not overflow the result area.
- The fairness buttons remain easy to tap and the comment area does not overflow.

## Regression Guardrails

- With `prefers-reduced-motion` enabled, the UI should stay readable and usable without relying on animation.
- In reduced-motion mode, the result still updates correctly even though the reveal animation is suppressed.
- Current, completed, and upcoming step states should still be visually distinct even without motion.
- Auto-advance should only trigger after the current step is fully complete.
- Do not change the `label.active input` scoring selector contract unless all dependent logic is updated safely.
- Do not rename the answer group IDs without updating every selector in the existing JS.
- Do not change questionnaire flow or the underlying answer values when adjusting the displayed Rand remap.
- The 500-character comment guidance is best-effort only unless Cusdis adds an officially supported `maxlength` option.

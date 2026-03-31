# Smoke Test Checklist

Use this checklist after changing `index.html`, `quiz-show.css`, or quiz-flow wiring.

## Start The Site

Run a simple static server from the repository root:

```bash
python -m http.server 8000
```

Open `http://localhost:8000/index.html`.

## Desktop Check

Use a desktop width around `1280px`.

- The page loads without console errors.
- The hero, round banner, and quiz board show the dramatic game-show framing clearly and remain readable.
- Only one question is visible at a time.
- The progress bar starts at `0%`.
- The round track reads like passive progress markers, not clickable stepper tabs.
- Selecting the visible answer locks it in and auto-advances after a short pause.
- The flow does not auto-advance until an answer is selected for the current question.
- The round banner updates when the current question moves into a new round.
- `Previous Question` returns to the prior question without losing the visible active selection.
- `Continue` stays hidden during the normal unanswered flow, then appears as a fallback when revisiting an already answered question.
- Complete all questions and confirm the reveal screen shows `100%`.
- Clicking `Reveal Final Quote` updates the Rand estimate, cow-meter summary, quote text, info message, and cow images.
- The final estimate stays between `R10,000` and `R100,000`.
- The cow count stays between `1` and `11`.
- Clicking `Reveal Final Quote` again replays the reveal cleanly without breaking the result state.
- The fairness section appears only on the reveal screen.
- Clicking `👍 Yes` or `👎 No` shows a clear selected state and reveals the optional comment area.
- If `window.LOBOLA_CONFIG.cusdisAppId` is blank, the reveal screen shows the configuration hint instead of trying to mount Cusdis.
- If `window.LOBOLA_CONFIG.cusdisAppId` is set correctly, the Cusdis iframe loads in the reveal screen after feedback is selected.

## Tablet Check

Use a tablet width around `768px`.

- Round markers wrap cleanly and remain readable.
- Decorative banner accents do not overlap the stage title or copy.
- Previous and Continue controls stay visible and easy to press when they are supposed to appear.
- Question button groups wrap without clipping or horizontal scrolling.
- The fairness buttons and comment area stay readable on the reveal screen.

## Mobile Check

Use a mobile width around `390px`.

- Round markers wrap into multiple rows or columns without overlapping.
- The round banner and progress chip stay readable without clipping.
- The page does not introduce horizontal scrolling.
- Answer buttons remain readable and easy to tap.
- Previous and Continue buttons stack cleanly when both are visible.
- Cow icons remain readable and do not overflow the result area.
- The fairness buttons remain easy to tap and the comment area does not overflow.

## Regression Guardrails

- With `prefers-reduced-motion` enabled, the UI should stay readable and usable without relying on animation.
- In reduced-motion mode, the result still updates correctly even though the reveal animation is suppressed.
- Current, completed, and upcoming round markers should still be visually distinct even without motion.
- Auto-advance should only trigger after the current visible question is answered.
- Do not change the `label.active input` scoring selector contract unless all dependent logic is updated safely.
- Do not rename the answer group IDs without updating every selector in the existing JS.
- Do not change questionnaire flow or the underlying answer values when adjusting the displayed Rand remap.
- The 500-character comment guidance is best-effort only unless Cusdis adds an officially supported `maxlength` option.

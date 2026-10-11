---
name: NURT CRM
description: Sales dashboard run like an operations room; today's departure board of actions first, numbers after.
colors:
  graphite-ground: "#0a0d11"
  graphite-panel: "#10151b"
  graphite-panel-raised: "#151b23"
  graphite-rule: "#212a35"
  graphite-rule-strong: "#2c3744"
  signage-white: "#e9eef3"
  steel-text: "#a3aebb"
  steel-faint: "#808b99"
  board-amber: "#ffb020"
  board-amber-ink: "#ffc04d"
  board-amber-wash: "rgba(255,176,32,.13)"
  lamp-green: "#3fd69a"
  lamp-green-wash: "rgba(63,214,154,.13)"
  lamp-red: "#ff6f61"
  lamp-red-wash: "rgba(255,111,97,.14)"
  previous-period-slate: "#5d6a7a"
  on-amber: "#1a1204"
  paper-ground: "#e9edf1"
  paper-panel: "#ffffff"
  paper-panel-raised: "#f4f6f8"
  paper-rule: "#dbe1e8"
  paper-rule-strong: "#c8d0da"
  paper-ink: "#0e1319"
  paper-text: "#475261"
  paper-faint: "#5f6b7a"
  paper-amber: "#f2a100"
  paper-amber-ink: "#9a5b00"
  paper-amber-wash: "rgba(242,161,0,.16)"
  paper-green: "#0c8a5b"
  paper-green-wash: "rgba(12,138,91,.12)"
  paper-red: "#c9372b"
  paper-red-wash: "rgba(201,55,43,.1)"
  paper-previous-period: "#9aa5b3"
typography:
  headline:
    fontFamily: "Atkinson Hyperlegible Next, system-ui, sans-serif"
    fontSize: "30px"
    fontWeight: 800
    lineHeight: 1.5
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Atkinson Hyperlegible Next, system-ui, sans-serif"
    fontSize: "22px"
    fontWeight: 800
    letterSpacing: "-0.015em"
  panel-title:
    fontFamily: "Atkinson Hyperlegible Next, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 700
    letterSpacing: "-0.015em"
  body:
    fontFamily: "Atkinson Hyperlegible Next, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.5
  body-small:
    fontFamily: "Atkinson Hyperlegible Next, system-ui, sans-serif"
    fontSize: "13.5px"
    fontWeight: 400
  label:
    fontFamily: "Atkinson Hyperlegible Next, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 600
    letterSpacing: "0.05em"
  figure-large:
    fontFamily: "Atkinson Hyperlegible Mono, ui-monospace, monospace"
    fontSize: "clamp(28px, 2.6vw, 38px)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.02em"
    fontFeature: "tnum"
  figure:
    fontFamily: "Atkinson Hyperlegible Mono, ui-monospace, monospace"
    fontSize: "clamp(22px, 2vw, 28px)"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.02em"
    fontFeature: "tnum"
  figure-inline:
    fontFamily: "Atkinson Hyperlegible Mono, ui-monospace, monospace"
    fontSize: "15px"
    fontWeight: 600
    fontFeature: "tnum"
rounded:
  bar: "2px"
  tag: "4px"
  control: "6px"
  panel: "8px"
  sheet-top: "12px"
  lamp: "50%"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  row: "14px"
  gutter: "18px"
  panel: "20px"
  page: "28px"
components:
  button-segment-on:
    backgroundColor: "{colors.board-amber}"
    textColor: "{colors.on-amber}"
    rounded: "{rounded.control}"
    height: "34px"
    padding: "0 14px"
  button-secondary:
    backgroundColor: "{colors.graphite-panel-raised}"
    textColor: "{colors.signage-white}"
    rounded: "{rounded.control}"
    height: "38px"
    padding: "0 14px"
  button-icon:
    backgroundColor: "{colors.graphite-panel}"
    textColor: "{colors.steel-text}"
    rounded: "{rounded.panel}"
    size: "42px"
  chip:
    textColor: "{colors.steel-text}"
    rounded: "{rounded.control}"
    height: "34px"
    padding: "0 12px"
  chip-on:
    backgroundColor: "{colors.signage-white}"
    textColor: "{colors.graphite-panel}"
    rounded: "{rounded.control}"
  input-search:
    backgroundColor: "{colors.graphite-panel}"
    rounded: "{rounded.panel}"
    height: "42px"
    padding: "0 12px 0 36px"
  panel:
    backgroundColor: "{colors.graphite-panel}"
    rounded: "{rounded.panel}"
    padding: "20px"
  stage-pill:
    backgroundColor: "{colors.graphite-panel-raised}"
    textColor: "{colors.steel-text}"
    rounded: "{rounded.tag}"
    padding: "3px 9px"
  nav-item-on:
    backgroundColor: "{colors.board-amber-wash}"
    textColor: "{colors.signage-white}"
    rounded: "{rounded.control}"
    height: "42px"
    padding: "0 12px"
---

# Design System: NURT CRM

## Overview

**Creative North Star: "The Departure Board"**

NURT is a sales dashboard dressed as an operations room. The ground is graphite, the panels are ruled with single hairlines, and the only warm thing on screen is the amber of the board signal: the active period, the current time, the next action, this period's revenue line. Everything else is either neutral steel or a status lamp. Green and red are not decoration; they are lamps that report on a row, a delta, a quota.

Density is operational, not editorial. Rows are 50-60px, panels sit 18px apart on a 12-column grid, and the first viewport is a timetable of today's actions beside a single pace meter for the month. Numbers and times are set in a monospaced tabular face so columns of figures line up like a flight board, and when figures change they briefly scramble through digits before settling, like split-flap characters.

The light theme is a twin, not an inversion: cool paper ground, white panels, the same rules and lamps with darkened inks so they keep contrast on white. Both themes are first-class.

**Key Characteristics:**
- Graphite (or cool paper) ground, flat 1px-ruled panels, no glass, no gradients on surfaces.
- One warm signal (amber) reserved for "now" and "this period"; green/red only as status.
- Atkinson Hyperlegible Next for all words, Atkinson Hyperlegible Mono for every number and time.
- Small, square-ish corners: 6px controls, 8px panels, 2px data bars.
- Shadows only on things that float above the board.

## Colors

A graphite control-room palette with one amber signal and two status lamps, mirrored by a cool-paper light twin whose inks are darkened for white.

### Primary
- **Board Amber** (`board-amber`; light twin `paper-amber`): the signal. Active segment of the period switch, the pace meter fill, this period's chart line and area wash, source bars, the "now" row divider and its time badge, focus outlines, text selection. Always paired with **On-Amber** ink when it is a fill.
- **Amber Ink** (`board-amber-ink`; light `paper-amber-ink`): amber used as text: board times, the open-count figure, the clock, the sorted table header, the in-progress status label, the "next step" heading. On light the ink drops to a deep ochre so it reads on white; never set text in the fill amber.
- **Amber Wash** (`board-amber-wash`; light `paper-amber-wash`): the background of the current board row, the active rail/tab item, the "next step" box, the stage-2 pill.

### Secondary
- **Lamp Green** (`lamp-green`; light `paper-green`): done/on-track. Status lamp on ok rows, positive KPI deltas, the final funnel step, team bars at or above pace, the best source conversion, the pressed done-tick, stage-3 (won) pill on **Green Wash**.
- **Lamp Red** (`lamp-red`; light `paper-red`): late/behind. Late row lamp (with a 3px red-wash halo) and its time, negative deltas, weak funnel conversion, team members below pace, stale last-contact dates, stage-4 (lost) pill on **Red Wash**.

### Neutral
- **Graphite Ground** / **Paper Ground**: page background and the sticky top bar.
- **Graphite Panel** / **Paper Panel**: panels, rail, sheet, tabbar, inputs.
- **Raised Panel** (`graphite-panel-raised` / `paper-panel-raised`): row hover, table/board header band, bar tracks, tags, tooltips, the pace verdict, avatars.
- **Rule** / **Strong Rule**: 1px panel borders and row dividers; the strong rule for interactive outlines (tick, avatar, tooltip, sheet edge, table header underline).
- **Signage White** / **Paper Ink**: primary text; also the inverted fill of the active chip and the toast.
- **Steel Text** / **Paper Text**: secondary text, labels, owners, idle controls.
- **Steel Faint** / **Paper Faint**: tertiary text, column headers, axes, timestamps, idle lamps and neutral funnel bars.
- **Previous-Period Slate**: the dashed comparison line and its legend swatch, nothing else.

### Named Rules
**The One Signal Rule.** Amber means "now" or "this period". If an element is not current, active, or the thing being measured right now, it is not amber.

**The Lamp Rule.** Green and red are status reports, not brand colors. They appear only where a value is judged (on time / late, up / down, above / below pace, won / lost), and the wash variants only as the ground behind that same status.

**The Twin Ink Rule.** Every signal and lamp has a light-theme ink of its own; text never reuses the fill value across themes.

## Typography

**Body Font:** Atkinson Hyperlegible Next (with system-ui, sans-serif)
**Label/Mono Font:** Atkinson Hyperlegible Mono (with ui-monospace, monospace), always with tabular figures

**Character:** A signage face designed for legibility at a glance, paired with its own monospaced sibling for the figures. The pairing reads as transit wayfinding rather than marketing.

### Hierarchy
- **Headline** (800, 30px; 21px under 640px): the page title in the top bar only.
- **Title** (800, 22px): the board panel title, the one panel that leads the page. The deal sheet title uses 24px/700.
- **Panel Title** (700, 16px): every other panel heading. Headings carry -0.015em tracking.
- **Body** (400, 15px/1.5; 14.5px under 640px): base text. Data rows and lists run at 14px; captions, tags, legends and sub-lines at 12.5-13.5px.
- **Label** (600, 11.5-12px, 0.05-0.06em, uppercase): table and board column headers only.
- **Figure Large** (Mono 600, clamp(28px, 2.6vw, 38px), -0.02em): the month's pace value.
- **Figure** (Mono 600, clamp(22px, 2vw, 28px), -0.02em): KPI values.
- **Figure Inline** (Mono 500-600, 11.5-15px): board times, table amounts, facts, axes, timeline times, tooltip values.

### Named Rules
**The Tabular Rule.** Every number, money amount, percentage, date and time is set in Atkinson Hyperlegible Mono with tabular figures. Words are never set in mono.

**The Split-Flap Rule.** When a headline figure changes, its digits scramble for about 420ms and settle left to right, with the value tinted amber ink while flapping. Skipped under reduced motion and on first paint.

## Layout

Left rail (224px, sticky, full height) plus a main column with 28px side padding. A sticky top bar holds the page title and date on the left, tools on the right (period segment, search, theme toggle, avatar), separated from content by a 1px rule.

Content is a 12-column grid with an 18px gutter. The first row pairs the board (8 columns) with the month pace panel (4); the KPI band spans 12 as a single ruled strip of five cells split by vertical hairlines rather than separate cards; then chart (8) + funnel (4), sources (6) + team (6), deals table (12).

Breakpoints: at 1320px the board drops its owner column; at 1180px the first two rows stack to full width and the pace panel turns into a two-column value/facts layout, KPIs go 3-up; at 900px the rail disappears and a fixed four-item bottom tabbar takes over; at 640px the bar un-sticks, tools become a grid with the segment on its own row, gutter shrinks to 12px, panel padding to 16px, board rows collapse to time / what / tick, KPIs go 2-up with the first full width, the deals table reflows into stacked cards with a sort select, and the deal sheet becomes a bottom sheet at 88vh.

Spacing rhythm is small and steady: 4/8px inside controls, 12-14px between row items, 18-20px between and inside panels, 22-28px around the page frame.

## Elevation & Depth

The board is flat. Panels sit on the ground with a 1px rule and no shadow; depth between ground, panel and raised panel is tonal. A single shadow token exists and is reserved for layers that float over the board: the chart tooltip, the deal sheet and the toast. A dark scrim (rgba(5,8,11,.6)) sits under the sheet in both themes.

### Shadow Vocabulary
- **Float** (`box-shadow: 0 24px 48px -24px rgba(0,0,0,.7)` dark; `0 24px 48px -28px rgba(14,19,25,.35)` light): tooltip, side/bottom sheet, toast.

### Named Rules
**The Flat Board Rule.** Nothing that lives in the grid casts a shadow. If it has a shadow, it is floating and dismissable.

## Shapes

Square-ish and ruled. Panels, the segment control, the search field and icon buttons take 8px; buttons, chips, ticks, nav items, tooltips, the fact grid and the next-step box take 6px; tags and stage pills 4px; meter and data bars 2-3px; lamps, avatars and timeline nodes are circles. The only large radius is the 12px top corner of the mobile bottom sheet. Borders are 1px everywhere except the 2px "now" divider on the board and the 2px timeline spine. Fact grids are drawn with 1px gaps over the rule color instead of individual borders.

## Components

### Buttons
Utilitarian and quiet; the only filled button is the active segment.
- **Shape:** 6px corners, 34-42px tall.
- **Segment (period switch):** a 3px-padded 8px-radius track on the panel color; idle options are steel text on transparent; the active option is filled Board Amber with On-Amber ink.
- **Secondary (Pokaż więcej, Wyczyść filtry):** raised panel fill, strong-rule border, primary text, 38px tall; hover shifts the border to amber.
- **Icon button:** 42px square, 8px radius, panel fill, rule border, steel icon; hover brightens icon to primary text and border to strong rule.
- **Done tick:** 36px square, 6px radius, strong-rule outline; hover turns border and check green; pressed fills Lamp Green with panel-colored check.
- **Focus:** 2px outline at 2px offset (table rows inset at -2px). In the dark theme the ring is Board Amber. In the light theme the shipped ring reuses fill amber (#f2a100, about 2.1:1 on white), which is below the 3:1 non-text floor; new surfaces should draw the light-theme ring in Deep Ochre Ink instead.

### Chips
- **Style:** transparent, 1px rule border, steel text 13px/600, 6px radius, 34px tall.
- **State:** hover brightens text and border; selected inverts to a primary-text fill with panel-colored text (not amber; amber is reserved for the period).

### Cards / Containers
- **Corner Style:** 8px.
- **Background:** panel color on the ground.
- **Shadow Strategy:** none (Flat Board Rule).
- **Border:** 1px rule.
- **Internal Padding:** 20px (16px on mobile). The board and KPI band run padding-less with their own row padding so rules can go edge to edge.
- **Panel head:** title left, a small 4px-radius tag (raised fill, rule border, 12.5px steel text) or a control right, 16px below.

### Inputs / Fields
- **Style:** 42px tall, 8px radius, panel fill, 1px rule border, inset 17px search glyph in faint steel.
- **Focus:** border shifts to amber; no glow.

### Navigation
- **Rail:** 42px items, 6px radius, 19px stroked icons + 500-weight label in steel; hover takes the raised fill; active takes the amber wash with primary text and an amber icon.
- **Tabbar (under 900px):** four equal columns, 52px targets, icon over 11.5px/600 label, same active treatment.

### Departure Board (signature)
The lead panel. Rows are a fixed column grid (time, company + action, value, owner, status, tick), 60px minimum, divided by 1px rules, with a raised header band of uppercase labels. Times are mono amber ink. Each row carries a 9px status lamp: green on time, red late (with a 3px red-wash halo, and the time turns red), amber blinking in hard steps for the current slot (row washed amber), faint for upcoming. Done rows fade to 55% with a 1px strike-through. The next upcoming row gets a 2px amber top rule and an amber "teraz HH:MM" mono badge sitting on that line.

### Pace Meter (signature)
A 14px ruled track with an amber fill scaled from the left (1s ease-out-expo) and a 2px primary-text tick marking where the month should be, labelled beneath. Below it a raised verdict strip with the green/red judged figure, then ruled fact rows with mono values.

### Stage Pill
4px-radius pill with a 7px leading dot in currentColor: open in primary text on raised panel, in negotiation amber ink on amber wash, won green on green wash, lost red on red wash.

### Data Bars
2px-radius bars on a raised track, 8-10px tall: amber for sources (current-period measure), faint steel for funnel steps with the final step green, green/red for team against a 2px pace tick. Widths animate over 0.7s on the same ease-out-expo curve.

## Do's and Don'ts

### Do:
- **Do** set every figure, amount, date and time in Atkinson Hyperlegible Mono with tabular numerals.
- **Do** keep amber for the current period, current time, next action and the measured value; use amber ink (not fill amber) for amber text.
- **Do** report status with a lamp dot plus a colored label, green for on-track and red for late or behind.
- **Do** separate panels and rows with 1px rules and tonal steps; reserve the float shadow for tooltip, sheet and toast.
- **Do** give every color a light-theme twin with its own ink and check both themes.
- **Do** use cubic-bezier(.16,1,.3,1) for entrances and fills, 0.15s for hover color changes, and honor prefers-reduced-motion.

### Don't:
- **Don't** build rows of equal KPI cards; KPIs live in one ruled strip.
- **Don't** add glass, blur, or gradient surfaces; the only gradient is the chart area wash fading from amber.
- **Don't** use green or red decoratively or as a brand accent.
- **Don't** put shadows on panels sitting in the grid.
- **Don't** round beyond 8px on in-grid elements; circles are reserved for lamps, avatars and timeline nodes.

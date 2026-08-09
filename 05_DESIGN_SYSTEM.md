# 05 --- Design System

# Design direction

## Core idea

**Contemporary Indian cultural editorial.**

Not: - "ethnic website" - generic wellness - generic luxury - AI art
gallery

The visual language should feel like a contemporary publication
documenting living craft.

------------------------------------------------------------------------

# Visual principles

## 01 Material first

Use real: - clay - fabric - paper - wood - pigment - tools - hands -
workshop surfaces

Textures should come from the actual subject matter whenever possible.

Do not add fake paper/noise textures just to make a design look
"crafty."

------------------------------------------------------------------------

## 02 Photography first

Priority:

1.  real artisan photography
2.  real workshop photography
3.  process close-ups
4.  material photography
5.  finished work
6.  approved illustration

The supplied brief explicitly prioritizes artisans and process imagery.

------------------------------------------------------------------------

## 03 Earth palette

Base: - natural paper / warm off-white - deep brown - clay /
terracotta - ochre - muted sage

Accent: - indigo - madder red

Use accent colors intentionally.

Do not use every traditional color on one screen.

------------------------------------------------------------------------

# Typography

Use two families.

## Display

A distinctive editorial serif or culturally appropriate display face.

Use for: - hero headings - section statements - pull quotes - artform
titles

## Sans

A clean contemporary sans.

Use for: - navigation - body - labels - metadata - forms - buttons

------------------------------------------------------------------------

# Type scale

Use fluid typography.

Example:

``` css
--text-xs: clamp(0.72rem, 0.68rem + 0.1vw, 0.8rem);
--text-sm: clamp(0.82rem, 0.78rem + 0.12vw, 0.95rem);
--text-base: clamp(1rem, 0.95rem + 0.2vw, 1.125rem);
--text-lg: clamp(1.2rem, 1.05rem + 0.5vw, 1.5rem);
--text-xl: clamp(1.8rem, 1.4rem + 1.5vw, 3rem);
--text-display: clamp(3rem, 6vw, 7rem);
```

Actual values can change during visual design.

------------------------------------------------------------------------

# Layout

Use: - 12-column desktop grid - 4--6 column tablet logic - single-column
mobile with editorial offsets - generous whitespace - asymmetric
compositions - full-bleed imagery where appropriate

------------------------------------------------------------------------

# Border radius

Use restrained rounding.

Avoid: - everything being `rounded-2xl` - floating SaaS cards -
pill-shaped navigation everywhere

Images may use carefully chosen organic rounding, but it should be part
of the composition.

------------------------------------------------------------------------

# Buttons

Primary: - strong contrast - compact - tactile hover - arrow or
directional cue where useful

Secondary: - outline - text link - understated

Avoid excessive pill buttons.

------------------------------------------------------------------------

# Cards

Cards should not all look identical.

Use different compositions for: - artforms - artisans - experiences -
journal - events

The design system should have **composition rules**, not one universal
card component with 20 props.

------------------------------------------------------------------------

# Motion

Motion is a layer, not the identity.

Use: - reveal - mask - fade - subtle translate - image scale - editorial
horizontal movement

Respect:

``` css
@media (prefers-reduced-motion: reduce)
```

------------------------------------------------------------------------

# Anti-AI-slop rules

Never automatically: - add gradient blobs - add glowing orbs - add
floating 3D objects - add random Indian motifs - add animated
particles - add generic "hand-drawn" SVGs - add fake paper grain - use
AI-generated cultural portraits as documentary content - add huge text
just because it looks cinematic - make every section a centered card
grid

Every visual element must have a reason.

------------------------------------------------------------------------

# Cultural motif rule

A motif may be used only if: 1. it comes from an approved Kiiro
asset/system, or 2. its cultural origin has been intentionally selected
and documented.

Do not create a generic "Indian pattern" library.

------------------------------------------------------------------------

# Image cropping

Never crop out: - hands - tools - faces - important cultural details

unless the crop is intentionally approved.

Use `object-position` per asset when required.

------------------------------------------------------------------------

# Responsive composition

Mobile is not a scaled desktop.

For every major section define: - desktop composition - tablet
behavior - mobile composition - content priority - interaction behavior

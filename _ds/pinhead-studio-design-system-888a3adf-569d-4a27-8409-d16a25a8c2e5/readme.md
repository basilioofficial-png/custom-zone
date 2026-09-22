# pinhead studio — Design System

A brand system recreated from the **Гайдбук v.1.1** ("Guidebook v.1.1"), the
brand book for **pinhead ✳ studio** (`pnhd.ru`) — a custom-merch and apparel-print
studio in Saint Petersburg. The studio produces its own garment models and does
print and embroidery on them (DTG, DTF, screen print, embroidery).

The guidebook is written in Russian and splits everything into two commercial
**directions** that share one logo and one grid but differ in palette:

| Direction | Russian | Palette | Voice |
|---|---|---|---|
| Retail | Розничное направление | black, white, blue, **lime** | loud, drop-culture, streetwear |
| Wholesale | Оптовое направление | black, white, blue | restrained, industrial, B2B |

Everything in this project is transcribed from that file. Values are unrounded:
where the source says `25.575220108032227px` or `0.8500000238418579`, so does the
CSS. Nothing has been snapped to a 4/8px grid.

---

## Sources

- **Figma file:** `Untitled.fig`, attached to this project and mounted read-only.
  One page (`Page 1`), 77 top-level frames, 4 855 nodes, **0 Figma components**
  and **0 text styles** — the file is a brand book plus a social-template board,
  not a UI component library. No public Figma URL was supplied.
- The file's own inventory, from its metadata: `Component families: 0`,
  `Text styles: 0`, `Token collections: 1` ("Ungrouped", 4 variables —
  one font family, one weight, one size, one letter-spacing, all belonging to a
  single text node).
- No codebase, repository, deck or website was provided. There is no product UI
  in the source — see **Intentional additions** below for what that means.

Structure found in the file:

- **Frames `1`–`23` and `1081`–`1095`** — 38 guidebook sheets at 1920×1080,
  covering Логотип, Цвета, Типографика, Графика and Шаблоны for both directions.
- **Frames `1080x1350` ×10, `1080-1920` ×6, `1080-1080` ×3** — feed posts,
  stories and square posts.
- **Frames `frame`–`frame12`** — logo board, Instagram/VK avatars, VK cover,
  four menu boards, a case-study template.
- **Frame `frame13` ("архив")** — a 130-sub-frame working archive of the same
  templates in progress. Deliberately **not** imported: it is a scratch board,
  and every template shape in it already appears in the frames above.
- Six frames are bare photographs (`Frame-89/90`, three Telegram exports, one
  screen capture); their bitmaps were kept, the wrapper frames were not.

---

## Index

```
readme.md                  this file
SKILL.md                   Agent-Skills front matter
styles.css                 the global CSS entry point — @import list only
thumbnail.html             homepage tile

tokens/
  fonts.css                @font-face rules + webfont loading
  colors.css               palette, tints, greys, gradients, semantic aliases
  typography.css           families, weights, tracking, size scale, text styles
  layout.css               page grid, spacing, hairlines, radius, shadows, motion

assets/
  logo-pinhead-studio.svg      Основная версия — the horizontal lockup
  mark-asterisk-drawn.svg      the drawn/scratched asterisk from the lockup
  mark-asterisk.svg            the geometric asterisk used as page furniture
  mark-registered.svg          the ® glyph used as page furniture
  motif/motif-01…12.svg        Графический мотив, retail set
  motif-xl/motif-xl-01…09.svg  Графический мотив, wholesale set
  markings/markings-01…11.svg  Маркировки — needle-derived stamps

components/                reusable primitives (see Components)
guidelines/                22 foundation specimen cards
templates/
  social-post/             1080×1350 feed-post template
  guidebook-page/          1920×1080 guidebook sheet template
ui_kits/guidebook/         38-page click-through recreation of the Гайдбук
ui_kits/social/            social template board — posts, stories, avatars, covers
```

---

## Components

Authored primitives, grouped by concern. Every one is a single `.jsx` with a
sibling `.d.ts` and `.prompt.md`; each directory carries one `@dsCard` HTML.

**`components/core/`** — `Button`, `IconButton`, `Card`, `Badge`, `Tag`, `Tabs`

**`components/forms/`** — `Input`, `Select`, `Checkbox`, `Radio`, `Switch`

**`components/overlay/`** — `Dialog`, `Tooltip`

**`components/brand/`** — `LogoLockup`, `Headline`, `Motif`, `Marking`,
`Swatch`, `GuidePageFrame`, `ScratchOverlay`

### Intentional additions

The source defines **no** UI components, so `core/`, `forms/` and `overlay/`
are authored from the brand's foundations rather than copied — a standard
interface set drawn in the guidebook's own language (square corners, hairline
borders, uppercase condensed labels, invert-on-active). Treat them as a starting
point, not as the studio's ratified UI. `components/brand/` is different: every
member of it is a literal, recurring element of the guidebook.

### Guidebook & social screens

Materialised 1:1 from the source frames and also exported by the bundle:

- **Guidebook, retail track:** `Page01`, `Page02`, `Page03`, `Page04`, `Page05`,
  `Page06`, `Page07`, `Page08`, `Page09`, `Page10`, `Page11`, `Page12`,
  `Page13`, `Page14`, `Page15`, `Page16`, `Page17`, `Page18`, `Page19`,
  `Page20`, `Page21`, `Page22`, `Page23`
- **Guidebook, wholesale track:** `PageW01`, `PageW02`, `PageW03`, `PageW04`,
  `PageW05`, `PageW06`, `PageW07`, `PageW08`, `PageW09`, `PageW10`, `PageW11`,
  `PageW12`, `PageW13`, `PageW14`, `PageW15`
- **Feed posts:** `Post01`, `Post02`, `Post03`, `Post04`, `Post05`, `Post06`,
  `Post07`, `Post08`, `Post09`, `Post10`
- **Stories:** `Story01`, `Story02`, `Story03`, `Story04`, `Story05`, `Story06`
- **Square posts:** `Square01`, `Square02`, `Square03`
- **Collateral:** `AvatarInsta01`, `AvatarInsta02`, `AvatarLogo`, `AvatarMark`,
  `VkAvatar`, `VkCover`, `Menu01`, `Menu02`, `Menu03`, `Menu04`,
  `CaseTemplate`, `LogoBoard`

---

## Content fundamentals

The guidebook is written in Russian throughout. Only two Latin strings recur:
the logo (`pinhead ® ✳ studio`) and the URL (`pnhd.ru`).

**Register.** Third-person and impersonal in the guidebook itself. Rules are
stated as facts about the mark, not as instructions to a person:
*"Основная версия логотипа представлена в виде горизонтального сочетания
начертаний, разделенных знаком."* Permission is granted with modal verbs, not
with "you can": *"Использование маркировки ® опционально и может упраздняться
при малых форматах."* Prohibition gets one flat heading — **"Не допускается:"**
— followed by numbered examples, with no explanation of why.

**Marketing copy is first-person plural.** Where the studio speaks about itself
it becomes "мы": *"Мерч на заказ в Санкт-Петербурге можно оформить в нашей
компании на выгодных условиях. Мы предоставляем широкий ассортимент моделей
одежды собственного производства и высокое качество печати и вышивки."*
Long, complete, comma-spliced sentences. No exclamation marks.

**Social copy is two lines and a URL.** *"новый дроп / уже на сайте"* then
`pnhd.ru`. Lowercase in the source text, uppercased by CSS. No call-to-action
verb, no emoji, no hashtags anywhere in the file.

**Casing.** Headings and headlines are `text-transform: uppercase` applied to
lowercase source text — so the type is always caps, the content never is. Nav
labels and body copy are sentence case. Section numbers are zero-padded: `01`,
`02`, `03`, `04`.

**Labels are nouns, not phrases.** "Логотип", "Цвета", "Типографика",
"Графика", "Шаблоны", "Охранная зона", "Маркировки", "Основная версия",
"Раздельные версии", "Наборный шрифт", "Акцидентный шрифт". Example plates are
labelled with the single word **"Пример"**.

**Numbers are given plainly, in units.** `2X`, `1/4X`, `10%`, `1080х1080`,
`HEX B4FB53`, `RGB 180 251 83`, `CMYK 28 0 67 2`. Note that the dimensions use
the Cyrillic `х`, not the Latin `x`, in some frames — the file is inconsistent
and both appear.

**Emoji: none.** The asterisk `✳` is a drawn brand mark, not a glyph, and the ®
is set as vector artwork. Nothing else stands in for an icon.

---

## Visual foundations

**Colour.** Four values carry the whole system: `#000000`, `#FFFFFF`,
`#1D19EA` (blue) and `#B4FB53` (lime). The retail direction uses all four; the
wholesale direction drops lime entirely. Extended palettes are tints of the base
colours in flat 10% steps — the guidebook shows them as a ladder, so use
`--ph-blue-40` rather than inventing an opacity. Two limes exist in the file
(`#B4FB53` in the palette pages, `#B5FC55` in some templates); the palette page
wins. There is no red, no amber, no semantic colour system: an error state
recolours to blue.

**Type.** Two faces, named in the book by role. *Акцидентный шрифт* (display) is
**TT Bluescreens Black** — ultra-condensed, near-solid, set at 120px for page
titles with 0.85 leading and −0.01em tracking, always uppercase. *Наборный
шрифт* (text) is **Roboto Condensed**, Medium 500 for nav and body at 22px,
1.0 leading, −0.03em. The social templates add a third voice: **Heading Pro
Bold Italic**, uppercase, 40–130px, −0.02em, usually centred. Sizes climb
22 → 25 → 32 → 40 → 50 → 55 → 75 → 86 → 100 → 120 → 130, then jump to
230 / 256 / 455 for full-bleed type specimens.

**Spacing and grid.** Guidebook sheets are 1920×1080. A 60px band across the
top holds four nav labels at x = 22, 698, 952, 1689. Horizontal rules span
1860px, stopping short of a 60px right-hand gutter that carries the ✳ at the
top and the ® at the vertical centre. A full-width rule crosses the sheet at
y = 540. Page titles sit at 19, 93. Body copy starts in the second column at
x = 952. Spacing values in use: 8, 19, 22, 30, 60, 78, 93, 126, 199.

**Backgrounds.** Three, and only three: white, black, and `#1D19EA`. Chapter
covers are black or blue; content sheets are white. There are no background
images on guidebook pages, no textures, no patterns. Social templates are the
opposite — a full-bleed product photograph or a flat brand colour, never both.

**Borders and rules.** Every division is a 0.5px stroke rendered at 1px in pure
black or pure white. There are no filled panels, no tinted cards, no dividers
with opacity. Cards in this system are a rectangle and a hairline.

**Corner radius: 0.** The guidebook's own layout has no rounded corners
anywhere. The only non-zero radii in the entire file belong to mockups — a
Telegram sticker plate at `25.575220108032227px`, phone bezels, and circular
gradient spheres. Do not round a card.

**Shadow.** Three values exist (`rgba(0,0,0,0.15)`, `0.25`, `0.5`), all as
`0 0 N` glows, and all of them appear on mockups or on the sticker plates —
never on layout. Interface surfaces are unshadowed. `rgba(0,0,0,0.5)` doubles as
the modal scrim.

**Gradients.** One, named: **Фирменный градиент**, a chrome ramp
`linear-gradient(122.72deg, #000 7.38%, #FFF 58.85%, #000 90.63%)`, shown on the
gradient page rendered onto a sphere and onto pin-shaped objects. A secondary
`#1D19EA → #FFFFFF` vertical fade appears on sticker plates. No bluish-purple
mesh gradients, no multi-stop washes.

**The graphic motif.** The asterisk mark is the system's one piece of ornament,
and the book devotes its Графика section to reinterpreting it: 12 retail
variants (geometric bursts, ball-ended pins, dotted and striped fills, a
flower, a star) and 9 wholesale variants (loose scratched needle strokes, drawn
freehand, almost accidental). All 21 are in `assets/motif/` and
`assets/motif-xl/`. Related but separate are the 11 **Маркировки** in
`assets/markings/` — radial bursts, crosshairs and targets read as garment
stamps.

**The scratch overlay.** Across the social templates, long thin hairlines run
diagonally over the whole composition at shallow angles, composited with
`mix-blend-mode: difference` so they invert whatever they cross rather than
sitting on top of it. This is the single most identifiable move in the brand's
imagery. `components/brand/ScratchOverlay.jsx` reproduces it.

**Transparency and blur.** Almost none. Where opacity appears it is a flat
`0.8` on a small caption, never a frosted panel. No `backdrop-filter` anywhere
in the file.

**Imagery.** Product photography: garments on plain, slightly cool grey-white
studio backgrounds, or worn on location in flat overcast daylight. Colour is
neutral-to-cool, contrast is high, no grade and no film grain. Photographs are
cropped square or into the frame's full bleed; garments are shot flat-lay or
front-on with the print centred. Photos never carry a caption plate — type is
laid straight over them, or placed below them on white.

**Animation.** The source is a print/static system and specifies nothing. The
tokens carry conservative defaults (`--duration: 200ms`,
`--ease: cubic-bezier(0.2,0,0,1)`) for interactive work. When you do animate,
match the brand's character: instant, hard cuts and position changes rather than
fades; no bounce, no elastic, no spring. The asterisk motif rotating at constant
speed is in keeping; a card easing upward on hover is not.

**Hover and press.** The brand has no defined interaction states, so the
system's own convention is inversion: hover flips fill and text colour (black on
white becomes white on black), press flips to blue. Nothing scales, nothing
lifts, nothing changes opacity. Focus is a 1px `#1D19EA` outline.

**Layout rules.** Fixed elements in the guidebook are: the nav band, the gutter
marks, the centre rule and the page title. Everything else is placed absolutely
against them. Content is left-aligned or centred, never justified. Copy blocks
are set at a fixed measure (390px at 22px type — roughly 40 characters) with
manual line breaks, not wrapped.

---

## Iconography

**There is no icon set in this file, and none should be substituted.** The
guidebook's entire glyph vocabulary is three marks plus two families of
ornament, all vector artwork, all extracted into `assets/`:

- **The asterisk `✳`** — the brand mark. Two forms: a drawn/scratched version
  that sits inside the logo lockup (`mark-asterisk-drawn.svg`) and a clean
  geometric version used as page furniture in the top-right gutter
  (`mark-asterisk.svg`).
- **The `®`** — set as vector artwork, not as a text glyph, and treated as a
  compositional element: it repeats in the right gutter at the vertical centre
  of every guidebook sheet. Optional in the logo at small sizes.
- **Графический мотив** — 21 reinterpretations of the asterisk
  (`assets/motif/`, `assets/motif-xl/`). Decorative; use one per composition.
- **Маркировки** — 11 needle-derived stamps (`assets/markings/`): radial
  bursts, ring targets, crosshairs, scratched stars. The book explains them as
  *"графические образы иголок"* — graphic images of needles, continuing the
  logo's metaphor. Used as stamps on garments and posts.

No icon font, no sprite sheet, no PNG icons, no Lucide/Heroicons/Material — and
no emoji, anywhere in the file. Unicode characters are not used as icons; the
`✳` and `®` you see are always artwork. **Do not add a CDN icon set to this
system.** If a UI genuinely needs a functional icon (a chevron, a close ×), draw
it as a hairline stroke at the same 1px weight as the rules, or set the `×`
as type — that is what `Dialog` and `Tag` do.

---

## Fonts

No font binaries ship inside a `.fig`. All three faces have since been supplied
and are wired up in `tokens/fonts.css`.

| Role | Source face | Status | Substitute |
|---|---|---|---|
| Наборный шрифт (text) | **Roboto Condensed** | ✅ real | — (Google Fonts) |
| Акцидентный шрифт (display) | **TT Bluescreens** | ✅ real | — (self-hosted, `fonts/tt-bluescreens-bold.otf`) |
| Social headline | **Heading Pro Bold / Bold Italic** | ✅ real | — (self-hosted, `fonts/HeadingPro-*.woff2`) |

The guidebook links its own sources: TT Bluescreens at
`typetype.ru/fonts/tt-bluescreens/` (commercial) and Roboto Condensed at
`fonts.google.com/specimen/Roboto+Condensed`. Heading Pro is Fontfabric
(commercial). TT Bluescreens is now self-hosted from `fonts/` and wired up in
`tokens/fonts.css`; note the supplied cut is Bold, not the Black the source
sets, so display type reads slightly lighter than the original. Two further faces appear once each and are not part of the system:
Heading Compressed Pro (2 nodes) and Aeonik Pro (1 node). Coolvetica appears
exactly once, inside the *"Не допускается"* plate — it is an example of misuse,
not a brand font.

The only outstanding gap is the weight of the display cut: the supplied
TT Bluescreens is **Bold**, where the source sets **Black**, so display type
reads slightly lighter than the original. Alumni Sans and Oswald remain in the
`--font-display` fallback stack purely as Cyrillic-capable safety nets.

---

## Caveats

- **Seven bitmaps could not be extracted.** The source's largest PNGs and JPEGs
  (4–14 MB each) exceed the extractor's per-image budget and were dropped from
  their frames. The product photo used most often across the templates
  (`44105bad7e589705.png`, the coach-jacket back) was copied back in by hand;
  the rest leave a flat grey plate on the affected guidebook sheets and
  templates. All are still readable in the mounted `.fig` if you want them.
- **The supplied TT Bluescreens cut is Bold, not the source's Black.** Display
  type reads slightly lighter than the guidebook. Heading Pro and Roboto
  Condensed are exact.
- **`frame13` ("архив") was not imported.** It is a 130-sub-frame working
  archive of templates that already appear elsewhere in the file.
- **The two-line and Cyrillic logo lockups are not vectorised.** The horizontal
  Основная версия was extracted as artwork; `LogoLockup variant="stacked"` sets
  those variants as type instead, which is an approximation.
- **The four Figma Variables in the file are not a token system.** They belong to
  a single text node (one family, weight, size and tracking) and are shipped
  as-is in `ui_kits/guidebook/fig-tokens.css`. Every real token in
  `tokens/` was read off the guidebook's own colour and typography pages.
- **No interaction states are defined anywhere in the source.** The hover /
  press / focus conventions in `components/` are inferred from the brand's
  inversion logic, not transcribed.

/**
 * Schrödinger's cat.
 *
 * The roaming and perching logic is adapted from Paperwren
 * (https://github.com/Razee4315/Paperwren), website/src/scripts/wren.ts.
 * Copyright (c) 2026 Paperwren contributors. MIT License, reproduced in
 * THIRD_PARTY_NOTICES.md at the root of this repository.
 *
 * The cat lives in the ψ box in the nav. A few seconds after load the lid
 * opens and it appears, then roams the page: it leaps between perches (rules,
 * frames, buttons and the tops of heading letters) and follows the reader
 * down at its own pace. Perches too far away are reached by tunnelling: it
 * fades out where it is and fades in where it lands.
 *
 * While it is in the air nobody has looked, so it is drawn in superposition,
 * awake and asleep at once. Landing is a measurement: it collapses into one
 * state at random and the ket is written above it. An awake cat leaves when
 * the pointer comes close; an asleep one only twitches an ear, and wakes if
 * clicked. Now and then it goes back into the box, which shakes while it is
 * inside.
 *
 * The cat lives in a layer that scrolls with the document, so while it sits on
 * something it stays glued to it. Everything is skipped with
 * prefers-reduced-motion.
 */

export type Vec = { x: number; y: number };

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));
const smooth = (t: number) => { const c = clamp(t, 0, 1); return c * c * (3 - 2 * c); };
const approach = (v: number, target: number, rate: number, dt: number) => v + (target - v) * (1 - Math.exp(-rate * dt));
const rand = (min: number, max: number) => min + Math.random() * (max - min);

/** The cat is drawn in a 64px box; its feet touch the ground at (32, 59). */
const SIZE = 40, FOOT_X = .5, FOOT_Y = 59 / 64;
/** Where it sits in the logo box: the middle of the opening. */
const HOME_X = 33 / 64, HOME_Y = 27 / 64, HOME_SCALE = .62;
/** Farther than this, it tunnels instead of leaping. */
const LEAP_MAX = 460;
/** Letters with a flat enough top to stand on. */
const FLAT_TOPS = /[BDEFHIKLMNPRTUbdhkl1]/;

type Spot =
  | { kind: "edge" | "bottom"; el: HTMLElement; frac: number }
  | { kind: "text"; el: HTMLElement; node: Text; index: number; lift: number }
  | { kind: "home"; el: Element };
type Leap = { from: Vec; spot: Spot; planned: Vec; t: number; dur: number; arc: number; tunnel: boolean; fromHome: boolean };
type State = "awake" | "asleep";
type Mode = "boxed" | "emerging" | "perched" | "crouch" | "leaping" | "entering" | "away";

/**
 * Brings the cat in `sky` to life. `home` is the ψ box in the nav.
 * Returns a function that stops it and closes the box again.
 */
export function initCat(sky: HTMLElement, home: SVGSVGElement, startDelay = 3000): () => void {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};
  const flyer = sky.querySelector<HTMLElement>("[data-flyer]");
  const art = flyer?.querySelector<SVGSVGElement>("svg");
  if (!flyer || !art) return () => {};
  const part = (name: string) => art.querySelector<SVGGElement>(`[data-part=${name}]`)!;
  const awakeEl = part("awake"), asleepEl = part("asleep"), tailEl = part("tail"), headEl = part("head");
  const earEl = part("ear"), eyesEl = part("eyes"), breathEl = part("breath"), sleepEarEl = part("sleep-ear");
  const lid = home.querySelector<SVGGElement>("[data-lid]"), box = home.querySelector<SVGGElement>("[data-box]");

  const perches = () => [...document.querySelectorAll<HTMLElement>("[data-perch]")];
  const nights = () => [...document.querySelectorAll<HTMLElement>("[data-cat-zone=night]")];
  const canvas = document.createElement("canvas").getContext("2d");

  // Layer geometry, refreshed every frame: the layer's viewport offset converts
  // between viewport and document space and tells where the reader is looking.
  let origin = { x: 0, y: 0 }, view = { left: 0, top: 0, right: 0, bottom: 0 };
  const measureView = () => {
    const r = sky.getBoundingClientRect();
    origin = { x: r.left, y: r.top };
    view = { left: -r.left, top: -r.top, right: -r.left + document.documentElement.clientWidth, bottom: -r.top + innerHeight };
  };
  const local = (x: number, y: number): Vec => ({ x: x - origin.x, y: y - origin.y });
  // Sized to the page (measured without itself) and clipped, so a cat near the bottom never extends it.
  const fitLayer = () => { sky.style.height = "0px"; sky.style.height = `${document.documentElement.scrollHeight}px`; };

  let pos: Vec = { x: 0, y: 0 }, vel: Vec = { x: 0, y: 0 };
  let mode: Mode = "boxed", spot: Spot = { kind: "home", el: home }, leap: Leap | undefined;
  let collapsed: State | undefined;
  let face = 1, faceTarget = 1, pitch = 0, squash = 1, stretch = 1, scale = HOME_SCALE, vis = 0;
  let wAwake = 0, wAsleep = 0, tail = 0, tailV = 0, ear = 0, sleepEar = 0, tilt = 0, tiltTarget = 0, tiltFor = 0, blink = 0;
  let dwell = startDelay / 1000, leaveIn = -1, idle = 1, blinkIn = 2, crouch = 0, phase = 0, retry = 0;
  let walk: { from: number; to: number; t: number } | undefined;
  let flee: Vec | undefined, visits = 0, zoneCheck = 0;
  let lidOpen = 0, lidTarget = 0, lidCloseIn = -1, jiggle = 0, jiggleIn = rand(.6, 1.2);
  const recent: unknown[] = [];
  let pointer = { x: -1e4, y: -1e4, t: -1 }, scrollDir = 0, lastScroll = scrollY, clock = 0;

  const visible = (el: Element) => (el.checkVisibility ? el.checkVisibility({ opacityProperty: true, visibilityProperty: true }) : true);
  const identity = (s: Spot): unknown => s.el;

  const where = (s: Spot): Vec | undefined => {
    switch (s.kind) {
      case "edge": case "bottom": {
        const r = s.el.getBoundingClientRect();
        if (!r.width) return;
        return local(r.left + s.frac * r.width, s.kind === "edge" ? r.top : r.bottom - .5);
      }
      case "text": {
        if (!s.node.isConnected || s.index >= s.node.data.length) return;
        const range = document.createRange();
        range.setStart(s.node, s.index); range.setEnd(s.node, s.index + 1);
        const r = range.getBoundingClientRect();
        if (!r.width) return;
        return local(r.left + r.width / 2, r.top + s.lift);
      }
      case "home": {
        const r = s.el.getBoundingClientRect();
        if (r.bottom < 0 || !r.width) return;
        return local(r.left + r.width * HOME_X, r.top + r.height * HOME_Y);
      }
    }
  };

  /** Glyph tops sit below the line box by the half-leading plus the font's ascent less the glyph's own. */
  const letters = (el: HTMLElement) => {
    const out: Spot[] = [];
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    for (let node = walker.nextNode() as Text | null; node; node = walker.nextNode() as Text | null) {
      const host = node.parentElement;
      if (!host || !canvas) continue;
      const cs = getComputedStyle(host);
      canvas.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
      const lineHeight = parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * 1.2;
      for (let i = 0; i < node.data.length; i++) {
        const ch = node.data[i]!;
        if (!FLAT_TOPS.test(ch)) continue;
        const m = canvas.measureText(ch);
        const halfLeading = (lineHeight - (m.fontBoundingBoxAscent + m.fontBoundingBoxDescent)) / 2;
        out.push({ kind: "text", el, node, index: i, lift: halfLeading + m.fontBoundingBoxAscent - m.actualBoundingBoxAscent });
      }
    }
    return out;
  };

  const inZone = (p: Vec, slack = 0) =>
    p.y > view.top + 96 - slack && p.y < view.bottom - 56 + slack && p.x > view.left + 24 - slack && p.x < view.right - 24 + slack;
  /** The box sits in the fixed nav, so it is always in sight. */
  const reachable = (s: Spot, p: Vec, slack = 0) => (s.kind === "home" ? true : inZone(p, slack));

  /** Weighted pick of somewhere to land that the reader can see. */
  const choose = (): Spot | undefined => {
    const options: { spot: Spot; w: number }[] = [];
    const consider = (s: Spot, base: number) => {
      const p = where(s);
      if (!p || !reachable(s, p)) return;
      const d = Math.hypot(p.x - pos.x, p.y - pos.y);
      if (d < 70) return;
      let w = base * (.25 + Math.exp(-(((d - 260) / 340) ** 2)));
      const depth = (p.y - view.top) / (view.bottom - view.top);
      if (scrollDir > 0) w *= .5 + 1.6 * depth;
      if (scrollDir < 0) w *= .5 + 1.6 * (1 - depth);
      if (flee) w *= ((p.x - pos.x) * flee.x + (p.y - pos.y) * flee.y) / d > .2 ? 2.5 : .1;
      if (recent.includes(identity(s))) w *= .06;
      options.push({ spot: s, w });
    };
    for (const el of perches()) {
      const r = el.getBoundingClientRect(), kind = el.dataset.perch;
      const edgeY = (kind === "bottom" ? r.bottom : r.top) - origin.y;
      if (!r.width || edgeY < view.top + 60 || edgeY > view.bottom - 30 || !visible(el)) continue;
      if (kind === "text") {
        const all = letters(el);
        for (let i = 0; i < 3 && all.length; i++) consider(all[Math.floor(Math.random() * all.length)]!, 1.4 / 3);
        continue;
      }
      const inset = Math.min(.4, 30 / r.width);
      consider({ kind: kind === "bottom" ? "bottom" : "edge", el, frac: rand(inset, 1 - inset) }, 1);
    }
    // Back to the box now and then; distance hardly matters, it tunnels.
    if (visits >= 4 && Math.random() < .22) {
      const p = where({ kind: "home", el: home });
      if (p) options.push({ spot: { kind: "home", el: home }, w: 3 });
    }
    const total = options.reduce((sum, o) => sum + o.w, 0);
    let pick = Math.random() * total;
    for (const o of options) if ((pick -= o.w) <= 0) return o.spot;
    return undefined;
  };

  /** Writes the measured state above the cat, the way the wren sang. */
  const ket = (state: State) => {
    // Above the cat, except in the box at the top of the window, where above is off-screen: there it goes below.
    const below = spot.kind === "home";
    const head = SIZE * scale * (state === "asleep" ? .55 : .95);
    const p = { x: pos.x, y: below ? pos.y + 22 : pos.y - head };
    const lift = below ? -1 : 1;
    const note = document.createElement("span");
    note.className = "cat-ket"; note.textContent = `|${state}⟩`;
    if (flyer.dataset.zone) note.dataset.zone = flyer.dataset.zone;
    sky.append(note);
    const w = note.offsetWidth, x = Math.max(view.left + 8, p.x - w / 2);
    note.animate([
      { transform: `translate(${x}px, ${p.y}px)`, opacity: 0 },
      { transform: `translate(${x}px, ${p.y - 10 * lift}px)`, opacity: 1, offset: .2 },
      { transform: `translate(${x}px, ${p.y - 14 * lift}px)`, opacity: 1, offset: .75 },
      { transform: `translate(${x}px, ${p.y - 22 * lift}px)`, opacity: 0 },
    ], { duration: 1700, easing: "cubic-bezier(.16,1,.3,1)", fill: "both" }).onfinish = () => note.remove();
  };

  const collapse = (state: State) => { collapsed = state; ket(state); };

  const startLeap = (target: Spot, tunnelIn = false) => {
    const p = where(target) ?? pos;
    const from = { ...pos }, dx = p.x - from.x, dy = p.y - from.y, d = Math.hypot(dx, dy);
    const fromVisible = spot.kind === "home" || inZone(from, 60);
    const tunnel = tunnelIn || d > LEAP_MAX || !fromVisible;
    const dur = tunnel ? 1 : clamp(.34 + d / 1000, .4, .8);
    leap = {
      from, spot: target, planned: { ...p }, t: tunnelIn ? .5 : 0, dur, tunnel,
      arc: clamp(26 + d * .26, 30, 120) + Math.max(0, -dy) * .45, fromHome: spot.kind === "home",
    };
    if (Math.abs(dx) > 4) faceTarget = Math.sign(dx);
    if (leap.fromHome) lidCloseIn = .7;
    if (target.kind === "home") { lidTarget = 1; lidCloseIn = -1; }
    recent.push(identity(target)); if (recent.length > 3) recent.shift();
    collapsed = undefined; walk = undefined; mode = "leaping";
  };

  const next = () => {
    const target = choose();
    flee = undefined;
    if (target) return startLeap(target);
    // Nowhere in sight to land: stay put if the perch is still visible, otherwise wait unobserved.
    const p = where(spot);
    if (p && reachable(spot, p, 30)) { mode = "perched"; if (!collapsed) collapse("awake"); dwell = rand(1.5, 3); }
    else { mode = "away"; retry = .3; collapsed = undefined; }
  };

  const takeoff = (away?: Vec) => {
    if (mode !== "perched") return;
    flee = away; mode = "crouch"; crouch = .14; walk = undefined; leaveIn = -1;
  };

  const land = () => {
    const l = leap!;
    spot = l.spot; leap = undefined; visits++;
    if (spot.kind === "home") { mode = "entering"; phase = 0; lidTarget = 1; lidCloseIn = -1; return; }
    mode = "perched"; squash = .78; stretch = 1; tailV += 220;
    collapse(Math.random() < .42 ? "asleep" : "awake");
    dwell = collapsed === "asleep" ? rand(5, 9) : rand(3, 6.5);
    idle = rand(.5, 1.2);
  };

  const perched = (dt: number) => {
    const p = where(spot);
    if (!p) { takeoff(); return; }
    let { x, y } = p;
    if (walk && (spot.kind === "edge" || spot.kind === "bottom")) {
      walk.t += dt / .7;
      spot.frac = walk.from + (walk.to - walk.from) * smooth(walk.t);
      const q = where(spot);
      if (q) { x = q.x; y = q.y - Math.abs(Math.sin(walk.t * Math.PI * 3)) * 1.6; }
      if (walk.t >= 1) walk = undefined;
    }
    pos = { x, y }; vel = { x: 0, y: 0 };
    pitch = approach(pitch, 0, 14, dt);

    // Leave when the perch scrolls out of view, when it is time, or when disturbed.
    const outOfView = spot.kind === "home" ? false : !inZone(p, 30);
    if (outOfView) { if (leaveIn < 0) leaveIn = rand(.15, .45); }
    else leaveIn = -1;
    if (leaveIn >= 0 && (leaveIn -= dt) < 0) return takeoff();
    if ((dwell -= dt) < 0) return takeoff();
    const head = { x: pos.x, y: pos.y - SIZE * scale * .6 };
    const gap = Math.hypot(pointer.x - head.x, pointer.y - head.y);
    if (clock - pointer.t < .25 && gap < 75) {
      if (collapsed === "asleep") sleepEar = Math.max(sleepEar, .3);
      else { const d = gap || 1; return takeoff({ x: (head.x - pointer.x) / d, y: (head.y - pointer.y) / d }); }
    }

    if ((idle -= dt) < 0 && !walk) {
      idle = rand(.7, 2.4);
      const roll = Math.random();
      if (collapsed === "asleep") { if (roll < .3) sleepEar = .3; return; }
      if (roll < .3) faceTarget = -faceTarget;
      else if (roll < .5) tailV += rand(220, 360);
      else if (roll < .64) ear = .3;
      else if (roll < .8) { tiltTarget = rand(-11, 11); tiltFor = rand(.8, 1.6); }
      else if (spot.kind === "edge" || spot.kind === "bottom") {
        const width = spot.el.getBoundingClientRect().width, inset = Math.min(.4, 30 / width);
        const to = clamp(spot.frac + faceTarget * rand(16, 40) / width, inset, 1 - inset);
        if (Math.abs(to - spot.frac) * width > 8) walk = { from: spot.frac, to, t: 0 };
      }
    }
  };

  const leaping = (dt: number) => {
    const l = leap!;
    l.t = Math.min(l.dur, l.t + dt);
    const s = l.t / l.dur;
    const target = where(l.spot);
    if (!target || (!l.tunnel && s < .6 && !reachable(l.spot, target, 20))) {
      // The perch scrolled away mid-leap: pick again from here, by tunnelling.
      const again = choose();
      if (again) { startLeap(again, false); leap!.tunnel = true; leap!.dur = 1; }
      else { mode = "away"; retry = .3; leap = undefined; }
      return;
    }
    const prev = { ...pos };
    if (l.tunnel) {
      // Fade out where it was, fade in where it lands: never seen in between.
      if (s < .5) { pos = l.from; vis = 1 - smooth(s / .5); }
      else { pos = target; vis = smooth((s - .5) / .5); if (l.spot.kind === "home") vis *= .9; }
      scale = approach(scale, l.spot.kind === "home" && s >= .5 ? HOME_SCALE : 1, 6, dt);
      stretch = 1; pitch = approach(pitch, 0, 10, dt);
    } else {
      const drift = smooth(s);
      pos = {
        x: l.from.x + (l.planned.x - l.from.x) * s + (target.x - l.planned.x) * drift,
        y: l.from.y + (l.planned.y - l.from.y) * s - 4 * l.arc * s * (1 - s) + (target.y - l.planned.y) * drift,
      };
      vel = { x: (pos.x - prev.x) / dt, y: (pos.y - prev.y) / dt };
      const heading = Math.atan2(vel.y, Math.abs(vel.x) + 1) * 180 / Math.PI;
      pitch = approach(pitch, clamp(heading * .45, -28, 28), 12, dt);
      stretch = 1 + .14 * Math.sin(Math.PI * s);
      scale = approach(scale, 1, 8, dt);
      vis = approach(vis, 1, 12, dt);
    }
    if (l.t >= l.dur) land();
  };

  const render = () => {
    flyer.style.transform = `translate3d(${pos.x - SIZE * FOOT_X}px, ${pos.y - SIZE * FOOT_Y}px, 0)`;
    flyer.style.opacity = vis.toFixed(3);
    const flip = Math.sign(face || 1) * Math.max(.2, Math.abs(face));
    const sx = flip * scale * stretch * (2 - squash) ** .5, sy = scale * squash / stretch ** .5;
    art.style.transform = `rotate(${(pitch * Math.sign(face || 1)).toFixed(2)}deg) scale(${sx.toFixed(3)}, ${sy.toFixed(3)})`;

    // Superposition: both states at once, trembling apart. Collapsed: one state.
    const superposed = !collapsed;
    awakeEl.style.opacity = wAwake.toFixed(3);
    asleepEl.style.opacity = wAsleep.toFixed(3);
    awakeEl.style.display = wAwake < .01 ? "none" : "";
    asleepEl.style.display = wAsleep < .01 ? "none" : "";
    const j = superposed ? Math.sin(clock * 43) * 1.3 + Math.sin(clock * 17) * .6 : 0;
    awakeEl.setAttribute("transform", superposed ? `translate(${j.toFixed(2)} 0)` : "");
    asleepEl.setAttribute("transform", superposed ? `translate(${(-j).toFixed(2)} 0)` : "");

    tailEl.setAttribute("transform", `rotate(${tail.toFixed(2)} 19 56)`);
    headEl.setAttribute("transform", `rotate(${tilt.toFixed(2)} 43 29)`);
    earEl.setAttribute("transform", ear > 0 ? `rotate(${(-16 * Math.sin(ear / .3 * Math.PI)).toFixed(2)} 47 15)` : "");
    sleepEarEl.setAttribute("transform", sleepEar > 0 ? `rotate(${(-14 * Math.sin(sleepEar / .3 * Math.PI)).toFixed(2)} 48 44)` : "");
    eyesEl.setAttribute("transform", blink > 0 ? "translate(0 21) scale(1 .12) translate(0 -21)" : "");
    breathEl.setAttribute("transform", `translate(0 59) scale(1 ${(1 + .03 * Math.sin(clock * 2.1)).toFixed(4)}) translate(0 -59)`);

    if (lid) lid.setAttribute("transform", `translate(0 24) scale(1 ${(1 - 2.3 * lidOpen).toFixed(3)}) translate(0 -24)`);
    if (box) box.setAttribute("transform", jiggle > 0 ? `rotate(${(Math.sin(clock * 38) * 5 * jiggle).toFixed(2)} 32 58)` : "");
  };

  let previous = 0, raf = 0, stopped = false;
  const frame = (now: number) => {
    if (stopped) return;
    const dt = previous ? Math.min((now - previous) / 1000, 1 / 20) : 1 / 60;
    previous = now; clock += dt;
    measureView();
    const y = -origin.y;
    if (Math.abs(y - lastScroll) > .5) scrollDir = Math.sign(y - lastScroll);
    else scrollDir = approach(scrollDir, 0, .8, dt);
    lastScroll = y;

    switch (mode) {
      case "boxed": {
        vis = 0; lidTarget = 0;
        const p = where(spot); if (p) pos = p;
        // Something is moving in there.
        if ((jiggleIn -= dt) < 0) { jiggle = 1; jiggleIn = rand(1.4, 3.2); }
        if ((dwell -= dt) < 0) { mode = "emerging"; phase = 0; }
        break;
      }
      case "emerging": {
        phase += dt; lidTarget = 1; scale = HOME_SCALE; collapsed = undefined;
        const p = where(spot); if (p) pos = p;
        vis = smooth((phase - .3) / .5);
        if (phase > 1.15) { mode = "perched"; collapse("awake"); dwell = rand(1.2, 2.2); idle = .6; faceTarget = 1; }
        break;
      }
      case "entering": {
        phase += dt; collapsed = undefined; scale = HOME_SCALE;
        const p = where(spot); if (p) pos = p;
        vis = 1 - smooth(phase / .5);
        if (phase > .65) { mode = "boxed"; dwell = rand(5, 9); jiggleIn = .4; }
        break;
      }
      case "perched": perched(dt); break;
      case "crouch": {
        squash = approach(squash, .8, 30, dt);
        const p = where(spot); if (p) pos = p;
        if ((crouch -= dt) <= 0) { squash = 1.06; next(); }
        break;
      }
      case "leaping": leaping(dt); break;
      case "away": {
        vis = approach(vis, 0, 10, dt); collapsed = undefined;
        if ((retry -= dt) < 0) {
          retry = .4;
          const target = choose();
          if (target) startLeap(target, true);
        }
        break;
      }
    }

    // Weights of the two states: equal in superposition, one or the other once measured.
    const wa = collapsed ? (collapsed === "awake" ? 1 : 0) : .58, ws = collapsed ? (collapsed === "asleep" ? 1 : 0) : .58;
    wAwake = approach(wAwake, wa, collapsed ? 18 : 10, dt);
    wAsleep = approach(wAsleep, ws, collapsed ? 18 : 10, dt);

    // Cats turn quickly; the brief edge-on frames read as a pivot.
    face = approach(face, faceTarget, 30, dt);
    squash = approach(squash, 1, 9, dt);
    if (mode !== "leaping" && mode !== "emerging" && mode !== "entering" && mode !== "boxed") scale = approach(scale, spot.kind === "home" ? HOME_SCALE : 1, 6, dt);
    // Tail: a springy flick about its base.
    tailV += ((0 - tail) * 140 - tailV * 9) * dt; tail += tailV * dt;
    if (tiltFor > 0) { tiltFor -= dt; if (tiltFor <= 0) tiltTarget = 0; }
    tilt = approach(tilt, tiltTarget, 8, dt);
    ear = Math.max(0, ear - dt); sleepEar = Math.max(0, sleepEar - dt);
    if ((blinkIn -= dt) < 0) { blink = .1; blinkIn = rand(2, 5.5); }
    blink -= dt;
    if (lidCloseIn >= 0 && (lidCloseIn -= dt) < 0) lidTarget = 0;
    lidOpen = approach(lidOpen, lidTarget, 9, dt);
    jiggle = Math.max(0, jiggle - dt / .45);
    if ((zoneCheck -= dt) < 0) {
      zoneCheck = .3;
      // Pale fur over the dark bands, so the cat never disappears into them.
      const vy = pos.y + origin.y;
      const dark = nights().some((el) => { const r = el.getBoundingClientRect(); return vy > r.top && vy < r.bottom + 4; });
      flyer.dataset.zone = dark ? "night" : "";
    }
    render();
    raf = requestAnimationFrame(frame);
  };

  const onMove = (e: PointerEvent) => { pointer = { x: e.clientX - origin.x, y: e.clientY - origin.y, t: clock }; };
  const onDown = (e: PointerEvent) => {
    if (mode !== "perched") return;
    const x = e.clientX - origin.x, y = e.clientY - origin.y, d = Math.hypot(x - pos.x, y - pos.y + SIZE * scale * .5);
    if (d > 90) return;
    if (collapsed === "asleep") { collapse("awake"); dwell = .55; tailV += 300; return; }
    takeoff({ x: (pos.x - x) / (d || 1), y: -.5 });
  };
  document.addEventListener("pointermove", onMove, { passive: true });
  document.addEventListener("pointerdown", onDown, { passive: true });
  const resize = new ResizeObserver(fitLayer);
  resize.observe(document.body);
  fitLayer();
  flyer.hidden = false;
  measureView();
  raf = requestAnimationFrame(frame);

  return () => {
    stopped = true;
    cancelAnimationFrame(raf);
    resize.disconnect();
    document.removeEventListener("pointermove", onMove);
    document.removeEventListener("pointerdown", onDown);
    sky.querySelectorAll(".cat-ket").forEach((n) => n.remove());
    flyer.hidden = true;
    lid?.removeAttribute("transform");
    box?.removeAttribute("transform");
  };
}

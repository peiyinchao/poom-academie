
### lv2 bg FINAL = option C `--page2:#E9E2D3` (rgb 233,226,211)
Compared 5 candidates on the real HB drill-in (strip lv2_compare_strip.png). User chose C (deeper, decisive
but calm). Shipped C nudged one imperceptible step from #E8E1D2 → #E9E2D3 so the small `--gray` sub-labels
clear AA cleanly: gray 4.53:1, ink 13.86:1, white-card 1.29:1 vs page. Verified live: L1 hubs stay cream
rgb(244,241,234); L2 hbcat+wcat bodies rgb(233,226,211); inner cards white; 0 console errs (favicon only).

### Connector-ring white fill removed (works on dark bg)
assets/mascot/punchbag-mount.png: the connector ring's interior was an opaque WHITE bow-tie fill
(x309-385,y318-364, min-channel>=245). Cut it to transparent via an alpha ramp (m 225->245 => 0 alpha)
scoped to the ring hole (y300-382,x293-402) so all silver hook/arcs (<=224) are fully protected.
Result: hole now shows page colour through it (open-loop look). Verified compositing over cream #F4F1EA,
lv2 #E9E2D3, and DARK #2A2A28 (ring_check.png) + live Handboek hub (hub_bag.png, 0 JS errs). Only a
sub-pixel light AA keyline remains on pure dark (inherent to asset AA; invisible at render size / on the
cream hub where it lives). Backup: /tmp/punchbag-mount.BAK.png. Uncommitted.

### REVERTED lv2 darker background + cleaned ring transparency (user feedback)
- lv2 DARKER BACKGROUND: user decided against it -> REVERTED. Removed `--page2` token (L16) and pointed
  `.catsheet.wcat,.catsheet.hbcat` (L1449), `.wcat .cs-body` (L1515), `.hbcat .cs-body` (L1523) back to
  `var(--page)`. Verified live: L1 hubs + L2 hbcat/wcat bodies all cream rgb(244,241,234). No page2 refs remain.
- CONNECTOR RING: first pass (alpha-ramp) left a faint mid-grey AA rim where the removed white fill met the
  black ring -> user saw "grey". Redone from backup: white fill (mn>=230, 1836px) -> alpha 0 (fully
  transparent); grey AA rim (mn 80-189 adjacent to hole, 74px) -> snapped to ring black #0E0F0F; silver
  hook/arcs (mn>=190) fully protected. Magenta live-flood proved the hole is transparent to the PAGE (no
  layer behind). Verified over cream (clean cream hole, crisp black edge, no grey) + dark + live cream hub.
  Backup still at /tmp/punchbag-mount.BAK.png. Both files uncommitted.

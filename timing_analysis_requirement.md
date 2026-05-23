# Timing Analysis Screen — Requirement
## CLAP PRO | Memory IC Replacement Validation

**Version:** 1.0  
**Date:** 2026-05-23  
**Scope:** New screen added after the extraction screen. Covers READ and WRITE cycle AC timing comparison for memory ICs.

---

## 1. Context

After Xtract AI extracts parameters from both datasheets, the app moves to this screen.  
The screen compares the extracted values of the **Base IC** against the **Candidate IC** and tells the user whether the candidate is a valid timing replacement.

The algorithm is generic — it does not hardcode any IC name or parameter value. It reads the `comparison_type` from the canonical library and applies the formula.

---

## 2. Inputs

| Input | Source |
|---|---|
| Base IC extracted parameters | Xtract AI output (canonical names, values, units, confidence) |
| Candidate IC extracted parameters | Xtract AI output (canonical names, values, units, confidence) |
| Canonical library | `sram_canonical_library.json` — provides `comparison_type` and `value_type` per parameter |

---

## 3. Screen Layout

```
┌─────────────────────────────────────────────────────┐
│  Overall Verdict:  [ COMPATIBLE | NOT COMPATIBLE |  │
│                      NEEDS REVIEW ]                  │
├─────────────────────────────────────────────────────┤
│  READ CYCLE          Verdict: [ PASS | FAIL | ... ]  │
│  ┌──────────────────────────────────────────────┐   │
│  │  Parameter table (one row per parameter)     │   │
│  └──────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────┤
│  WRITE CYCLE         Verdict: [ PASS | FAIL | ... ]  │
│  ┌──────────────────────────────────────────────┐   │
│  │  Parameter table (one row per parameter)     │   │
│  └──────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

Each table has these columns:

| Parameter | Base Value | Candidate Value | Rule | Margin | Status |
|---|---|---|---|---|---|

- **Parameter** — canonical display name (e.g. "Read Cycle Time")
- **Base Value** — extracted value with unit (e.g. "70 ns")
- **Candidate Value** — extracted value with unit (e.g. "70 ns")
- **Rule** — short human-readable rule (e.g. "Candidate ≤ Base")
- **Margin** — computed number with unit (e.g. "+0 ns", "−10 ns")
- **Status** — colour-coded badge: OK / NOT OK / UNVERIFIABLE / FLAGGED

---

## 4. The Two Comparison Formulas

All parameter comparisons reduce to one of two formulas.  
Which formula applies is determined by the `comparison_type` field in the canonical library.

### Formula A — Candidate must be ≤ Base

```
margin = base_value − candidate_value
status = OK       if margin >= 0
status = NOT_OK   if margin < 0
```

Applies to `comparison_type`:
- `chip_performance_max` (access times, bus release times)
- `system_requirement_min` (cycle time, setup/hold times)

### Formula B — Candidate must be ≥ Base

```
margin = candidate_value − base_value
status = OK       if margin >= 0
status = NOT_OK   if margin < 0
```

Applies to `comparison_type`:
- `chip_guarantee_min` (output hold times, bus quiet times)
- `chip_guarantee_max` (input voltage tolerance)

**Margin interpretation:** Positive = passes with headroom. Zero = exactly meets. Negative = fails by that amount.

---

## 5. READ Cycle — Parameter Computation Catalogue

These are all READ cycle parameters from the canonical library. For each row, the formula column refers to Formula A or B defined in Section 4.

| # | Canonical Name | Display Name | comparison_type | Formula | OK Condition | Example (M48Z58Y as base) |
|---|---|---|---|---|---|---|
| 1 | `read_cycle_time` | Read Cycle Time | system_requirement_min | A | margin ≥ 0 | base=70ns min, cand=70ns → margin=0 → OK |
| 2 | `address_access_time` | Address Access Time | chip_performance_max | A | margin ≥ 0 | base=70ns max, cand=55ns → margin=+15 → OK |
| 3 | `chip_enable_access_time` | Chip Enable Access Time | chip_performance_max | A | margin ≥ 0 | base=70ns max, cand=80ns → margin=−10 → NOT OK |
| 4 | `output_enable_access_time` | Output Enable Access Time | chip_performance_max | A | margin ≥ 0 | base=35ns max, cand=35ns → margin=0 → OK |
| 5 | `chip_disable_to_output_high_z` | Chip Disable to Output Hi-Z | chip_performance_max | A | margin ≥ 0 | base=25ns max, cand=20ns → margin=+5 → OK |
| 6 | `output_disable_to_output_high_z` | Output Disable to Output Hi-Z | chip_performance_max | A | margin ≥ 0 | base=25ns max, cand=30ns → margin=−5 → NOT OK |
| 7 | `chip_enable_to_output_low_z` | Chip Enable to Output Low-Z | chip_guarantee_min | B | margin ≥ 0 | base=5ns min, cand=3ns → margin=−2 → NOT OK |
| 8 | `output_enable_to_output_low_z` | Output Enable to Output Low-Z | chip_guarantee_min | B | margin ≥ 0 | base=5ns min, cand=5ns → margin=0 → OK |
| 9 | `output_hold_after_address_change` | Output Hold After Address Change | chip_guarantee_min | B | margin ≥ 0 | base=10ns min, cand=12ns → margin=+2 → OK |

**Important note on read_cycle_time:**  
This is a MIN spec. The rule is candidate ≤ base (Formula A). A candidate with a longer minimum cycle time demands more from the system than it was designed for and will fail.  
Example: base=70ns, candidate=100ns → margin = 70−100 = −30 → NOT OK.

---

## 6. WRITE Cycle — Parameter Computation Catalogue

| # | Canonical Name | Display Name | comparison_type | Formula | OK Condition | Example (M48Z58Y as base) |
|---|---|---|---|---|---|---|
| 1 | `write_cycle_time` | Write Cycle Time | system_requirement_min | A | margin ≥ 0 | base=70ns min, cand=70ns → margin=0 → OK |
| 2 | `address_setup_to_write_enable` | Address Setup to WE Low | system_requirement_min | A | margin ≥ 0 | base=0ns min, cand=0ns → margin=0 → OK |
| 3 | `address_setup_to_chip_enable` | Address Setup to CE Low | system_requirement_min | A | margin ≥ 0 | base=0ns min, cand=0ns → margin=0 → OK |
| 4 | `write_enable_pulse_width` | Write Enable Pulse Width | system_requirement_min | A | margin ≥ 0 | base=50ns min, cand=45ns → margin=+5 → OK |
| 5 | `chip_enable_write_pulse_width` | Chip Enable Write Pulse Width | system_requirement_min | A | margin ≥ 0 | base=55ns min, cand=60ns → margin=−5 → NOT OK |
| 6 | `address_valid_to_write_enable_high` | Address Valid to WE High | system_requirement_min | A | margin ≥ 0 | base=60ns min, cand=55ns → margin=+5 → OK |
| 7 | `address_valid_to_chip_enable_high` | Address Valid to CE High | system_requirement_min | A | margin ≥ 0 | base=60ns min, cand=60ns → margin=0 → OK |
| 8 | `write_enable_high_to_address_hold` | WE High to Address Hold | system_requirement_min | A | margin ≥ 0 | base=0ns min, cand=0ns → margin=0 → OK |
| 9 | `chip_enable_high_to_address_hold` | CE High to Address Hold | system_requirement_min | A | margin ≥ 0 | base=0ns min, cand=0ns → margin=0 → OK |
| 10 | `data_setup_to_write_enable_high` | Data Setup to WE High | system_requirement_min | A | margin ≥ 0 | base=30ns min, cand=25ns → margin=+5 → OK |
| 11 | `data_setup_to_chip_enable_high` | Data Setup to CE High | system_requirement_min | A | margin ≥ 0 | base=30ns min, cand=35ns → margin=−5 → NOT OK |
| 12 | `data_hold_after_write_enable_high` | Data Hold After WE High | system_requirement_min | A | margin ≥ 0 | base=5ns min, cand=5ns → margin=0 → OK |
| 13 | `data_hold_after_chip_enable_high` | Data Hold After CE High | system_requirement_min | A | margin ≥ 0 | base=5ns min, cand=5ns → margin=0 → OK |
| 14 | `write_enable_low_to_output_high_z` | WE Low to Output Hi-Z | chip_performance_max | A | margin ≥ 0 | base=25ns max, cand=20ns → margin=+5 → OK |
| 15 | `write_enable_high_to_output_active` | WE High to Output Active | chip_guarantee_min | B | margin ≥ 0 | base=5ns min, cand=5ns → margin=0 → OK |

---

## 7. Parameter Status Classification

Each parameter row gets one of four statuses:

| Status | Condition |
|---|---|
| **OK** | margin ≥ 0 |
| **NOT OK** | margin < 0 |
| **UNVERIFIABLE** | Parameter exists in base but candidate value is null, missing, or not extracted |
| **FLAGGED** | Value extracted but confidence score < 0.70 — show value but warn user |

---

## 8. Section Verdict Logic

Applied independently to READ section and WRITE section.

```
if any parameter status == NOT OK:
    section_verdict = FAIL

else if any parameter status == UNVERIFIABLE:
    section_verdict = UNVERIFIABLE

else if any parameter status == FLAGGED:
    section_verdict = NEEDS REVIEW

else:
    section_verdict = PASS
```

---

## 9. Overall Compatibility Verdict

Derived from both section verdicts. Higher severity takes precedence.

| READ verdict | WRITE verdict | Overall verdict |
|---|---|---|
| PASS | PASS | COMPATIBLE |
| PASS | FAIL | NOT COMPATIBLE |
| FAIL | PASS | NOT COMPATIBLE |
| FAIL | FAIL | NOT COMPATIBLE |
| PASS | UNVERIFIABLE | NEEDS REVIEW |
| UNVERIFIABLE | PASS | NEEDS REVIEW |
| PASS | NEEDS REVIEW | NEEDS REVIEW |
| NEEDS REVIEW | PASS | NEEDS REVIEW |
| Any FAIL | Anything | NOT COMPATIBLE |

---

## 10. Edge Cases

| Situation | Behaviour |
|---|---|
| Parameter in canonical library but absent from both ICs | Skip — do not show the row |
| Parameter present in candidate but not in base | Ignore — extra capability is not a disqualifier |
| Unit mismatch between base and candidate (e.g. ns vs μs) | Mark as UNVERIFIABLE, show a note: "Unit mismatch — manual check required" |
| Both base and candidate values are 0 | Margin = 0 → OK (valid for setup/hold times that are specified as 0 minimum) |
| Confidence score exactly 0.70 | Treat as FLAGGED (threshold is exclusive: confidence must be > 0.70 for clean OK) |
| Base value missing, candidate value present | Skip — cannot compare without a base reference |

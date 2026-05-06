---
phase: 8
status: fixed
files_reviewed: 2
critical: 0
warning: 0
info: 1
total: 1
---

# Code Review — Phase 8: Events CRUD

## Summary

Manual code review of Events CRUD implementation. Focus on the member selection fix applied in this session.

---

## Findings

### INFO-001: Member list not filtered by event capacity
**Severity:** Info  
**File:** `src/pages/EventsPage.jsx`  
**Line:** 397-430

**Issue:** The member selection modal shows all active members without considering event capacity. Users can select more members than the event capacity allows.

**Status:** Fixed — search filter added

**Recommendation:** Consider disabling members when capacity is reached, or showing a warning when capacity is close to being reached.

---

## Consensus Summary

### Agreed Strengths
- Member selection now properly uses a list instead of hardcoded memberId 1
- Modal implementation follows existing patterns (reuses Modal component)
- Registration functions in storage.js properly handle duplicates
- Search filter added to member selection modal

### Agreed Concerns
- Member selection could benefit from capacity check at UI level (Info)

### Divergent Views
- None (single reviewer)

---

*Review completed: 2026-05-06*
*Reviewer: Manual review (OpenCode big-pickle)*
*Status: All warnings fixed*
# Screen5 Results Test

This test file allows you to view the Screen5Results component directly with data from `sramresult.json` without running the full application.

## How to Use

1. **Open the test file in a browser:**
   ```
   Open: Tests/test-screen5-results.html
   ```

2. The page will automatically load data from:
   - `Tests/sramresult.json` - Contains all extraction results and parameter information

## Features Demonstrated

- **AC/DC Color Coding**: 
  - AC parameters (time-based units: ns, ms, us, etc.) have uniform **blue background** across all cells
  - DC parameters have **white background**
  
- **Low Confidence Highlighting**:
  - Cells with confidence < 80% show **red background**
  
- **Legend**: 
  - Visual legend at the bottom explains the color scheme

## Visual Color Scheme

| Color | Meaning |
|-------|---------|
| White | DC Parameters |
| Blue | AC Parameters (time-based) |
| Red | Low Confidence (<80%) |

## Notes

- The HTML file uses Tailwind CSS via CDN for styling
- All parameter values are editable in the table
- This is a standalone test that doesn't require the full React app to be running

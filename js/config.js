/*
 * Configuration
 *
 * HOW TO CONNECT YOUR GOOGLE SPREADSHEET
 * ───────────────────────────────────────
 * 1. Create a Google Spreadsheet with one sheet per content type:
 *      • "catalogue"  — columns: title, year, instrumentation, duration, notes
 *      • "recordings" — columns: title, album, performers, year, url
 *      • "press"      — columns: title, source, date, excerpt, url
 *
 * 2. Publish the spreadsheet:
 *      File → Share → Publish to web → Entire Document → Publish
 *
 * 3. Copy the spreadsheet ID from the URL:
 *      https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit
 *
 * 4. Paste it below:
 */

const CONFIG = {
  // Replace with your published Google Spreadsheet ID
  spreadsheetId: 'YOUR_SPREADSHEET_ID_HERE',

  // Sheet names — must match the tab names in your spreadsheet exactly
  sheets: {
    catalogue:  'catalogue',
    recordings: 'recordings',
    press:      'press',
  },
};

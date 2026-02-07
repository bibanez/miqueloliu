/*
 * Google Sheets fetcher
 *
 * Fetches data from a published Google Spreadsheet using the Visualization
 * API (no API key required — the sheet just needs to be published to web).
 *
 * Returns an array of objects whose keys are the column headers (first row).
 */

const Sheets = (() => {

  /**
   * Fetch a sheet by name.
   * @param {string} sheetName — the tab name in the spreadsheet.
   * @returns {Promise<Object[]>} — array of row objects.
   */
  async function fetch(sheetName) {
    if (!CONFIG.spreadsheetId || CONFIG.spreadsheetId === 'YOUR_SPREADSHEET_ID_HERE') {
      console.warn('[Sheets] No spreadsheet ID configured. Using empty data.');
      return [];
    }

    const url =
      `https://docs.google.com/spreadsheets/d/${CONFIG.spreadsheetId}` +
      `/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(sheetName)}`;

    const res  = await window.fetch(url);
    const text = await res.text();

    // The response is JSONP-like: google.visualization.Query.setResponse({...})
    // Extract the JSON payload.
    const json = JSON.parse(text.match(/google\.visualization\.Query\.setResponse\((.+)\);?/s)[1]);

    if (json.status === 'error') {
      console.error('[Sheets] Error from Google:', json.errors);
      return [];
    }

    const cols = json.table.cols.map(c => c.label.trim().toLowerCase());
    const rows = (json.table.rows || []).map(row => {
      const obj = {};
      row.c.forEach((cell, i) => {
        obj[cols[i]] = cell ? (cell.f != null ? cell.f : (cell.v != null ? cell.v : '')) : '';
      });
      return obj;
    });

    return rows;
  }

  return { fetch };
})();

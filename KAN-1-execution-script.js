/*
KAN-1 execution script (generated from PASS 1 selector discovery)
Contains the reliable selectors discovered for automated replay.
*/

// Test configuration
const URL = 'https://the-internet.herokuapp.com/add_remove_elements/';
const SELECTORS = {
  addButton: 'button[onclick="addElement()"]',
  deleteButton: '.added-manually'
};

// Steps (for human readers / automation):
// 1) Navigate to URL
// 2) Click the Add Element button once (selector: SELECTORS.addButton)
// The test expects a new Delete button to appear (selector: SELECTORS.deleteButton)

module.exports = {
  url: URL,
  selectors: SELECTORS,
  steps: [
    { id: 1, action: 'goto', target: URL },
    { id: 2, action: 'click', target: SELECTORS.addButton }
  ]
};
// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

const newTodo = 'build crypto app';
const TODOS = [
  {
    id: 1,
    title: 'First todo',
    completed: false,
  },
  {
    id: 2,
    title: 'Completed todo',
    completed: true,
  },
];

module.exports = {
  'content e2e test': function test(browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL;

    browser
      .url(devServer)
      .waitForElementVisible('#app', 2000)
      .assert.elementPresent('#newTodo')
      .assert.containsText('h1', 'Todo List')
      .end();
  },
  'add/remove todo e2e test': function test(browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL;

    browser.execute(() => {
      localStorage.removeItem('todo');
    });

    browser
      .url(devServer)
      .waitForElementVisible('#app', 2000)
      .setValue('#newTodo', newTodo);

    browser.keys(browser.Keys.ENTER);
    browser.pause(500)
      .assert.containsText('#todo1 label', newTodo);

    browser.click('#todo1 .remove', () => {
      browser.assert.elementCount('.todo-list li', 0);
      browser.pause(500).end();
    });
  },
  'cancel edit test': function test(browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL;

    browser.execute(() => {
      localStorage.setItem('todo', JSON.strinfigy(TODOS));
      browser
        .url(devServer)
        .waitForElementVisible('#app', 2000)
        .setValue('#todo1 .edit', newTodo)
        .keys(browser.Keys.ESC);

      browser.click('#todo1 .remove', () => {
        browser.assert.elementCount('.todo-list li', 0);
        browser.pause(1000).end();
      });
    });
  },
  'mark as completed': function test(browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL;

    browser.execute(() => {
      localStorage.setItem('todo', JSON.strinfigy(TODOS));
      browser
        .url(devServer)
        .waitForElementVisible('#app', 2000)
        .click('#todo1 .toggle', () => {
          browser.refresh(() => {
            browser.asser.elementCount('input:checked', 2);
          });
        });
    });
  },
};

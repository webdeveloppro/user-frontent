import Vue from 'vue';
import { mount } from '@vue/test-utils'
// import { createLocalVue } from '@vue/test-utils'
import ToDo from '@/components/ToDo';

class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = value.toString();
  }

  removeItem(key) {
    delete this.store[key];
  }
}

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

describe('ToDo.vue', () => {
  it('Initial data', () => {
    global.localStorage = new LocalStorageMock();
    global.localStorage.setItem('todo', JSON.stringify(TODOS));

    const $route = {
      path: '/',
      hash: '',
      params: {},
      query: {},
    };

    const wrapper = mount(ToDo, {
      mocks: {
        $route, // adds the mocked `$route` object to the Vue instance before mounting component
      },
    });

    // Lets check initial data
    expect(wrapper.vm.$data.todos).toEqual(TODOS);
    expect(wrapper.vm.readDB()).toEqual(TODOS);
  });

  it('Check add todo function', () => {
    global.localStorage = new LocalStorageMock();
    global.localStorage.setItem('todo', JSON.stringify(TODOS));

    const $route = {
      path: '/',
      hash: '',
      params: {},
      query: {},
    };

    const wrapper = mount(ToDo, {
      mocks: {
        $route, // adds the mocked `$route` object to the Vue instance before mounting component
      },
    });

    // Lets add todo and verify that we have it in the localStorage
    const newTitle = 'Finish unit tests';
    const newTodo = {
      id: 3,
      title: newTitle,
      completed: false,
    };

    wrapper.setData({
      newTodo: newTitle,
    });

    const e = document.createEvent('HTMLEvents');
    e.initEvent('keyup', true, true);
    e.keyCode = 13;
    wrapper.element.querySelector('#newTodo').dispatchEvent(e);

    wrapper.trigger('keyup.enter');

    expect(wrapper.vm.$data.todos[2]).toEqual(newTodo);

    const newTodos = TODOS.slice(0, TODOS.length);
    newTodos.push(newTodo);

    expect(localStorage.getItem('todo')).toEqual(JSON.stringify(newTodos));
  });

  it('Check mark completed function', () => {
    global.localStorage = new LocalStorageMock();
    global.localStorage.setItem('todo', JSON.stringify(TODOS));

    const $route = {
      path: '/',
      hash: '',
      params: {},
      query: {},
    };

    const wrapper = mount(ToDo, {
      mocks: {
        $route, // adds the mocked `$route` object to the Vue instance before mounting component
      },
    });

    // Mark row as compled and verify local storage data
    wrapper.element.querySelector('#todo2 .toggle').click();
    const newTodos = TODOS.slice(0, TODOS.length);
    newTodos[1].completed = true;

    expect(localStorage.getItem('todo')).toEqual(JSON.stringify(newTodos));
  });

  it('Check remove todo function', (next) => {
    global.localStorage = new LocalStorageMock();
    global.localStorage.setItem('todo', JSON.stringify(TODOS));

    const $route = {
      path: '/',
      hash: '',
      params: {},
      query: {},
    };

    const wrapper = mount(ToDo, {
      mocks: {
        $route, // adds the mocked `$route` object to the Vue instance before mounting component
      },
    });

    // Mark row as compled and verify local storage data
    wrapper.element.querySelector('#todo2 .remove').click();
    let newTodos = TODOS.slice(0, TODOS.length - 1);

    // Lets give some time to watcher to fill localStorage with new data
    wrapper.vm.$nextTick(() => {
      expect(global.localStorage.getItem('todo')).toEqual(JSON.stringify(newTodos));

      // Mark row as compled and verify local storage data
      wrapper.element.querySelector('#todo1 .remove').click();
      newTodos = [];

      wrapper.vm.$nextTick(() => {
        expect(global.localStorage.getItem('todo')).toEqual(JSON.stringify(newTodos));
        next();
      });
    });
  });

  it('Check edit function', (next) => {
    global.localStorage = new LocalStorageMock();
    global.localStorage.setItem('todo', JSON.stringify(TODOS));

    const $route = {
      path: '/',
      hash: '',
      params: {},
      query: {},
    };

    const wrapper = mount(ToDo, {
      mocks: {
        $route, // adds the mocked `$route` object to the Vue instance before mounting component
      },
    });


    // Setup new value to a first todo
    wrapper.setData({
      '#todo1 .edit': 'new title',
    });

    wrapper.trigger('blur');

    // Lets give some time to watcher to fill localStorage with new data
    //Vue.nextTick(() => {
      expect(global.localStorage.getItem('todo')).toEqual(JSON.stringify(TODOS));
    //});

    // Setup new value to a first todo
    wrapper.setData({
      '#todo1 .edit': 'new title',
    });

    wrapper.trigger('keyup.esc');

    // Using watcher and wrapper trigger for a second time required to wait for the next tick
    expect(global.localStorage.getItem('todo')).toEqual(JSON.stringify(TODOS));
    wrapper.vm.$nextTick(() => {
      next();
    });
  });
});

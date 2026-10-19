import '@testing-library/jest-dom';

if (!window.matchMedia) {
  window.matchMedia = () => ({
    matches: false,
    media: '',
    onchange: null,
    addListener() {},
    removeListener() {},
    addEventListener() {},
    removeEventListener() {},
    dispatchEvent() {
      return false;
    },
  });
}

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: false,
    status: 401,
    text: async () => JSON.stringify({ message: 'Unauthorized' }),
  })
);

window.scrollTo = () => {};

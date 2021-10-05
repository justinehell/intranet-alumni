import { convertArrayToObject } from './index';

describe('Testing convertArrayToObject function', () => {
  const arr = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Sarah' },
    { id: 3, name: 'Kate' },
  ];

  test('checks if function exists', () => {
    expect(typeof convertArrayToObject).toEqual('function');
  });

  test('Transforms array into object with "id" as key', () => {
    const res = {
      1: { id: 1, name: 'John' },
      2: { id: 2, name: 'Sarah' },
      3: { id: 3, name: 'Kate' },
    };

    expect(convertArrayToObject(arr, 'id')).toEqual(res);
  });

  test('Transforms array into object with unknown key', () => {
    expect(convertArrayToObject(arr, 'age')).toBeUndefined();
  });

  test('Transforms array into object with empty array', () => {
    expect(convertArrayToObject([], 'id')).toEqual({});
  });
});

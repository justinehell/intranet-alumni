import { convertArrayToObject } from './index';

describe('Testing convertToObject function', () => {
  test('check if function exists', () => {
    expect(typeof convertArrayToObject).toEqual('function');
  });

  const arr = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Sarah' },
    { id: 3, name: 'Kate' },
  ];

  test('Transform array into object with "id" as key', () => {
    const res = {
      1: { id: 1, name: 'John' },
      2: { id: 2, name: 'Sarah' },
      3: { id: 3, name: 'Kate' },
    };

    expect(convertArrayToObject(arr, 'id')).toEqual(res);
  });

  test('Transform array into object with unknown key', () => {
    expect(convertArrayToObject(arr, 'age')).toBeUndefined();
  });

  test('Transform array into object with empty array', () => {
    expect(convertArrayToObject([], 'id')).toEqual({});
  });
});

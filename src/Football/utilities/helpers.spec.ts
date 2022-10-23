import Helpers from './helpers';

describe('Helpers', () => {
  describe('removeDuplicates', () => {
    it('removes items with the same property in a list', () => {
      const itemsList = [
        { id: 1, name: 'test1', category: 'category1' },
        { id: 2, name: 'test2', category: 'category2' },
        { id: 3, name: 'test3', category: 'category1' },
      ];

      const clearList = Helpers.removeDuplicates(itemsList, 'category');
      expect(clearList.length).toBe(2);
    });
  });

  describe('groupBy', () => {
    let itemsList;

    beforeEach(() => {
      itemsList = [
        { id: 1, name: 'test1', category: 'category1' },
        { id: 2, name: 'test2', category: 'category2' },
        { id: 3, name: 'test3', category: 'category1' },
      ];
    });

    it('groups item by property creates right number of lists ', () => {
      const groupedList = Helpers.groupBy(itemsList, 'category');
      expect(Object.keys(groupedList).length).toBe(2);
    });

    it('groups item by property creates lists with the right items', () => {
      const groupedList = Helpers.groupBy(itemsList, 'category');
      const category1Index = Object.keys(groupedList).indexOf('category1');
      const category2Index = Object.keys(groupedList).indexOf('category2');

      expect(Object.values(groupedList)[category1Index].length).toBe(2);
      expect(Object.values(groupedList)[category2Index].length).toBe(1);
    });
  });

  describe('test', () => {
    type Dictionary<T> = Record<string, T> | undefined;

    it('hehe', () => {
      const data: Dictionary<Dictionary<{ count: number; minutes: number }>> = {
        entity1: {
          meeting1: {
            count: 1,
            minutes: 15,
          },
          meeting2: {
            count: 2,
            minutes: 50,
          },
        },
        entity2: {
          meeting1: {
            count: 1,
            minutes: 30,
          },
          meeting2: {
            count: 2,
            minutes: 60,
          },
          meeting3: {
            count: 5,
            minutes: 100,
          },
        },
      };
      const hh = Object.values(data);
      const initialValue: Dictionary<{ count: number; minutes: number }[]> = {};

      const res = hh.reduce((acc, element) => {
        const dfgsd = Object.entries(element || {});

        dfgsd.forEach((x) => {
          (acc[x[0]] || (acc[x[0]] = [])).push(x[1]);
        });

        return acc;
      }, initialValue);

      const gg = Object.entries(res);

      const output: Dictionary<{ count: number; minutes: number }> = {};
      gg.forEach(
        (x) =>
          (output[x[0]] = {
            count: x[1].reduce((a, b) => a + b.count, 0),
            minutes: x[1].reduce((a, b) => a + b.minutes, 0),
          })
      );

      const expectedResult = {
        meeting1: {
          count: 2,
          minutes: 45,
        },
        meeting2: {
          count: 4,
          minutes: 110,
        },
        meeting3: {
          count: 5,
          minutes: 100,
        },
      };

      expect(output).toEqual(expectedResult);
    });
  });
});

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
    let itemsList: any[];

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

      expect((Object.values(groupedList) as any)[category1Index].length).toBe(
        2
      );
      expect((Object.values(groupedList) as any)[category2Index].length).toBe(
        1
      );
    });
  });
});

class Helpers {
  static groupBy(array: any[], property: string) {
    let hash: any = {},
      props = property.split('.');
    for (var i = 0; i < array.length; i++) {
      var key = props.reduce(function (acc, prop) {
        return acc && acc[prop];
      }, array[i]);
      if (!hash[key]) hash[key] = [];
      hash[key].push(array[i]);
    }
    return hash;
  }


  static removeDuplicates(myArr: any[], prop: string) {
    return myArr.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
  }
}

export default Helpers;



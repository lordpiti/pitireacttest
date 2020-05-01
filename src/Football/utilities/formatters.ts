class Formatters {
  static formatDate(date: string) {
    return new Intl.DateTimeFormat('en-GB', { 
      year: 'numeric', 
      month: 'long', 
      day: '2-digit' 
    }).format(new Date(date));
  }

  static formatDateWithDashes(date: string) {
    // const haha = new Intl.DateTimeFormat('en-GB').format(new Date(date));
    // return haha.replace(new RegExp('/', 'g'), '-');
    return date.substring(0, 10);
  }
}


export default Formatters;
class Date{
    static addDays(days) {
        let result = new Date();
        result.setDate(result.getDate() + days);
        return result;
      }
}

module.exports = Date;




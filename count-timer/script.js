const newYears = '1st Jan 2021';

function countDown() {
  const newYearsdDate = new Date(newYears);
  const currentDate = new Date();

  console.log(newYearsdDate - currentDate);
}

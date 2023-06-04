function getDayOfWeek(dayIndex) {
   const daysOfWeek = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
   ];
   return daysOfWeek[dayIndex];
}
function formatTime(createdAt) {
   const now = new Date();
   const createdDate = new Date(createdAt);
   const time = Math.floor((now.getTime() - createdDate.getTime()) / 1000);

   if (time <= 60) {
      return time + 's';
   } else if (time <= 60 * 60) {
      const minutes = Math.floor(time / 60);
      return minutes + 'm';
   } else if (time <= 60 * 60 * 60) {
      const hours = Math.floor(time / (60 * 60));
      return hours + 'h';
   } else if (createdDate < now) {
      const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const dayOfWeek = daysOfWeek[createdDate.getDay()];
      const hours = createdDate.getHours();
      const minutes = createdDate.getMinutes();
      return `${dayOfWeek} ${hours}:${minutes}`;
   }
}

export { formatTime };

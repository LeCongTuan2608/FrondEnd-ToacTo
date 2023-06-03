function formatTime(createdAt) {
   const now = new Date();
   const createdDate = new Date(createdAt);
   const time = Math.floor((now.getTime() - createdDate.getTime()) / 1000);

   if (time <= 60) {
      return time + 's';
   } else if (time <= 60 * 60) {
      const minutes = Math.floor(time / 60);
      return minutes + 'm';
   } else {
      const hours = Math.floor(time / (60 * 60));
      return hours + 'h';
   }
}

export default formatTime;

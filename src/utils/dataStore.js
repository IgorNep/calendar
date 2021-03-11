const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const time = [];
const startMeetingsHour = 10;
const endMeetingsHour = 18;
for (let i = startMeetingsHour; i <= endMeetingsHour; i += 1) {
  const hour = `${i}:00`;
  time.push(hour);
}
export { days, time };

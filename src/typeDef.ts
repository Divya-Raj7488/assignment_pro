interface task {
  title: string;
  day: string;
  hours: number;
  priority: string;
}
interface workout {
  type: string;
  minutes: number;
}
interface user {
  id: number;
  name: string;
  workouts: {
    type: string;
    minutes: number;
  }[];
}
export default task;
export { workout, user };

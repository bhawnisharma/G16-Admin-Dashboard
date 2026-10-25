// Owner: Manya - mock data

const firstNames = [
  "Bhawni", "Harshpreet", "Priyanshi", "Manya", "Aarav", "Kavya",
  "Rohan", "Simran", "Ishaan", "Ananya", "Vivaan", "Diya",
  "Arjun", "Myra", "Kabir", "Sara", "Reyansh", "Anika",
  "Aditya", "Navya", "Dev", "Riya", "Yash", "Tara",
];
const lastNames = [
  "Sharma", "Kaur", "Dabla", "Bansal", "Mehta", "Reddy", "Kapoor",
  "Verma", "Singh", "Gupta", "Chawla", "Malhotra", "Bhatia", "Sethi",
];
const genders = ["female", "male"];

function seededRandom(seed) {
  let value = seed;
  return () => {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
}

const rand = seededRandom(42);

export const users = Array.from({ length: 26 }, (_, i) => {
  const id = i + 1;
  const firstName = firstNames[i % firstNames.length];
  const lastName = lastNames[Math.floor(rand() * lastNames.length)];
  const gender = genders[i % 2];
  const age = 18 + Math.floor(rand() * 15);
  const email = `${firstName}.${lastName}@gmail.com`.toLowerCase();
  const role = id % 7 === 0 ? "admin" : "viewer";

  return { id, firstName, lastName, email, age, gender, role };
});

export const signupsLast7Days = [80, 68, 60, 65, 48, 46, 42];
export const cancellationsLast7Days = [88, 82, 70, 64, 58, 52, 50];
export const dayLabels = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"];

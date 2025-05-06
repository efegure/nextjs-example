import { PrismaClient } from "../generated/prisma"; // Adjust path if your generated client is elsewhere

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding ...");

  // --- Optional: Clean up existing data ---
  console.log("Deleting existing data ...");
  await prisma.plant.deleteMany();
  await prisma.location.deleteMany();
  await prisma.user.deleteMany();
  console.log("Deleted existing data.");
  // -----------------------------------------

  // --- Create Users ---
  const user1 = await prisma.user.create({
    data: {
      email: "alice@example.com",
      name: "Alice",
    },
  });
  console.log(`Created user with id: ${user1.id}`);

  const user2 = await prisma.user.create({
    data: {
      email: "bob@example.com",
      name: "Bob",
    },
  });
  console.log(`Created user with id: ${user2.id}`);

  // --- Create Locations (linked to Users) ---
  const location1_user1 = await prisma.location.create({
    data: {
      name: "Living Room",
      lat: 34.052235, // Example coordinates
      long: -118.243683,
      ownerId: user1.id,
    },
  });
  console.log(
    `Created location with id: ${location1_user1.id} for user ${user1.name}`
  );

  const location2_user1 = await prisma.location.create({
    data: {
      name: "Kitchen Shelf",
      lat: 34.052235, // Same or different coordinates
      long: -118.243683,
      ownerId: user1.id,
    },
  });
  console.log(
    `Created location with id: ${location2_user1.id} for user ${user1.name}`
  );

  const location1_user2 = await prisma.location.create({
    data: {
      name: "Office Desk",
      lat: 40.712776, // Example coordinates
      long: -74.005974,
      ownerId: user2.id,
    },
  });
  console.log(
    `Created location with id: ${location1_user2.id} for user ${user2.name}`
  );

  // --- Create Plants (linked to Users and Locations) ---
  await prisma.plant.create({
    data: {
      name: "Fiddle Leaf Fig",
      type: "Ficus lyrata",
      weeklyWaterNeedML: 1000,
      expectedHumidty: 60,
      ownerId: user1.id, // Belongs to user1
      locationId: location1_user1.id, // Is in user1's living room
    },
  });
  console.log("Created Fiddle Leaf Fig");

  await prisma.plant.create({
    data: {
      name: "Pothos",
      type: "Epipremnum aureum",
      weeklyWaterNeedML: 500,
      expectedHumidty: 50,
      ownerId: user1.id, // Belongs to user1
      locationId: location2_user1.id, // Is in user1's kitchen
    },
  });
  console.log("Created Pothos");

  await prisma.plant.create({
    data: {
      name: "Snake Plant",
      type: "Sansevieria trifasciata",
      weeklyWaterNeedML: 250,
      expectedHumidty: 40,
      ownerId: user2.id, // Belongs to user2
      locationId: location1_user2.id, // Is in user2's office
    },
  });
  console.log("Created Snake Plant");

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

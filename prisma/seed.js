import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Create Users
  const acceptors = await prisma.user.createMany({
    data: [
      {
        id: "acceptor1",
        role: "ACCEPTOR",
        fullname: "John Doe",
        phoneNum: "+11234567890",
        selfie: "https://example.com/johndoe_selfie.jpg",
        location: { type: "Point", coordinates: [-122.4194, 37.7749] },
        email: "johndoe@example.com",
      },
      {
        id: "acceptor2",
        role: "ACCEPTOR",
        fullname: "Jane Smith",
        phoneNum: "+11234567891",
        selfie: "https://example.com/janesmith_selfie.jpg",
        location: { type: "Point", coordinates: [-118.2437, 34.0522] },
        email: "janesmith@example.com",
      },
    ],
  });

  const donors = await prisma.user.createMany({
    data: [
      {
        id: "donor1",
        role: "DONOR",
        fullname: "Alice Cooper",
        phoneNum: "+11234567892",
        selfie: "https://example.com/alicecooper_selfie.jpg",
        location: { type: "Point", coordinates: [-74.006, 40.7128] },
        email: "alicecooper@example.com",
      },
      {
        id: "donor2",
        role: "DONOR",
        fullname: "Bob Marley",
        phoneNum: "+11234567893",
        selfie: "https://example.com/bobmarley_selfie.jpg",
        location: { type: "Point", coordinates: [-95.3698, 29.7604] },
        email: "bobmarley@example.com",
      },
    ],
  });

  const verifier = await prisma.user.create({
    data: {
      id: "verifier1",
      role: "VERIFIER",
      fullname: "Emily Clark",
      phoneNum: "+11234567894",
      selfie: "https://example.com/emilyclark_selfie.jpg",
      location: { type: "Point", coordinates: [-77.0369, 38.9072] },
      email: "emilyclark@example.com",
    },
  });

  // Create Tweets
  for (const donor of ["donor1", "donor2"]) {
    for (let i = 1; i <= 5; i++) {
      await prisma.tweet.create({
        data: {
          id: `${donor}_tweet${i}`,
          text: `Tweet #${i} from ${donor}`,
          authorId: donor,
        },
      });
    }
  }

  // Create Applications
  const applications = await prisma.application.createMany({
    data: [
      {
        id: "application1",
        authorId: "acceptor1",
        amount: "5000",
        reason: "Medical expenses",
        status: "CREATED",
        bookmarkedUserId: "donor1", // Unique ID
        rating: 5,
      },
      {
        id: "application2",
        authorId: "acceptor2",
        amount: "3000",
        reason: "Educational support",
        status: "CREATED",
        bookmarkedUserId: "donor2", // Unique ID
        rating: 4,
      },
    ],
  });

  // Create Connection
  await prisma.connection.create({
    data: {
      connectionId: "donor2",
    },
  });

  console.log("Seed data created successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

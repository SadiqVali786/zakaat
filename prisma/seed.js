import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Create Users
  const acceptors = await prisma.user.createMany({
    data: [
      {
        id: "acceptor1",
        role: "ACCEPTOR",
        fullname: "Rajesh",
        phoneNum: "9916180493",
        selfie: "https://example.com/rajesh_selfie.jpg",
        location: { type: "Point", coordinates: [77.5946, 12.9716] },
        email: "rajesh@example.com",
      },
      {
        id: "acceptor2",
        role: "ACCEPTOR",
        fullname: "Venkatesh",
        phoneNum: "7382582834",
        selfie: "https://example.com/venkatesh_selfie.jpg",
        location: { type: "Point", coordinates: [78.4772, 17.4065] },
        email: "venkatesh@example.com",
      },
    ],
  });

  const donors = await prisma.user.createMany({
    data: [
      {
        id: "donor1",
        role: "DONOR",
        fullname: "Mahaboob Basha",
        phoneNum: "7799584615",
        selfie: "https://example.com/mababoob_basha_selfie.jpg",
        location: { type: "Point", coordinates: [75.3412, 33.2778] },
        email: "mahaboob_basha@example.com",
      },
      {
        id: "donor2",
        role: "DONOR",
        fullname: "Shameem",
        phoneNum: "9440365688",
        selfie: "https://example.com/shameem_selfie.jpg",
        location: { type: "Point", coordinates: [77.6017, 14.6824] },
        email: "shameem@example.com",
      },
    ],
  });

  // const verifier = await prisma.user.create({
  //   data: {
  //     id: "verifier1",
  //     role: "VERIFIER",
  //     fullname: "Emily Clark",
  //     phoneNum: "+11234567894",
  //     selfie: "https://example.com/emilyclark_selfie.jpg",
  //     location: { type: "Point", coordinates: [-77.0369, 38.9072] },
  //     email: "emilyclark@example.com",
  //   },
  // });

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
        amount: 5000,
        reason: "Medical expenses",
        status: "VERIFIED",
        hide: false,
        bookmarkedUserId: "donor1", // Unique ID
        verifierUserId: "",
        rating: 5,
      },
      {
        id: "application2",
        authorId: "acceptor2",
        amount: 3000,
        reason: "Educational support",
        status: "VERIFIED",
        hide: false,
        bookmarkedUserId: "donor2", // Unique ID
        verifierUserId: "",
        rating: 4,
      },
    ],
  });

  // Create Connection
  const connection = await prisma.connection.create({
    data: {
      id: "connection1",
      from: "cm4y66yax0002t5flhwe2teb3",
      to: "donor1",
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

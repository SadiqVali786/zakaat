import { PrismaClient, STATUS, ROLE } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  // Seed Users
  const users = await Promise.all(
    Array.from({ length: 18 }).map((_, i) =>
      prisma.user.create({
        data: {
          role:
            i === 0
              ? ROLE.ADMIN
              : i <= 5
              ? ROLE.DONOR
              : i <= 15
              ? ROLE.ACCEPTOR
              : ROLE.VERIFIER,
          selfie: faker.image.avatar(),
          phoneNum: faker.phone.number(),
          bio: i > 0 && i <= 5 ? faker.lorem.sentence() : undefined, // DONOR-specific
        },
      })
    )
  );

  const acceptors = users.filter((user) => user.role === ROLE.ACCEPTOR);
  const donors = users.filter((user) => user.role === ROLE.DONOR);
  const verifiers = users.filter((user) => user.role === ROLE.VERIFIER);

  // Seed Addresses for Acceptors
  await Promise.all(
    acceptors.map((acceptor) =>
      prisma.address.create({
        data: {
          userId: acceptor.id,
          doorNumber: faker.address.buildingNumber(),
          colony: faker.address.street(),
          landmark: faker.address.secondaryAddress(),
          village: faker.address.city(),
          mandal: faker.address.city(),
          district: faker.address.state(),
          state: faker.address.state(),
          pincode: faker.address.zipCode(),
          latitude: faker.address.latitude().toString(),
          longitude: faker.address.longitude().toString(),
        },
      })
    )
  );

  // Seed Applications for Acceptors
  const applications = await Promise.all(
    acceptors.map((acceptor) =>
      prisma.application.create({
        data: {
          authorId: acceptor.id,
          amount: faker.commerce.price({
            min: 10000,
            max: 100000,
            dec: 0,
            symbol: "₹",
          }),
          reason: faker.lorem.paragraph(),
          status: STATUS.CREATED,
        },
      })
    )
  );

  // Verify 8 applications by the first verifier
  const verifiedApplications = await Promise.all(
    applications.slice(0, 8).map((application) =>
      prisma.application.update({
        where: { id: application.id },
        data: { status: STATUS.VERIFIED, verifiedByUserId: verifiers[0].id },
      })
    )
  );

  // Bookmark 2 applications by 2 different donors
  await Promise.all(
    verifiedApplications.slice(0, 2).map((application, index) =>
      prisma.application.update({
        where: { id: application.id },
        data: { bookmarkedDonorId: donors[index].id },
      })
    )
  );

  // Donate to 2 applications by 2 different donors
  await Promise.all(
    verifiedApplications.slice(2, 4).map((application, index) =>
      prisma.application.update({
        where: { id: application.id },
        data: { donatedDonorId: donors[index + 2].id },
      })
    )
  );

  // Seed Tweets for Donors
  for (const donor of donors) {
    const donorFollowers = users.filter(() => faker.datatype.boolean()); // Randomly pick followers
    const tweetTexts = verifiedApplications.map(
      (app) =>
        `I recommend supporting the Zakaat application by ${app.authorId}. Reason: ${app.reason}. Amount: ${app.amount}.`
    );

    for (let i = 0; i < 2; i++) {
      await prisma.tweet.create({
        data: {
          text: tweetTexts[
            faker.number.int({ min: 0, max: verifiedApplications.length - 1 })
          ],
          tweetAuthorId: donor.id,
        },
      });
    }

    // Connect Followers
    await prisma.user.update({
      where: { id: donor.id },
      data: {
        following: {
          connect: donorFollowers.map((follower) => ({ id: follower.id })),
        },
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

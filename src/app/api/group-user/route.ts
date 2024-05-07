import axios from "axios";
import { GroupedUserData, User } from "./type";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { data } = await axios<{ users: User[] }>(
      "https://dummyjson.com/users"
    );

    const groupedUsers: GroupedUserData = data.users.reduce((acc, user) => {
      const department = user.company.department;
      const { firstName, lastName, age, gender, hair, address } = user;
      const { color } = hair;
      const { postalCode } = address;
      const userAddress = `${firstName} ${lastName}`;

      if (!acc[department]) {
        acc[department] = {
          male: 0,
          female: 0,
          ageRange: "",
          hair: {},
          addressUser: {},
        };
      }

      const {
        male,
        female,
        ageRange,
        hair: hairCount,
        addressUser,
      } = acc[department];

      acc[department] = {
        male: gender === "male" ? male + 1 : male,
        female: gender === "female" ? female + 1 : female,
        ageRange: updateAgeRange(ageRange, age),
        hair: {
          ...hairCount,
          [color]: hairCount[color] ? hairCount[color] + 1 : 1,
        },
        addressUser: {
          ...addressUser,
          [userAddress]: postalCode,
        },
      };

      return acc;
    }, {} as GroupedUserData);

    return NextResponse.json(groupedUsers);
  } catch (error) {
    console.error("Failed", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

function updateAgeRange(currentRange: string, age: number): string {
  if (!currentRange) {
    return `${age}-${age}`;
  }

  const [minAge, maxAge] = currentRange.split("-");
  return `${Math.min(+minAge, age)}-${Math.max(+maxAge, age)}`;
}

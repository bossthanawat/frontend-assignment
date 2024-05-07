import { GET } from "@/app/api/group-user/route";
import axios from "axios";
import { NextResponse } from "next/server";
jest.mock("axios", () => jest.fn());

describe("GET API Route /api/group-user", () => {
  const mockUsers = [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      age: 30,
      gender: "male",
      hair: { color: "black" },
      address: { postalCode: "12345" },
      company: { department: "IT" },
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      age: 25,
      gender: "female",
      hair: { color: "brown" },
      address: { postalCode: "67890" },
      company: { department: "HR" },
    },
    {
      id: 3,
      firstName: "Bob",
      lastName: "Johnson",
      age: 40,
      gender: "male",
      hair: { color: "blond" },
      address: { postalCode: "54321" },
      company: { department: "IT" },
    },
  ];

  beforeEach(() => {
    axios.get = jest.fn().mockResolvedValue({
      data: { users: mockUsers },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should group users by department correctly", async () => {
    const response = await GET();
    const data = await response.json();

    expect(data).toEqual({
      IT: {
        male: 2,
        female: 0,
        ageRange: "30-40",
        hair: {
          black: 1,
          blond: 1,
        },
        addressUser: {
          "John Doe": "12345",
          "Bob Johnson": "54321",
        },
      },
      HR: {
        male: 0,
        female: 1,
        ageRange: "25-25",
        hair: {
          brown: 1,
        },
        addressUser: {
          "Jane Smith": "67890",
        },
      },
    });
  });
});

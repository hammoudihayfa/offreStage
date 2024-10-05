import { getSession } from "next-auth/react";


let usersDatabase = [
  {
    id: 1,
    name: "hayfa",
    email: "hammoudi.hayfa@esprit.tn",
    firstName: "hammoudi",
    birthDate: "1998-04-14",
    address: "123 Main St, Paris, France",
    phoneNumber: "24903943"
  },
];

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (req.method === "POST") {
    const userInfo = req.body;

    const userId = session.user.id; 
    const userIndex = usersDatabase.findIndex(user => user.id === userId);

    if (userIndex === -1) {
      return res.status(404).json({ message: "User not found" });
    }

    usersDatabase[userIndex] = {
      ...usersDatabase[userIndex],
      ...userInfo,
    };

    return res.status(200).json({ message: "User info updated successfully" });
  } else {
   
    return res.status(405).json({ message: "Method not allowed" });
  }
}



import { getSession } from "next-auth/react";


let usersDB = [
  {
    email: "hammoudi.hayfa@esprit.tn",
    name: "hammoudi",
    firstName: "hayfa",
    birthDate: "1990-01-01",
    address: "123 Rue de Paris",
    phoneNumber: "0123456789",
  },
];

export default async function handler(req, res) {

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }


  const session = await getSession({ req });

  
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
   
    const { name, firstName, birthDate, address, phoneNumber } = req.body;

    let userIndex = usersDB.findIndex(user => user.email === session.user.email);

    if (userIndex !== -1) {
     
      usersDB[userIndex] = {
        ...usersDB[userIndex],
        name,
        firstName,
        birthDate,
        address,
        phoneNumber,
      };

      return res.status(200).json({ message: 'User updated successfully', user: usersDB[userIndex] });
    } else {
  
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

import { useSession } from "next-auth/react";
import { useState } from "react";
import axios from "axios";
import styles from './Profile.module.css'; // Importez le CSS

const Profile = () => {
  const { data: session } = useSession();
  const [userInfo, setUserInfo] = useState({
    name: session?.user?.name || '',
    email: session?.user?.email || '',
    firstName: '', 
    birthDate: '', 
    address: '',   
    phoneNumber: '', 
    addressValid: true, 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const validateAddress = async (address) => {
    try {
      const response = await axios.get(`https://api-adresse.data.gouv.fr/search/?q=${address}&limit=1`);
      const results = response.data.features;

      if (results.length > 0) {
        const { coordinates } = results[0].geometry;
        const parisCoords = { lat: 48.8566, lon: 2.3522 }; 

        const distance = calculateDistance(parisCoords.lat, parisCoords.lon, coordinates[1], coordinates[0]);
        return distance <= 50; 
      }
      return false;
    } catch (error) {
      console.error("Erreur lors de la validation de l'adresse:", error);
      return false;
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; 
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isAddressValid = await validateAddress(userInfo.address);
    if (!isAddressValid) {
      alert("L'adresse doit être située à moins de 50 km de Paris.");
      return;
    }

    await axios.post('/api/user/update', userInfo);
    alert("Informations mises à jour avec succès !");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Modifier votre profil</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="firstName">Prénom</label>
          <input
            className={styles.input}
            type="text"
            name="firstName"
            value={userInfo.firstName}
            onChange={handleChange}
            placeholder="Prénom"
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="name">Nom</label>
          <input
            className={styles.input}
            type="text"
            name="name"
            value={userInfo.name}
            onChange={handleChange}
            placeholder="Nom"
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="email">Email</label>
          <input
            className={styles.input}
            type="email"
            name="email"
            value={userInfo.email}
            onChange={handleChange}
            placeholder="Email"
            required
            disabled
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="birthDate">Date de naissance</label>
          <input
            className={styles.input}
            type="date"
            name="birthDate"
            value={userInfo.birthDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="address">Adresse</label>
          <input
            className={styles.input}
            type="text"
            name="address"
            value={userInfo.address}
            onChange={handleChange}
            placeholder="Adresse"
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="phoneNumber">Numéro de téléphone</label>
          <input
            className={styles.input}
            type="tel"
            name="phoneNumber"
            value={userInfo.phoneNumber}
            onChange={handleChange}
            placeholder="Numéro de téléphone"
            required
          />
        </div>
        <button className={styles.button} type="submit">Mettre à jour</button>
      </form>
      {!userInfo.addressValid && <p style={{ color: 'red' }}>L'adresse n'est pas valide !</p>}
    </div>
  );
};

export default Profile;

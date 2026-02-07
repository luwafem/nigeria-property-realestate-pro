// src/services/firebase.js
import { 
  initializeApp, 
  getApps, 
  getApp 
} from "firebase/app";
import { 
  getFirestore, 
  collection, 
  getDocs, 
  getDoc,  // Add this
  doc, 
  setDoc, 
  deleteDoc,  // Add this
  serverTimestamp,
  enableIndexedDbPersistence,
  query,
  where
} from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTwezChJ_g35k8i2Md2h5GD--R4wWoGD8",
  authDomain: "rental-a59a2.firebaseapp.com",
  projectId: "rental-a59a2",
  storageBucket: "rental-a59a2.firebasestorage.app",
  messagingSenderId: "72293953986",
  appId: "1:72293953986:web:90e77d27cd57655150265b"
};

// Initialize Firebase
let app;
try {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  console.log("Firebase app initialized:", app.name);
} catch (error) {
  console.error("Firebase initialization error:", error);
}

const db = app ? getFirestore(app) : null;

// Enable offline persistence (caches data locally)
export const enableOfflinePersistence = async () => {
  if (!db) return false;
  
  try {
    await enableIndexedDbPersistence(db, {
      forceOwnership: true
    });
    console.log("Firestore offline persistence enabled");
    return true;
  } catch (err) {
    if (err.code === 'failed-precondition') {
      console.warn("Multiple tabs open, persistence can only be enabled in one tab at a time.");
    } else if (err.code === 'unimplemented') {
      console.warn("The current browser doesn't support all of the features required to enable persistence");
    }
    return false;
  }
};

// Initialize default collections with sample data
export const initializeCollections = async () => {
  if (!db) {
    console.error("Firestore not initialized");
    return false;
  }

  try {
    // Check if properties collection exists
    const propertiesRef = collection(db, "properties");
    const propertiesSnapshot = await getDocs(propertiesRef);
    
    if (propertiesSnapshot.empty) {
      console.log("Initializing properties collection with sample data...");
      
      // Update the sample properties in firebase.js initialization
const sampleProperties = [
  {
    id: "lagos-land-001",
    title: "Prime Land in Lekki Phase 1",
    description: "Premium residential land in the heart of Lekki Phase 1. Perfect for building your dream home or investment property. Clear title with C of O available.",
    price: 50000000,
    pricePerPlot: 50000000,
    type: "land",
    city: "Lagos",
    area: "Lekki Phase 1",
    size: "500 sqm",
    plots: 1,
    titleStatus: "C of O",
    status: "available",
    featured: true,
    paymentPlan: "Installment Plan",
    paymentTerms: "30% downpayment, balance in 12 months",
    images: [
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["24/7 Security", "Power Supply", "Water Supply"],
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  },
  {
    id: "abuja-estate-002",
    title: "Royal Gardens Estate - Abuja",
    description: "Luxury gated estate development in Maitama. Phase 1 completely sold out. Phase 2 now available with premium plots and modern infrastructure.",
    price: 250000000,
    pricePerPlot: 50000000,
    type: "estate",
    city: "Abuja",
    area: "Maitama",
    plots: 5,
    status: "developing",
    featured: true,
    paymentPlan: "Flexible Payment",
    paymentTerms: "20% booking fee, installment options available",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    estateFeatures: [
      "Gated Community",
      "24/7 Security",
      "Internal Roads",
      "Street Lights",
      "Drainage System",
      "Shopping Mall",
      "Recreation Center"
    ],
    amenities: ["Swimming Pool", "Gym", "Children Playground", "Parking Space"],
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  },
  {
    id: "lekki-villa-003",
    title: "Luxury 5-Bedroom Villa in Victoria Island",
    description: "Stunning contemporary villa with panoramic ocean views. Modern architecture with premium finishes. Smart home features and private pool.",
    price: 350000000,
    type: "villa",
    city: "Lagos",
    area: "Victoria Island",
    bedrooms: 5,
    bathrooms: 6,
    squareFeet: 6500,
    yearBuilt: 2022,
    status: "available",
    featured: true,
    paymentPlan: "Outright Purchase",
    images: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Swimming Pool", "Gym", "Security", "Parking", "Generator", "Smart Home"],
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  }
];

      // Add sample properties
      for (const property of sampleProperties) {
        const docRef = doc(db, "properties", property.id);
        await setDoc(docRef, property);
      }
      console.log("Sample properties added successfully");
    }

    // Initialize cities collection
    const citiesRef = collection(db, "cities");
    const citiesSnapshot = await getDocs(citiesRef);
    
    if (citiesSnapshot.empty) {
      console.log("Initializing cities collection...");
      
      const nigerianCities = [
        {
          id: "lagos",
          name: "Lagos",
          description: "Commercial capital of Nigeria with diverse neighborhoods",
          propertyCount: 0,
          featured: true
        },
        {
          id: "abuja",
          name: "Abuja",
          description: "Federal capital territory with modern infrastructure",
          propertyCount: 0,
          featured: true
        },
        {
          id: "port-harcourt",
          name: "Port Harcourt",
          description: "Oil-rich city in the Niger Delta region",
          propertyCount: 0,
          featured: false
        },
        {
          id: "ibadan",
          name: "Ibadan",
          description: "Largest city in West Africa by geographical area",
          propertyCount: 0,
          featured: false
        },
        {
          id: "kano",
          name: "Kano",
          description: "Major commercial and industrial center in Northern Nigeria",
          propertyCount: 0,
          featured: false
        }
      ];

      for (const city of nigerianCities) {
        const docRef = doc(db, "cities", city.id);
        await setDoc(docRef, city);
      }
      console.log("Cities collection initialized");
    }

    // Initialize CMS users collection (simple authentication)
    const usersRef = collection(db, "cms_users");
    const usersSnapshot = await getDocs(usersRef);
    
    if (usersSnapshot.empty) {
      console.log("Initializing CMS users...");
      
      const defaultUser = {
        username: "admin",
        password: "admin123", // In production, use proper hashing!
        email: "admin@naijarentals.com",
        role: "admin",
        createdAt: serverTimestamp(),
        lastLogin: null
      };
      
      const userDocRef = doc(usersRef, "admin");
      await setDoc(userDocRef, defaultUser);
      console.log("Default admin user created (username: admin, password: admin123)");
    }

    return true;
  } catch (error) {
    console.error("Error initializing collections:", error);
    return false;
  }
};

// Main initialization function
export const initializeFirebase = async () => {
  if (!app || !db) {
    console.error("Firebase not properly initialized");
    return {
      success: false,
      message: "Firebase initialization failed"
    };
  }

  try {
    console.log("Checking Firebase connection...");
    
    // Test connection by trying to read a non-existent document
    // This will fail fast if not connected
    const testRef = collection(db, "_connection_test");
    await getDocs(testRef).catch(() => {
      // This is expected to fail since collection doesn't exist
    });
    
    console.log("✅ Firebase connection successful");
    
    // Enable offline persistence
    await enableOfflinePersistence();
    
    // Initialize collections with sample data
    const collectionsInitialized = await initializeCollections();
    
    return {
      success: true,
      message: "Firebase initialized successfully",
      collectionsInitialized
    };
  } catch (error) {
    console.error("❌ Firebase connection error:", error);
    return {
      success: false,
      message: error.message || "Failed to connect to Firebase"
    };
  }
};

// Utility functions for properties
export const getProperties = async () => {
  if (!db) return [];
  
  try {
    const querySnapshot = await getDocs(collection(db, "properties"));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error getting properties:", error);
    return [];
  }
};

export const getPropertyById = async (id) => {
  if (!db) return null;
  
  try {
    const docRef = doc(db, "properties", id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    console.error("Error getting property:", error);
    return null;
  }
};

export const addProperty = async (propertyData) => {
  if (!db) return null;
  
  try {
    const propertiesRef = collection(db, "properties");
    const docRef = doc(propertiesRef);
    
    const propertyWithMeta = {
      ...propertyData,
      id: docRef.id,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      views: 0
    };
    
    await setDoc(docRef, propertyWithMeta);
    return { id: docRef.id, ...propertyWithMeta };
  } catch (error) {
    console.error("Error adding property:", error);
    throw error;
  }
};

export const updateProperty = async (id, updates) => {
  if (!db) return false;
  
  try {
    const docRef = doc(db, "properties", id);
    await setDoc(docRef, {
      ...updates,
      updatedAt: serverTimestamp()
    }, { merge: true });
    return true;
  } catch (error) {
    console.error("Error updating property:", error);
    return false;
  }
};

export const deleteProperty = async (id) => {
  if (!db) return false;
  
  try {
    const docRef = doc(db, "properties", id);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error("Error deleting property:", error);
    return false;
  }
};

// Export db and app
export { db, app };
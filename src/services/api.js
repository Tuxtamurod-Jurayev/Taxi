import { isSupabaseConfigured, supabase } from "./supabaseClient";

const STORAGE_KEYS = {
  requests: "qatnov-passenger-requests",
  routes: "qatnov-taxi-routes",
  seeded: "qatnov-demo-seeded",
};

const EVENT_NAMES = {
  requests: "qatnov:requests-changed",
  routes: "qatnov:routes-changed",
};

const isBrowser = typeof window !== "undefined" && typeof localStorage !== "undefined";
const EXPIRY_MS = 60 * 60 * 1000;

function createId(prefix) {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function shiftHours(hours) {
  return new Date(Date.now() + hours * 60 * 60 * 1000).toISOString();
}

function shiftMinutes(minutes) {
  return new Date(Date.now() + minutes * 60 * 1000).toISOString();
}

function readStorage(key) {
  if (!isBrowser) {
    return [];
  }

  const rawValue = localStorage.getItem(key);

  if (!rawValue) {
    return [];
  }

  try {
    return JSON.parse(rawValue);
  } catch {
    return [];
  }
}

function writeStorage(key, value) {
  if (!isBrowser) {
    return;
  }

  localStorage.setItem(key, JSON.stringify(value));
}

function emitChange(eventName) {
  if (!isBrowser) {
    return;
  }

  window.dispatchEvent(new CustomEvent(eventName));
}

function ensureSeedData() {
  if (!isBrowser || isSupabaseConfigured) {
    return;
  }

  if (localStorage.getItem(STORAGE_KEYS.seeded) === "true") {
    return;
  }

  const demoRoutes = [
    {
      id: createId("route"),
      driver_id: "driver-1",
      driver_name: "Aziz",
      driver_phone: "+998 90 101 11 22",
      car_model: "Damas",
      car_plate: "50T009PA",
      from_location: "Toshkent",
      to_location: "Parkent",
      departure_time: shiftHours(1),
      seats: 3,
      status: "active",
      created_at: shiftMinutes(-8),
    },
    {
      id: createId("route"),
      driver_id: "driver-2",
      driver_name: "Sardor",
      driver_phone: "+998 93 222 33 44",
      car_model: "Cobalt",
      car_plate: "60A123BC",
      from_location: "Andijon",
      to_location: "Marhamat",
      departure_time: shiftHours(2),
      seats: 2,
      status: "active",
      created_at: shiftMinutes(-18),
    },
    {
      id: createId("route"),
      driver_id: "driver-3",
      driver_name: "Javohir",
      driver_phone: "+998 99 555 77 88",
      car_model: "Labo",
      car_plate: "70Q321DA",
      from_location: "Namangan",
      to_location: "Chortoq",
      departure_time: shiftHours(4),
      seats: 1,
      status: "active",
      created_at: shiftMinutes(-27),
    },
  ];

  const demoRequests = [
    {
      id: createId("request"),
      user_id: "passenger-1",
      passenger_name: "Dilshod",
      from_location: "Toshkent",
      to_location: "Parkent",
      departure_time: shiftHours(1.5),
      phone: "+998 91 010 10 10",
      status: "active",
      created_at: shiftMinutes(-10),
    },
    {
      id: createId("request"),
      user_id: "passenger-2",
      passenger_name: "Muhlisa",
      from_location: "Andijon",
      to_location: "Marhamat",
      departure_time: shiftHours(2.5),
      phone: "+998 97 303 03 03",
      status: "active",
      created_at: shiftMinutes(-22),
    },
    {
      id: createId("request"),
      user_id: "passenger-3",
      passenger_name: "Kamola",
      from_location: "Namangan",
      to_location: "Chortoq",
      departure_time: shiftHours(5),
      phone: "+998 90 123 45 67",
      status: "active",
      created_at: shiftMinutes(-34),
    },
  ];

  writeStorage(STORAGE_KEYS.routes, demoRoutes);
  writeStorage(STORAGE_KEYS.requests, demoRequests);
  localStorage.setItem(STORAGE_KEYS.seeded, "true");
}

function sortByCreatedAt(items) {
  return [...items].sort((left, right) => new Date(right.created_at) - new Date(left.created_at));
}

function pruneExpiredItems(key) {
  const items = readStorage(key);
  const activeItems = items.filter((item) => Date.now() - new Date(item.created_at).getTime() < EXPIRY_MS);

  if (activeItems.length !== items.length) {
    writeStorage(key, activeItems);
  }

  return activeItems;
}

function getSupabaseClient() {
  if (!isSupabaseConfigured || !supabase) {
    return null;
  }

  return supabase;
}

function getExpiryIso() {
  return new Date(Date.now() - EXPIRY_MS).toISOString();
}

ensureSeedData();

export async function fetchPassengerRequests() {
  const client = getSupabaseClient();

  if (client) {
    const { data, error } = await client
      .from("passenger_requests")
      .select("*")
      .gte("created_at", getExpiryIso())
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    return data ?? [];
  }

  return sortByCreatedAt(pruneExpiredItems(STORAGE_KEYS.requests));
}

export async function createPassengerRequest(payload) {
  const client = getSupabaseClient();

  if (client) {
    const { error } = await client.from("passenger_requests").insert({
      passenger_name: payload.passenger_name || "Yolovchi",
      from_location: payload.from_location,
      to_location: payload.to_location,
      departure_time: new Date(payload.departure_time).toISOString(),
      phone: payload.phone,
      status: "active",
    });

    if (error) {
      throw error;
    }

    return;
  }

  const requests = readStorage(STORAGE_KEYS.requests);
  const nextItem = {
    id: createId("request"),
    user_id: createId("passenger"),
    passenger_name: payload.passenger_name || "Yolovchi",
    from_location: payload.from_location,
    to_location: payload.to_location,
    departure_time: new Date(payload.departure_time).toISOString(),
    phone: payload.phone,
    status: "active",
    created_at: new Date().toISOString(),
  };

  writeStorage(STORAGE_KEYS.requests, [nextItem, ...requests]);
  emitChange(EVENT_NAMES.requests);
}

export async function deletePassengerRequest(id) {
  const client = getSupabaseClient();

  if (client) {
    const { error } = await client.from("passenger_requests").delete().eq("id", id);

    if (error) {
      throw error;
    }

    return;
  }

  const requests = pruneExpiredItems(STORAGE_KEYS.requests).filter((item) => item.id !== id);
  writeStorage(STORAGE_KEYS.requests, requests);
  emitChange(EVENT_NAMES.requests);
}

export async function fetchTaxiRoutes() {
  const client = getSupabaseClient();

  if (client) {
    const { data, error } = await client
      .from("taxi_routes")
      .select("*")
      .gte("created_at", getExpiryIso())
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    return data ?? [];
  }

  return sortByCreatedAt(pruneExpiredItems(STORAGE_KEYS.routes));
}

export async function createTaxiRoute(payload) {
  const client = getSupabaseClient();
  const routePayload = {
    driver_name: payload.driver_name || "Haydovchi",
    driver_phone: payload.driver_phone || "Telefon kiritilmagan",
    car_model: payload.car_model || "Mashina kiritilmagan",
    car_plate: (payload.car_plate || "Raqam kiritilmagan").toUpperCase(),
    from_location: payload.from_location,
    to_location: payload.to_location,
    departure_time: new Date(payload.departure_time).toISOString(),
    seats: Number(payload.seats),
    status: "active",
  };

  if (client) {
    const { error } = await client.from("taxi_routes").insert(routePayload);

    if (error) {
      throw error;
    }

    return;
  }

  const routes = readStorage(STORAGE_KEYS.routes);
  const nextItem = {
    id: createId("route"),
    driver_id: createId("driver"),
    ...routePayload,
    created_at: new Date().toISOString(),
  };

  writeStorage(STORAGE_KEYS.routes, [nextItem, ...routes]);
  emitChange(EVENT_NAMES.routes);
}

export function subscribeToTable(table, callback) {
  const client = getSupabaseClient();

  if (client) {
    const channel = client
      .channel(`${table}-changes`)
      .on("postgres_changes", { event: "*", schema: "public", table }, callback)
      .subscribe();

    return {
      unsubscribe: () => {
        client.removeChannel(channel);
      },
    };
  }

  if (!isBrowser) {
    return { unsubscribe: () => {} };
  }

  const eventName = table === "passenger_requests" ? EVENT_NAMES.requests : EVENT_NAMES.routes;

  const handleChange = () => callback();
  const handleStorage = (event) => {
    const key = table === "passenger_requests" ? STORAGE_KEYS.requests : STORAGE_KEYS.routes;

    if (event.key === key) {
      callback();
    }
  };

  window.addEventListener(eventName, handleChange);
  window.addEventListener("storage", handleStorage);

  return {
    unsubscribe: () => {
      window.removeEventListener(eventName, handleChange);
      window.removeEventListener("storage", handleStorage);
    },
  };
}

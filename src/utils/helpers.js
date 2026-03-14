export function normalizeLocation(value) {
  return (value || "").trim().toLowerCase();
}

export function findMatchingPassengers(route, requests) {
  if (!route) {
    return [];
  }

  return requests.filter((request) => {
    const sameFrom = normalizeLocation(request.from_location) === normalizeLocation(route.from_location);
    const sameTo = normalizeLocation(request.to_location) === normalizeLocation(route.to_location);
    const timeDiff =
      Math.abs(new Date(request.departure_time).getTime() - new Date(route.departure_time).getTime()) /
      (1000 * 60 * 60);

    return sameFrom && sameTo && timeDiff < 2;
  });
}

export function buildDashboardStats(requests, routes) {
  const today = new Date().toDateString();
  const topPassenger = aggregatePassengers(requests)[0] || null;
  const topDriver = aggregateDrivers(routes)[0] || null;

  return {
    totalUsers: new Set(
      [...requests.map((item) => item.user_id), ...routes.map((item) => item.driver_id)].filter(Boolean),
    ).size,
    totalPassengers: requests.length,
    totalDrivers: new Set(routes.map((item) => item.driver_id).filter(Boolean)).size || routes.length,
    todayRequests: requests.filter((item) => new Date(item.created_at).toDateString() === today).length,
    topPassenger,
    topDriver,
  };
}

export function aggregateDrivers(routes) {
  if (!routes.length) {
    return [];
  }

  const map = new Map();

  routes.forEach((route, index) => {
    const key = route.driver_id || `demo-${index}`;
    const current = map.get(key) || {
      id: key,
      name: route.driver_name || (route.driver_id ? `Driver ${route.driver_id.slice(0, 6)}` : `Driver ${index + 1}`),
      phone: route.driver_phone || "Telefon mavjud emas",
      car_model: route.car_model || "Mashina kiritilmagan",
      car_plate: route.car_plate || "Raqam kiritilmagan",
      routes: 0,
      status: "active",
    };

    current.routes += 1;
    current.status = route.status;
    current.car_model = route.car_model || current.car_model;
    current.car_plate = route.car_plate || current.car_plate;
    map.set(key, current);
  });

  return Array.from(map.values()).sort((left, right) => right.routes - left.routes);
}

export function aggregatePassengers(requests) {
  if (!requests.length) {
    return [];
  }

  const map = new Map();

  requests.forEach((request, index) => {
    const key = request.user_id || request.phone || `passenger-${index}`;
    const current = map.get(key) || {
      id: key,
      name: request.passenger_name || `Yolovchi ${index + 1}`,
      phone: request.phone || "Telefon mavjud emas",
      requests: 0,
      last_posted_at: request.created_at,
      status: request.status,
    };

    current.requests += 1;
    current.status = request.status;

    if (new Date(request.created_at) > new Date(current.last_posted_at)) {
      current.last_posted_at = request.created_at;
    }

    map.set(key, current);
  });

  return Array.from(map.values()).sort((left, right) => right.requests - left.requests);
}

function countByBucket(items, getKey, labels) {
  const counts = new Map(labels.map((label) => [label, 0]));

  items.forEach((item) => {
    const key = getKey(new Date(item.created_at));
    if (counts.has(key)) {
      counts.set(key, (counts.get(key) || 0) + 1);
    }
  });

  return labels.map((label) => ({ label, count: counts.get(label) || 0 }));
}

export function buildChartData(requests) {
  const now = new Date();
  const dayLabels = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(now);
    date.setDate(now.getDate() - (6 - index));
    return `${date.getMonth() + 1}/${date.getDate()}`;
  });

  const weekLabels = Array.from({ length: 7 }, (_, index) => `-${6 - index}d`);
  const monthLabels = Array.from({ length: 6 }, (_, index) => {
    const date = new Date(now.getFullYear(), now.getMonth() - (5 - index), 1);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
  });

  return {
    daily: countByBucket(
      requests,
      (date) => `${date.getMonth() + 1}/${date.getDate()}`,
      dayLabels,
    ),
    weekly: countByBucket(
      requests,
      (date) => {
        const diff = Math.floor((now - date) / (1000 * 60 * 60 * 24));
        return `-${Math.min(Math.max(diff, 0), 6)}d`;
      },
      weekLabels,
    ),
    monthly: countByBucket(
      requests,
      (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`,
      monthLabels,
    ),
  };
}

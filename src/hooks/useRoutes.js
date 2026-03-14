import { useCallback, useEffect, useState } from "react";
import { createTaxiRoute, fetchTaxiRoutes, subscribeToTable } from "../services/api";

export function useRoutes() {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadRoutes = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchTaxiRoutes();
      setRoutes(data);
      setError("");
    } catch (loadError) {
      setError(loadError.message);
      setRoutes([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRoutes();
  }, [loadRoutes]);

  useEffect(() => {
    const subscription = subscribeToTable("taxi_routes", () => {
      loadRoutes();
    });

    return () => subscription.unsubscribe();
  }, [loadRoutes]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      loadRoutes();
    }, 60000);

    return () => window.clearInterval(timer);
  }, [loadRoutes]);

  const createRoute = async (payload) => {
    try {
      setSaving(true);
      await createTaxiRoute(payload);
      await loadRoutes();
      setError("");
      return true;
    } catch (saveError) {
      setError(saveError.message);
      return false;
    } finally {
      setSaving(false);
    }
  };

  return {
    routes,
    loading,
    saving,
    error,
    createRoute,
    reload: loadRoutes,
  };
}

import { useCallback, useEffect, useState } from "react";
import {
  createPassengerRequest,
  deletePassengerRequest,
  fetchPassengerRequests,
  subscribeToTable,
} from "../services/api";

export function useRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState("");
  const [error, setError] = useState("");

  const loadRequests = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchPassengerRequests();
      setRequests(data);
      setError("");
    } catch (loadError) {
      setError(loadError.message);
      setRequests([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRequests();
  }, [loadRequests]);

  useEffect(() => {
    const subscription = subscribeToTable("passenger_requests", () => {
      loadRequests();
    });

    return () => subscription.unsubscribe();
  }, [loadRequests]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      loadRequests();
    }, 60000);

    return () => window.clearInterval(timer);
  }, [loadRequests]);

  const createRequest = async (payload) => {
    try {
      setSaving(true);
      await createPassengerRequest(payload);
      await loadRequests();
      setError("");
      return true;
    } catch (saveError) {
      setError(saveError.message);
      return false;
    } finally {
      setSaving(false);
    }
  };

  const removeRequest = async (id) => {
    try {
      setDeletingId(id);
      await deletePassengerRequest(id);
      await loadRequests();
      setError("");
    } catch (deleteError) {
      setError(deleteError.message);
    } finally {
      setDeletingId("");
    }
  };

  return {
    requests,
    loading,
    saving,
    deletingId,
    error,
    createRequest,
    deleteRequest: removeRequest,
    reload: loadRequests,
  };
}
